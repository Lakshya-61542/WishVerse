import { supabase } from "../lib/supabase";

export async function uploadLetterPhoto(
  letterPhoto,
  slug,
  userId
) {
  if (!letterPhoto) return null;

  if (
    letterPhoto.existing &&
    letterPhoto.url
  ) {
    return letterPhoto.url;
  }

  if (!letterPhoto.file) {
    return null;
  }

  if (!userId) {
    throw new Error(
      "User ID is required to upload a letter photo."
    );
  }

  const extension =
    letterPhoto.file.name
      .split(".")
      .pop()
      ?.toLowerCase() || "jpg";

  const fileName =
    `${userId}/${slug}/letter.${extension}`;

  const { error } =
    await supabase.storage
      .from("letter-photos")
      .upload(
        fileName,
        letterPhoto.file,
        {
          upsert: true,
        }
      );

  if (error) {
    console.error(
      "LETTER ERROR:",
      error
    );

    throw error;
  }

  const { data } =
    supabase.storage
      .from("letter-photos")
      .getPublicUrl(
        fileName
      );

  return data.publicUrl;
}