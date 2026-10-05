import { uploadMusic } from "./uploadMusic";
import { uploadLetterPhoto } from "./uploadLetterPhoto";
import { saveWebsite } from "./saveWebsite";
import { uploadGallery } from "./uploadGallery";
import { supabase } from "../lib/supabase";

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
}

async function availableSlug(base) {
  for (let i = 0; i < 20; i += 1) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;
    const { data, error } = await supabase.from("websites").select("slug").eq("slug", candidate).maybeSingle();
    if (error) throw error;
    if (!data) return candidate;
  }
  return `${base}-${Date.now().toString().slice(-6)}`;
}

export async function publishWebsite(data, onProgress = () => {}) {
  const rawSlug = data.websiteName?.trim() || `${data.recipientName || "my"}-${data.selectedEvent || "wish"}`;
  const baseSlug = slugify(rawSlug) || `wish-${Date.now()}`;
  const progress = (value, status) => onProgress({ progress: value, status });

  try {
    progress(5, "Reserving your link");
    const slug = await availableSlug(baseSlug);
    progress(10, "Uploading cover photo");
    let coverImageUrl = null;
    if (data.coverImage?.file) {
      const extension = data.coverImage.file.name.split(".").pop();
      const fileName = `${slug}/cover.${extension}`;
      const { error } = await supabase.storage.from("cover-images").upload(fileName, data.coverImage.file, { upsert: true });
      if (error) throw error;
      coverImageUrl = supabase.storage.from("cover-images").getPublicUrl(fileName).data.publicUrl;
    }

    progress(35, "Uploading memory gallery");
    const gallery = await uploadGallery(data.images, slug);

    progress(58, "Adding your letter photo");
    const letterPhotoUrl = await uploadLetterPhoto(data.letterPhoto, slug);

    progress(74, "Uploading soundtrack");
    const musicUrl = await uploadMusic(data.music, slug);

    progress(90, "Saving your WishVerse");
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
      published: true,
    });

    progress(100, "Your WishVerse is live");
    return { success: true, website, shareLink: `${window.location.origin}/wish/${website.slug}` };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
}
