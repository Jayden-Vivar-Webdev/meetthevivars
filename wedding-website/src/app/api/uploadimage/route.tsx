import { NextRequest, NextResponse } from 'next/server'
import client from '@/lib/client'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    console.log({
      title,
      category,
      description,
    });
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }
    if(!category){
      return NextResponse.json(
        { success: false, error: 'Category is required' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(buffer)

    // Upload image to Sanity
    const imageAsset = await client.assets.upload('image', fileBuffer, {
      filename: file.name,
      contentType: file.type,
    })

    // Create the document
    const document = await client.create({
      _type: 'imageAsset',
      title: title.trim(),
      description: description?.trim() || undefined,
      category: category, 
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: document,
    })

  } catch (error) {
    console.error('Upload error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      },
      { status: 500 }
    )
  }
}