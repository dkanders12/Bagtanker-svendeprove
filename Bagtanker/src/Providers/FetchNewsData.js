import { createClient } from "@supabase/supabase-js";

export const fetchNewsData = async () => {
  const supabaseUrl = "https://bvuhlmojkmmydcepmwpf.supabase.co";
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

  const client = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await client.from("news").select("*");

  if (error) {
    console.error("Error fetching artists:", error.message);
    return [];
  }

  return data || [];
};
