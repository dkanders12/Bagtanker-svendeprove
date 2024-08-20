import { createClient } from "@supabase/supabase-js";

export const fetchProductsData = async () => {
  const supabaseUrl = "https://bvuhlmojkmmydcepmwpf.supabase.co";
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

  const client = createClient(supabaseUrl, supabaseAnonKey);

  // Fetch categories
  const { data: categories, error: categoriesError } = await client
    .from("categories")
    .select("*");

  // Fetch the relationships between categories and products
  const { data: categoriesProductsRel, error: categoriesProductsRelError } =
    await client.from("category_product_rel").select("*");

  // Fetch the products
  const { data: products, error: productsError } = await client
    .from("products")
    .select("*");

  // Handle errors
  if (categoriesError || categoriesProductsRelError || productsError) {
    console.error(
      "Error fetching data:",
      categoriesError?.message ||
        categoriesProductsRelError?.message ||
        productsError?.message
    );
    return { categories: [], products: [] };
  }

  // Map products to their respective categories
  const categoriesWithProducts = categories.map((category) => {
    const relatedProductIds = categoriesProductsRel
      .filter((rel) => rel.category_id === category.id)
      .map((rel) => rel.product_id);

    const relatedProducts = products.filter((product) =>
      relatedProductIds.includes(product.id)
    );

    return { ...category, products: relatedProducts };
  });

  return { categories: categoriesWithProducts };
};
