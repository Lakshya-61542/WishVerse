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
    const candidate =
      i === 0
        ? base
        : `${base}-${i + 1}`;

    const { data, error } =
      await supabase
        .from("websites")
        .select("slug")
        .eq("slug", candidate)
        .maybeSingle();

    if (error) throw error;

    if (!data) return candidate;
  }

  return `${base}-${Date.now()
    .toString()
    .slice(-6)}`;
}

/*
  Securely stores the passcode hash
  inside public.wish_secrets.

  The actual PIN is never stored
  inside public.websites.
*/
async function setWishPasscode(
  websiteId,
  password
) {
  const cleanPassword =
    String(password || "").trim();

  if (!cleanPassword) {
    throw new Error(
      "Please enter a passcode before publishing your Wish."
    );
  }

  const { error } =
    await supabase.rpc(
      "set_wish_passcode",
      {
        wish_id: websiteId,
        new_passcode:
          cleanPassword,
      }
    );

  if (error) throw error;
}

/*
  Handles both:
  - newly selected gallery files
  - already uploaded gallery URLs while editing
*/
async function uploadGalleryForPublish(
  images = [],
  slug,
  userId
) {
  const galleryUrls = [];

  for (
    let index = 0;
    index < images.length;
    index += 1
  ) {
    const image = images[index];

    /*
     * EXISTING DATABASE URL
     */

    if (
      typeof image === "string"
    ) {
      galleryUrls.push(image);
      continue;
    }

    /*
     * EXISTING IMAGE LOADED
     * INTO BUILDER
     */

    if (
      image?.existing &&
      (image.url ||
        image.preview)
    ) {
      galleryUrls.push(
        image.url ||
          image.preview
      );

      continue;
    }

    /*
     * NOTHING TO UPLOAD
     */

    if (!image?.file) {
      continue;
    }

    /*
     * NEW FILE
     */

    const extension =
      image.file.name
        .split(".")
        .pop()
        ?.toLowerCase() ||
      "jpg";

    const fileName =
  `${userId}/${slug}/${index + 1}.${extension}`;

    const { error } =
      await supabase.storage
        .from("gallery")
        .upload(
          fileName,
          image.file,
          {
            upsert: true,
          }
        );

    if (error) throw error;

    const { data } =
      supabase.storage
        .from("gallery")
        .getPublicUrl(
          fileName
        );

    galleryUrls.push(
      data.publicUrl
    );
  }

  return galleryUrls;
}

export async function publishWebsite(
  data,
  onProgress = () => {}
) {
  const progress = (
    value,
    status
  ) =>
    onProgress({
      progress: value,
      status,
    });

  try {
    /*
     * 1. REQUIRE AUTHENTICATION
     */

    progress(
      3,
      "Checking your account"
    );

    const {
      data: { user },
      error: userError,
    } =
      await supabase.auth.getUser();

    if (userError) {
      throw userError;
    }

    if (!user) {
      throw new Error(
        "You must be signed in to publish a Wish."
      );
    }

    /*
     * 2. REQUIRE PASSCODE
     */

 const isEditing = Boolean(
  data.editId
);

const cleanPassword = String(
  data.password || ""
).trim();

/*
 * New Wishes MUST have a passcode.
 *
 * While editing, an empty field means:
 * keep the current secure passcode.
 */
if (
  !isEditing &&
  !cleanPassword
) {
  throw new Error(
    "Please enter a 6-digit passcode before publishing your Wish."
  );
}

    let existingWebsite =
      null;

    let slug;

    if (isEditing) {
      progress(
        6,
        "Loading your existing Wish"
      );

      const {
        data: existing,
        error,
      } = await supabase
        .from("websites")
        .select("*")
        .eq(
          "id",
          data.editId
        )
        .eq(
          "owner_id",
          user.id
        )
        .single();

      if (error) {
        throw error;
      }

      if (!existing) {
        throw new Error(
          "This Wish could not be found or you do not have permission to edit it."
        );
      }

      existingWebsite =
        existing;

        const {
  data: existingSecret,
  error: secretError,
} = await supabase
  .from("wish_secrets")
  .select("website_id")
  .eq(
    "website_id",
    data.editId
  )
  .maybeSingle();

if (secretError) {
  throw secretError;
}

/*
 * If this is an older Wish with no secure
 * passcode yet, require the creator to
 * create one before republishing it.
 */
if (
  !existingSecret &&
  !cleanPassword
) {
  throw new Error(
    "This Wish needs a secure passcode. Enter a new 6-digit passcode before saving."
  );
}

      /*
       * Keep original slug while editing.
       */
      slug =
        existingWebsite.slug;

      progress(
        10,
        "Preparing your update"
      );
    } else {
      progress(
        5,
        "Reserving your link"
      );

      const rawSlug =
        data.websiteName?.trim() ||
        `${
          data.recipientName ||
          "my"
        }-${
          data.selectedEvent ||
          "wish"
        }`;

      const baseSlug =
        slugify(rawSlug) ||
        `wish-${Date.now()}`;

      slug =
        await availableSlug(
          baseSlug
        );

      progress(
        10,
        "Your link is ready"
      );
    }

    /*
     * 4. COVER IMAGE
     */

    progress(
      15,
      "Preparing cover photo"
    );

    let coverImageUrl = null;

    if (
      data.coverImage?.file
    ) {
      const extension =
        data.coverImage.file.name
          .split(".")
          .pop()
          ?.toLowerCase() ||
        "jpg";

      const fileName =
  `${user.id}/${slug}/cover.${extension}`;

      const { error } =
        await supabase.storage
          .from(
            "cover-images"
          )
          .upload(
            fileName,
            data.coverImage
              .file,
            {
              upsert: true,
            }
          );

      if (error) {
        throw error;
      }

      const {
        data: publicData,
      } =
        supabase.storage
          .from(
            "cover-images"
          )
          .getPublicUrl(
            fileName
          );

      coverImageUrl =
        publicData.publicUrl;
    } else if (
      data.coverImage
        ?.existing &&
      (data.coverImage.url ||
        data.coverImage
          .preview)
    ) {
      coverImageUrl =
        data.coverImage.url ||
        data.coverImage
          .preview;
    } else if (isEditing) {
      coverImageUrl =
        existingWebsite
          .cover_image ||
        null;
    }

    /*
     * 5. GALLERY
     */

    progress(
      35,
      "Uploading memory gallery"
    );

    const gallery =
  await uploadGalleryForPublish(
    data.images || [],
    slug,
    user.id
  );

    /*
     * 6. LETTER PHOTO
     */

    progress(
      58,
      "Adding your letter photo"
    );

    let letterPhotoUrl =
      null;

    if (
      data.letterPhoto?.file
    ) {
      letterPhotoUrl =
  await uploadLetterPhoto(
    data.letterPhoto,
    slug,
    user.id
  );
    } else if (
      data.letterPhoto
        ?.existing &&
      (data.letterPhoto.url ||
        data.letterPhoto
          .preview)
    ) {
      letterPhotoUrl =
        data.letterPhoto.url ||
        data.letterPhoto
          .preview;
    } else if (isEditing) {
      letterPhotoUrl =
        existingWebsite
          .letter_photo ||
        null;
    }

    /*
     * 7. MUSIC
     */

    progress(
      72,
      "Uploading soundtrack"
    );

    let musicUrl = null;

    if (data.music?.file) {
      musicUrl =
  await uploadMusic(
    data.music,
    slug,
    user.id
  );
    } else if (
      data.music?.existing &&
      data.music.url
    ) {
      musicUrl =
        data.music.url;
    } else if (isEditing) {
      musicUrl =
        existingWebsite.music ||
        null;
    }

    /*
     * 8. EDIT EXISTING WISH
     */

    if (isEditing) {
      /*
       * First keep the Wish private
       * while security is updated.
       */

      progress(
        84,
        "Saving your changes"
      );

      const {
        data: updatedDraft,
        error: updateError,
      } = await supabase
        .from("websites")
        .update({
          recipient_name:
            data.recipientName,

          event_type:
            data.selectedEvent,

          theme:
            data.selectedTheme,

          /*
           * IMPORTANT:
           * Never save plaintext PIN.
           */

          message:
            data.message,

          cover_image:
            coverImageUrl,

          gallery,

          letter_photo:
            letterPhotoUrl,

          music:
            musicUrl,

          /*
           * Temporarily private
           * while passcode hash
           * is updated.
           */
          published: false,

          updated_at:
            new Date()
              .toISOString(),
        })
        .eq(
          "id",
          data.editId
        )
        .eq(
          "owner_id",
          user.id
        )
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      /*
       * HASH + STORE PASSCODE
       */

      progress(
        91,
        "Securing your Wish"
      );

      if (cleanPassword) {
  await setWishPasscode(
    updatedDraft.id,
    cleanPassword
  );
}

      /*
       * ONLY NOW MAKE IT PUBLIC
       */

      progress(
        96,
        "Publishing your update"
      );

      const {
        data: updatedWebsite,
        error: publishError,
      } = await supabase
        .from("websites")
        .update({
          published: true,

          /*
           * Extra safety.
           */


          updated_at:
            new Date()
              .toISOString(),
        })
        .eq(
          "id",
          updatedDraft.id
        )
        .eq(
          "owner_id",
          user.id
        )
        .select()
        .single();

      if (publishError) {
        throw publishError;
      }

      progress(
        100,
        "Your WishVerse has been updated"
      );

      return {
        success: true,

        website:
          updatedWebsite,

        updated: true,

        shareLink:
          `${window.location.origin}/wish/${updatedWebsite.slug}`,
      };
    }

    /*
     * 9. CREATE NEW WISH
     */

    progress(
      84,
      "Saving your WishVerse"
    );

    /*
     * Save as PRIVATE first.
     *
     * This means the Wish cannot
     * become publicly accessible
     * before its passcode is secured.
     */

    const website =
      await saveWebsite({
        owner_id: user.id,

        slug,

        website_name: slug,

        recipient_name:
          data.recipientName,

        event_type:
          data.selectedEvent,

        theme:
          data.selectedTheme,

        /*
         * NEVER STORE THE
         * PLAINTEXT PASSCODE.
         */

        message:
          data.message,

        cover_image:
          coverImageUrl,

        gallery,

        letter_photo:
          letterPhotoUrl,

        music:
          musicUrl,

        /*
         * Private until hashing
         * succeeds.
         */
        published: false,
      });

    if (!website?.id) {
      throw new Error(
        "Wish was created but no website ID was returned."
      );
    }

    /*
     * 10. SECURE PASSCODE
     */

    progress(
      92,
      "Securing your Wish"
    );

    await setWishPasscode(
      website.id,
      cleanPassword
    );

    /*
     * 11. MAKE WISH PUBLIC
     */

    progress(
      97,
      "Publishing your Wish"
    );

    const {
      data: publishedWebsite,
      error: publishError,
    } = await supabase
      .from("websites")
      .update({
        published: true,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq(
        "id",
        website.id
      )
      .eq(
        "owner_id",
        user.id
      )
      .select()
      .single();

    if (publishError) {
      throw publishError;
    }

    progress(
      100,
      "Your WishVerse is live"
    );

    return {
      success: true,

      website:
        publishedWebsite,

      updated: false,

      shareLink:
        `${window.location.origin}/wish/${publishedWebsite.slug}`,
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