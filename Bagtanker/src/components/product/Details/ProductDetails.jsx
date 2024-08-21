import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../Providers/ProductId"; // Make sure this path is correct
import Navbar from "../Navbar/Navbar";

const ProductDetail = () => {
  const { id } = useParams(); // Extract the id from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const productData = await fetchProductById(id);
      setProduct(productData);
    };

    getProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Navbar></Navbar>
      <div>
        <h1>{product.title}</h1>
        <img src={product.imageUrl} alt={product.title} />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        {/* Add more product details as needed */}
      </div>
    </>
  );
};

export default ProductDetail;
