import { uploadMusic } from "./uploadMusic";
import { uploadLetterPhoto } from "./uploadLetterPhoto";
import { saveWebsite } from "./saveWebsite";
import { uploadGallery } from "./uploadGallery";
import { supabase } from "../lib/supabase";

export async function publishWebsite(data) {

   console.log("SERVICE STARTED");

   const slug =
  data.websiteName?.trim() ||
  `${data.recipientName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")}-${data.selectedEvent.toLowerCase()}`;

  try {

    // ---------- Upload Cover Image ----------

    let coverImageUrl = null;

    if (data.coverImage?.file) {

      const file = data.coverImage.file;

      const extension = file.name.split(".").pop();

const fileName = `${slug}/cover.${extension}`;
      const { error: uploadError } = await supabase.storage
  .from("cover-images")
  .upload(fileName, file, {
    upsert: true,
  });

     if (uploadError) {
  console.log("COVER ERROR:", uploadError);
  throw uploadError;
}

      const { data: publicUrl } = supabase.storage
        .from("cover-images")
        .getPublicUrl(fileName);

      coverImageUrl = publicUrl.publicUrl;

      console.log("Cover Image Uploaded:", coverImageUrl);

    }

    const gallery = await uploadGallery(
    data.images,
    slug
);

console.log("Gallery Uploaded:", gallery);

const letterPhotoUrl = await uploadLetterPhoto(
  data.letterPhoto,
  slug
);

console.log("Letter Photo:", letterPhotoUrl);

const musicUrl = await uploadMusic(
  data.music,
  slug
);

console.log("Music Uploaded:", musicUrl);


const website = await saveWebsite({

  slug,

  website_name: slug,

  recipient_name: data.recipientName,

  event_type: data.selectedEvent,

  theme: data.selectedTheme,

  password: data.password,

  message: data.message,

  cover_image: coverImageUrl,

  gallery,

  letter_photo: letterPhotoUrl,

  music: musicUrl,

});

console.log("Website Saved:", website);

    return {

  success: true,

  website,

  shareLink: `${window.location.origin}/wish/${website.slug}`,

};

  } catch (error) {

    console.error(error);

    return {
      success: false,
      error,
    };

  }

}