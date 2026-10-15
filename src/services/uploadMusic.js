import { supabase } from "../lib/supabase";

export async function uploadMusic(
  music,
  slug,
  userId
) {
  if (!music) return null;

  if (
    music.existing &&
    music.url
  ) {
    return music.url;
  }

  if (!music.file) {
    return null;
  }

  if (!userId) {
    throw new Error(
      "User ID is required to upload music."
    );
  }

  const extension =
    music.file.name
      .split(".")
      .pop()
      ?.toLowerCase() || "mp3";

  const fileName =
    `${userId}/${slug}/music.${extension}`;

  const { error } =
    await supabase.storage
      .from("music")
      .upload(
        fileName,
        music.file,
        {
          upsert: true,
        }
      );

  if (error) {
    console.error(
      "MUSIC ERROR:",
      error
    );

    throw error;
  }

  const { data } =
    supabase.storage
      .from("music")
      .getPublicUrl(
        fileName
      );

  return data.publicUrl;
}