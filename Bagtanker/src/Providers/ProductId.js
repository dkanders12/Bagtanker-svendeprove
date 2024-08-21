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
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  console.log("Product Data:", product); // Debug: Check product data

  // Fetch the ingredient relations associated with the product
  const { data: ingredientRels, error: relError } = await client
    .from("ingredient_product_rel")
    .select("*")
    .eq("product_id", id);

  if (relError) {
    console.error("Error fetching ingredient relations:", relError.message);
    return { ...product, ingredients: [] };
  }

  console.log("Ingredient Relations:", ingredientRels); // Debug: Check ingredient relations

  const ingredientIds = ingredientRels.map((rel) => rel.ingredient_id);
  const unitIds = ingredientRels.map((rel) => rel.unit_id);

  // Fetch the ingredients
  const { data: ingredients, error: ingError } = await client
    .from("ingredients")
    .select("*")
    .in("id", ingredientIds);

  if (ingError) {
    console.error("Error fetching ingredients:", ingError.message);
    return { ...product, ingredients: [] };
  }

  console.log("Ingredients:", ingredients); // Debug: Check ingredients

  // Fetch the units
  const { data: units, error: unitError } = await client
    .from("units")
    .select("*")
    .in("id", unitIds);

  if (unitError) {
    console.error("Error fetching units:", unitError.message);
    return { ...product, ingredients: [] };
  }

  console.log("Units:", units); // Debug: Check units

  // Combine ingredients with their respective amounts and units
  const ingredientsWithDetails = ingredientRels.map((rel) => {
    const ingredient = ingredients.find((ing) => ing.id === rel.ingredient_id);
    const unit = units.find((u) => u.id === rel.unit_id);
    return {
      ...ingredient,
      amount: rel.amount,
      unit: unit ? unit.name : null,
      unitAbbreviation: unit ? unit.abbreviation : null,
    };
  });

  console.log("Ingredients with Details:", ingredientsWithDetails); // Debug: Check final ingredients with details

  return { ...product, ingredients: ingredientsWithDetails };
};
