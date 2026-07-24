import { supabase } from "../lib/supabase";

export async function uploadMusic(music, slug) {

  if (!music?.file) return null;

  const extension = music.file.name.split(".").pop();

  const fileName = `${slug}/music.${extension}`;

const { error } = await supabase.storage
  .from("music")
  .upload(fileName, music.file, {
    upsert: true,
  });

  if (error) {
  console.log("MUSIC ERROR:", error);
  throw error;
}

  const { data } = supabase.storage
    .from("music")
    .getPublicUrl(fileName);

  return data.publicUrl;
}