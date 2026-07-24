import { supabase } from "../lib/supabase";

export async function uploadLetterPhoto(letterPhoto, slug) {

  if (!letterPhoto?.file) return null;

  const extension = letterPhoto.file.name.split(".").pop();

  const fileName = `${slug}/letter.${extension}`;

const { error } = await supabase.storage
  .from("letter-photos")
  .upload(fileName, letterPhoto.file, {
    upsert: true,
  });

  if (error) {
  console.log("LETTER ERROR:", error);
  throw error;
}

  const { data } = supabase.storage
    .from("letter-photos")
    .getPublicUrl(fileName);

  return data.publicUrl;
}