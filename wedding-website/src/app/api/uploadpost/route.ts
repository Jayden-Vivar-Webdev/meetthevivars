import { NextRequest, NextResponse } from "next/server";
import client from '@/lib/client'

export async function POST(request: NextRequest){
    try{
        const formData = await request.formData()
        const id = formData.get('id') as string
        const caption = formData.get('caption') as string
        const timestamp = formData.get('timestamp') as string
        const likes = formData.get('likes') as string // This comes as string from FormData
        const author = formData.get('author') as string
        const images = formData.getAll('images') as File[];

        // Fix validation - likes and images can be empty/0
        if (!id || !caption || !timestamp || likes === null || !author) {
            console.log('Missing required fields:', {id, caption, timestamp, likes, author})
            return NextResponse.json(
              { success: false, error: 'Required fields missing' },
              { status: 400 }
            )
        }

        // Log images for debugging
        images.forEach((file, i) => {
            console.log(`Image #${i + 1}:`);
            console.log('Name:', file.name);
            console.log('Type:', file.type);
            console.log('Size:', file.size);
            console.log('Last Modified:', file.lastModified);
            console.log('Is File instance:', file instanceof File);
        });

        // Upload images to Sanity (if any)
        const imageReferences = [];
        if (images.length > 0) {
            // Convert files to buffers
            const buffers = await Promise.all(
                images.map(async (file) => {
                  const arrayBuffer = await file.arrayBuffer();
                  return Buffer.from(arrayBuffer);
                })
            );

            // Upload each image to Sanity
            for (let i = 0; i < images.length; i++) {
                const imageAsset = await client.assets.upload('image', buffers[i], {
                    filename: images[i].name,
                    contentType: images[i].type,
                });
                imageReferences.push({
                    _key: `image_${Date.now()}_${i}`, // Add unique _key
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset._id,
                    }
                });
            }
        }

        // Create the post document in Sanity
        const postDocument = {
            _type: 'postAsset',
            _id: id, // Use the provided ID
            author: author,
            description: caption,
            images: imageReferences,
            timeStamp: timestamp,
            likes: parseInt(likes) || 0,
            comments: [] // Initialize with empty comments array
        };

        // Create the document in Sanity
        const result = await client.create(postDocument);
        
        console.log('Post created successfully:', result._id);

        return NextResponse.json({
            success: true,
            postId: result._id,
            message: 'Post created successfully'
        });

    } catch(err) {
        console.error('API Error:', err);
        const errorMsg = err instanceof Error ? err.message : 'Failed Upload api';

        return NextResponse.json({
            success: false,
            error: errorMsg
        }, { status: 500 });
    }
}