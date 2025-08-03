// app/gallery/page.tsx or pages/gallery.tsx (Server Component)
import WeddingImagesSection from "@/app/components/images/images";
import client from "@/lib/client"
import { urlFor } from "@/lib/imagebuilder";
import { type SanityDocument } from "next-sanity";


const query = `*[_type == "imageAsset"]{
  _id,
  title,
  description,
  category,
  image
}`;


export default async function GalleryPage() {
  try {
    console.log("📡 Fetching gallery data...");
    const data = await client.fetch<SanityDocument[]>(query, {});

    if (!data || data.length === 0) {
      console.warn("⚠️ No data returned from Sanity");
      
    }

    console.log(`✅ Retrieved ${data.length} items.`);

    const items = data.map((img, i) => {
      const ref = img?.image?.asset?._ref;
      const src = ref ? urlFor(ref).width(800).url() : null;

      if (!src) console.error(`❌ Missing image ref for item at index ${i}:`, img);

      return {
        id: img._id,
        src: src ?? '',
        title: img.title ?? 'Untitled',
        description: img.description ?? '',
        category: img.category ?? 'Wedding Day',
      };
    });

    return <WeddingImagesSection items={items} />
  } catch (error) {
    console.error("🔥 Error fetching or rendering Sanity data:", error);
    return <p>Error loading gallery. Please try again later.</p>;
  }
}
