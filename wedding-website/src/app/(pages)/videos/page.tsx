import WeddingVideosSection from "@/app/components/videos/videos"; // Rename appropriately
import client from "@/lib/client";
import { type SanityDocument } from "next-sanity";

const query = `*[_type == "videoAsset"]{
  _id,
  title,
  description,
  category,
  video {
    asset->{
      _id,
      url
    }
  }
}`;

export default async function GalleryPage() {
  try {
    console.log("📡 Fetching video gallery data...");
    const data = await client.fetch<SanityDocument[]>(query, {});

    if (!data || data.length === 0) {
      console.warn("⚠️ No videos found in Sanity");
      
    }

    console.log(`✅ Retrieved ${data.length} video items.`);

    const items = data.map((video, i) => {
      const src = video?.video?.asset?.url;

      if (!src) console.error(`❌ Missing video URL for item at index ${i}:`, video);

      return {
        id: video._id,
        src: src ?? '',
        title: video.title ?? 'Untitled',
        description: video.description ?? '',
        category: video.category ?? 'Wedding Day',
      };
    });

    return <WeddingVideosSection items={items} />;
  } catch (error) {
    console.error("🔥 Error fetching or rendering video data:", error);
    return <p>Error loading video gallery. Please try again later.</p>;
  }
}
