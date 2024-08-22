import React, { useState, useEffect } from "react";
import { fetchProductsData } from "../../../Providers/FetchProduktsData";
import { fetchNewsData } from "../../../Providers/FetchNewsData";
import Navbar from "../Navbar/Navbar";
import "../Rundstykker/Rundstykker.scss";
import { NavLink } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import Footer from "../../Forside/Footer/Footer";

const Baguettes = ({ limit = 6 }) => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { categories } = await fetchProductsData();
      const { images } = await fetchNewsData();
      setCategories(categories);
      setImages(images);
    };

    fetchData();
  }, []);

  const getRandomImageUrl = () => {
    if (!images.length) return "";
    return images[Math.floor(Math.random() * images.length)].filename;
  };

  const shuffleAndLimitProducts = (products) => {
    return products.sort(() => 0.5 - Math.random()).slice(0, limit);
  };

  return (
    <>
      <Navbar />
      <section id="Rundstykker">
        {categories.length ? (
          <article id="categoriesContainer">
            <h2>Baguettes</h2>
            {categories
              .filter(({ title }) => ["Baguettes"].includes(title))
              .map(({ products }, categoryIdx) => (
                <div key={categoryIdx} className="category">
                  {products.length ? (
                    shuffleAndLimitProducts(products).map(
                      ({ id, title, teaser }, productIdx) => (
                        <div key={id} className="productItem">
                          <div>
                            <img
                              src={getRandomImageUrl()}
                              alt={title}
                              className="productImage"
                            />
                          </div>
                          <div id="text">
                            <h3>{title}</h3>
                            <p>{teaser}</p>
                            <div id="linkLæs">
                              <NavLink
                                to={`/products/${id}`}
                                className="btnLæs"
                              >
                                Læs mere
                              </NavLink>
                              <div>
                                <CiHeart></CiHeart>
                                <p>324</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <li>No products available.</li>
                  )}
                </div>
              ))}{" "}
            <Footer></Footer>
          </article>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  );
};

export default Baguettes;
