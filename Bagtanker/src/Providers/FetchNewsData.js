import { createClient } from "@supabase/supabase-js";

export const fetchNewsData = async () => {
  const supabaseUrl = "https://bvuhlmojkmmydcepmwpf.supabase.co";
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

  const client = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await client.from("news").select("*");
  const { data: imageData, error: imageError } = await client
    .from("images")
    .select("*");

  if (error || imageError) {
    console.error(
      "Error fetching data:",
      error?.message || imageError?.message
    );
    return { news: [], images: [] };
  }

  return { news: data, images: imageData };
};
