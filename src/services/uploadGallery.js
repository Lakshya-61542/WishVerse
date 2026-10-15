import { supabase } from "../lib/supabase";
export async function uploadGallery(images = [], slug) {
  const galleryUrls = [];
  let index = 1;
  for (const image of images) {

  if (image.existing && image.url) {
    galleryUrls.push(image.url);
    continue;
  }

  if (!image.file) continue;

  // existing upload code...

    const extension = image.file.name.split(".").pop();
    const fileName =
  `${userId}/${slug}/${index + 1}.${extension}`;
    const { error } = await supabase.storage.from("gallery").upload(fileName, image.file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("gallery").getPublicUrl(fileName);
    galleryUrls.push(data.publicUrl);
    index += 1;
  }
  return galleryUrls;
}
