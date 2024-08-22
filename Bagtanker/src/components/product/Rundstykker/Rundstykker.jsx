import React, { useState, useEffect } from "react";
import { fetchProductsData } from "../../../Providers/FetchProduktsData";
import { fetchNewsData } from "../../../Providers/FetchNewsData";
import Navbar from "../Navbar/Navbar";
import "./Rundstykker.scss";
import { NavLink } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import Footer from "../../Forside/Footer/Footer";

const Rundstykker = ({ limit = 2 }) => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc"); // "asc" for korteste først, "desc" for længste først

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

  const sortProducts = (products) => {
    return [...products].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.title.length - b.title.length;
      } else {
        return b.title.length - a.title.length;
      }
    });
  };

  const handleSortClick = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  return (
    <>
      <Navbar />
      <section id="Rundstykker">
        {categories.length ? (
          <article id="categoriesContainer">
            <h2>Rundstykker</h2>
            <button onClick={handleSortClick}>
              Sorter
              {sortDirection === "asc" ? "+" : "-"}
            </button>
            {categories
              .filter(({ title }) =>
                ["Morgenbrød", "Grovbrød", "Boller"].includes(title)
              )
              .map(({ products }, categoryIdx) => (
                <div key={categoryIdx} className="category">
                  {products.length ? (
                    sortProducts(shuffleAndLimitProducts(products)).map(
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

export default Rundstykker;
