import { supabase } from "../lib/supabase";

export async function uploadGallery(images, slug) {

  const galleryUrls = [];

  let index = 1;

  for (const image of images) {

    if (!image.file) continue;

    const extension = image.file.name.split(".").pop();

    const fileName = `${slug}/${index}.${extension}`;

    const { error } = await supabase.storage
      .from("gallery")
      .upload(fileName, image.file);

    if (error) {
  console.log("GALLERY ERROR:", error);
  throw error;
}

    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    galleryUrls.push(data.publicUrl);

    index++;

  }

  return galleryUrls;

}