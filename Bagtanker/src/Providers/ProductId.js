import { createClient } from "@supabase/supabase-js";

export const fetchProductById = async (id) => {
  const supabaseUrl = "https://bvuhlmojkmmydcepmwpf.supabase.co";
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

  const client = createClient(supabaseUrl, supabaseAnonKey);

  // Fetch the product by id
  const { data: product, error } = await client
    .from("products")
    .select("*")
    .eq("id", id)
    .single(); // single() ensures we only get one product back

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  return product;
};
