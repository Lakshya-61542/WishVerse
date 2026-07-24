import { supabase } from "../lib/supabase";

export async function saveWebsite(website) {

  const { data, error } = await supabase
    .from("websites")
    .insert(website)
    .select()
    .single();

  if (error) throw error;

  return data;

}