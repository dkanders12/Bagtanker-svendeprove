import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../Providers/ProductId";
import { fetchNewsData } from "../../../Providers/FetchNewsData";
import Navbar from "../Navbar/Navbar";
import "./ProductDetails.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const productData = await fetchProductById(id);
      if (productData) {
        setProduct(productData);

        const { images: imageData } = await fetchNewsData();
        if (imageData.length > 0) {
          setImage(imageData[0]);
        }
      }
    };

    getProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <article className="product-detail-container">
        <div className="left-column">
          <h1>{product.title}</h1>
          {image && (
            <img
              src={image.filename}
              alt={product.title}
              className="product-image"
            />
          )}
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          <p className="product-price">Pris: {product.price} DKK</p>
        </div>
        <div className="right-column">
          <div className="ingredients-header">Opskrift</div>
          <div className="ingredients-details">
            <ul>
              <li>
                <strong>Varighed:</strong> {product.duration}
              </li>
              <li>
                <strong>Antal:</strong> {product.amount}
              </li>
              {product.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.amount} {ingredient.unitAbbreviation}{" "}
                  {ingredient.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </>
  );
};

export default ProductDetail;
