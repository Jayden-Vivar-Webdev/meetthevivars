import WeddingUpdatesPage from "@/app/components/feed/feedposts";
import client from "@/lib/client";
import { urlFor } from "@/lib/imagebuilder";
import { type SanityDocument } from "next-sanity";

const query = `*[_type == "postAsset"]{
    _id,
    author,
    description,       // not caption
    images[]{
      asset->{
        url
      }
    },
    timeStamp,         // capital S here, case sensitive
    likes,
    comments[]{
      _key,
      commentText,
      author,
      timestamp
    }
  } | order(timeStamp desc)`;   // order by timeStamp
  


export default async function Updates(){
    const data = await client.fetch<SanityDocument[]>(query, {});
    console.log(data)
    // Map Sanity data to your Post interface shape:
    const posts = data.map((post: any) => ({
      id: post._id,
      caption: post.caption || '',
      author: post.author || 'Anonymous',
      images: [],  // you don't upload here, so keep empty
      imageUrls: post.images?.map((img: any) => img.asset?.url) || [],
      timestamp: post.timestamp || '',
      likes: post.likes || 0,
      comments: post.comments?.map((c: any) => ({
        id: c._key,
        text: c.commentText,
        author: c.author,
        timestamp: c.timestamp
      })) || []
    }));
    return(
        
           <WeddingUpdatesPage initialPosts={posts} />
        
    )
}