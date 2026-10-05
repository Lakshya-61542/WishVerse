import { supabase } from "../lib/supabase";

export async function getWebsite(slug) {
  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}