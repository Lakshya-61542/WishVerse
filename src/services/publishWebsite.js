import { uploadMusic } from "./uploadMusic";
import { uploadLetterPhoto } from "./uploadLetterPhoto";
import { saveWebsite } from "./saveWebsite";
import { supabase } from "../lib/supabase";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

async function availableSlug(base) {
  for (let i = 0; i < 20; i += 1) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;

    const { data, error } = await supabase
      .from("websites")
      .select("slug")
      .eq("slug", candidate)
      .maybeSingle();

    if (error) throw error;

    if (!data) return candidate;
  }

  return `${base}-${Date.now().toString().slice(-6)}`;
}

/*
  Handles both:
  - newly selected gallery files
  - already uploaded gallery URLs while editing
*/
async function uploadGalleryForPublish(images = [], slug) {
  const galleryUrls = [];

  for (let index = 0; index < images.length; index += 1) {
    const image = images[index];

    // Existing database URL stored directly as string
    if (typeof image === "string") {
      galleryUrls.push(image);
      continue;
    }

    // Existing image loaded into Builder
    if (image?.existing && (image.url || image.preview)) {
      galleryUrls.push(image.url || image.preview);
      continue;
    }

    // Nothing new to upload
    if (!image?.file) continue;

    const extension =
      image.file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${slug}/${index + 1}.${extension}`;

    const { error } = await supabase.storage
      .from("gallery")
      .upload(fileName, image.file, {
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    galleryUrls.push(data.publicUrl);
  }

  return galleryUrls;
}

export async function publishWebsite(
  data,
  onProgress = () => {}
) {
  const progress = (value, status) =>
    onProgress({
      progress: value,
      status,
    });

  try {
    /*
     * 1. REQUIRE AUTHENTICATION
     */

    progress(3, "Checking your account");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;

    if (!user) {
      throw new Error(
        "You must be signed in to publish a Wish."
      );
    }

    /*
     * 2. DETERMINE WHETHER THIS IS CREATE OR EDIT
     */

    const isEditing = Boolean(data.editId);

    let existingWebsite = null;
    let slug;

    if (isEditing) {
      progress(6, "Loading your existing Wish");

      const { data: existing, error } = await supabase
        .from("websites")
        .select("*")
        .eq("id", data.editId)
        .eq("owner_id", user.id)
        .single();

      if (error) throw error;

      if (!existing) {
        throw new Error(
          "This Wish could not be found or you do not have permission to edit it."
        );
      }

      existingWebsite = existing;

      /*
       * IMPORTANT:
       * Keep the same slug while editing.
       *
       * Therefore the public link remains:
       *
       * /wish/original-slug
       */
      slug = existingWebsite.slug;

      progress(10, "Preparing your update");
    } else {
      progress(5, "Reserving your link");

      const rawSlug =
        data.websiteName?.trim() ||
        `${data.recipientName || "my"}-${
          data.selectedEvent || "wish"
        }`;

      const baseSlug =
        slugify(rawSlug) || `wish-${Date.now()}`;

      slug = await availableSlug(baseSlug);

      progress(10, "Your link is ready");
    }

    /*
     * 3. COVER IMAGE
     */

    progress(15, "Preparing cover photo");

    let coverImageUrl = null;

    // User selected a NEW cover image
    if (data.coverImage?.file) {
      const extension =
        data.coverImage.file.name
          .split(".")
          .pop()
          ?.toLowerCase() || "jpg";

      const fileName = `${slug}/cover.${extension}`;

      const { error } = await supabase.storage
        .from("cover-images")
        .upload(fileName, data.coverImage.file, {
          upsert: true,
        });

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("cover-images")
        .getPublicUrl(fileName);

      coverImageUrl = publicData.publicUrl;
    }

    // Existing image loaded into Builder
    else if (
      data.coverImage?.existing &&
      (data.coverImage.url ||
        data.coverImage.preview)
    ) {
      coverImageUrl =
        data.coverImage.url ||
        data.coverImage.preview;
    }

    // Extra fallback during editing
    else if (isEditing) {
      coverImageUrl =
        existingWebsite.cover_image || null;
    }

    /*
     * 4. GALLERY
     */

    progress(35, "Uploading memory gallery");

    const gallery =
      await uploadGalleryForPublish(
        data.images || [],
        slug
      );

    /*
     * 5. LETTER PHOTO
     */

    progress(58, "Adding your letter photo");

    let letterPhotoUrl = null;

    if (data.letterPhoto?.file) {
      letterPhotoUrl =
        await uploadLetterPhoto(
          data.letterPhoto,
          slug
        );
    } else if (
      data.letterPhoto?.existing &&
      (data.letterPhoto.url ||
        data.letterPhoto.preview)
    ) {
      letterPhotoUrl =
        data.letterPhoto.url ||
        data.letterPhoto.preview;
    } else if (isEditing) {
      letterPhotoUrl =
        existingWebsite.letter_photo || null;
    }

    /*
     * 6. MUSIC
     */

    progress(74, "Uploading soundtrack");

    let musicUrl = null;

    if (data.music?.file) {
      musicUrl = await uploadMusic(
        data.music,
        slug
      );
    } else if (
      data.music?.existing &&
      data.music.url
    ) {
      musicUrl = data.music.url;
    } else if (isEditing) {
      musicUrl =
        existingWebsite.music || null;
    }

    /*
     * 7. UPDATE EXISTING WEBSITE
     */

    if (isEditing) {
      progress(90, "Saving your changes");

      const {
        data: updatedWebsite,
        error,
      } = await supabase
        .from("websites")
        .update({
          recipient_name:
            data.recipientName,

          event_type:
            data.selectedEvent,

          theme:
            data.selectedTheme,

          password:
            data.password,

          message:
            data.message,

          cover_image:
            coverImageUrl,

          gallery,

          letter_photo:
            letterPhotoUrl,

          music:
            musicUrl,

          published: true,

          updated_at:
            new Date().toISOString(),
        })
        .eq("id", data.editId)
        .eq("owner_id", user.id)
        .select()
        .single();

      if (error) throw error;

      progress(
        100,
        "Your WishVerse has been updated"
      );

      return {
        success: true,

        website: updatedWebsite,

        updated: true,

        shareLink: `${window.location.origin}/wish/${updatedWebsite.slug}`,
      };
    }

    /*
     * 8. CREATE NEW WEBSITE
     */

    progress(90, "Saving your WishVerse");

    const website = await saveWebsite({
      owner_id: user.id,

      slug,

      website_name: slug,

      recipient_name:
        data.recipientName,

      event_type:
        data.selectedEvent,

      theme:
        data.selectedTheme,

      password:
        data.password,

      message:
        data.message,

      cover_image:
        coverImageUrl,

      gallery,

      letter_photo:
        letterPhotoUrl,

      music:
        musicUrl,

      published: true,
    });

    progress(
      100,
      "Your WishVerse is live"
    );

    return {
      success: true,

      website,

      updated: false,

      shareLink: `${window.location.origin}/wish/${website.slug}`,
    };
  } catch (error) {
    console.error(
      "Publish WishVerse error:",
      error
    );

    return {
      success: false,
      error,
    };
  }
}