import { supabase } from "../lib/supabase";

export async function saveWebsite(data) {
  /*
   * Always resolve the currently authenticated user
   * before inserting.
   */
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "You must be signed in to create a Wish."
    );
  }

  /*
   * Force owner_id to the authenticated user.
   *
   * Do not trust owner_id coming from the UI.
   */
  const payload = {
    ...data,
    owner_id: user.id,
  };

  const {
    data: website,
    error,
  } = await supabase
    .from("websites")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error(
      "WEBSITE INSERT ERROR:",
      error
    );

    throw error;
  }

  return website;
}