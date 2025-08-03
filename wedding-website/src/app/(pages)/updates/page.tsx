import WeddingUpdatesPage from "@/app/components/feed/feedposts";
import client from "@/lib/client";

export const dynamic = "force-dynamic"; 

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
  
  interface SanityImageAsset {
    url: string;
  }
  
  interface SanityImage {
    asset: SanityImageAsset | null;
  }
  
  interface SanityComment {
    _key: string;
    commentText: string;
    author: string;
    timestamp: string;
  }
  
  interface SanityPost {
    _id: string;
    author: string;
    description: string;
    images: SanityImage[];
    timeStamp: string;
    likes: number;
    comments: SanityComment[];
  }
  

export default async function Updates(){
    const data = await client.fetch<SanityPost[]>(query, {});

    const posts = data.map((post) => ({
    id: post._id,
    caption: post.description || '',
    author: post.author || 'Anonymous',
    images: [],  // for uploads only, so empty here
    imageUrls: post.images?.map(img => img.asset?.url ?? '') || [],
    timestamp: post.timeStamp || '',
    likes: post.likes || 0,
    comments: post.comments?.map(c => ({
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