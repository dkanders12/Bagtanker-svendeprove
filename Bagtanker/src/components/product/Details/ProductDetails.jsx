import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../Providers/ProductId";
import { fetchNewsData } from "../../../Providers/FetchNewsData";
import { CiHeart } from "react-icons/ci";
import Navbar from "../Navbar/Navbar";
import "./ProductDetails.scss";
import Footer from "../../Forside/Footer/Footer";

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

  const teaserDescription =
    product.description.split(" ").slice(0, 100).join(" ") + "...";

  return (
    <>
      <Navbar />
      <section className="product-detail-container">
        <h1>{product.title}</h1>
        <article className="two-column-layout">
          <div className="left-column">
            {image && (
              <img
                src={image.filename}
                alt={product.title}
                className="product-image"
              />
            )}
          </div>
          <div className="right-column">
            <p className="product-teaser">{product.teaser}</p>
            <p className="product-description">{teaserDescription}</p>
          </div>
        </article>
        <article className="full-width-section">
          <p>{product.description.substring(teaserDescription.length)}</p>

          <div className="ingredients-details">
            <ul id="top-right">
              <div className="opskrift-header">
                <h2>Opskrift</h2>
                <p>
                  324 <CiHeart></CiHeart>
                </p>
              </div>
              <li>
                <strong>Varighed:</strong> {product.duration}
              </li>
              <li>
                <strong>Antal:</strong> {product.amount}
              </li>
              {product.ingredients.map((ingredient) => (
                <li id="edit-text" key={ingredient.id}>
                  {ingredient.amount} {ingredient.unitAbbreviation}
                  {ingredient.title}
                </li>
              ))}
            </ul>
          </div>
          <p className="product-price">Pris: {product.price} DKK</p>
        </article>
        <Footer></Footer>
      </section>
    </>
  );
};

export default ProductDetail;
