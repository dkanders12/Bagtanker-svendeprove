import React, { useState, useEffect } from "react";
import { fetchProductsData } from "../../../Providers/FetchProduktsData";
import Navbar from "../Navbar/Navbar";
import "./Rundstykker.scss";
import { NavLink } from "react-router-dom";

const Rundstykker = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { categories } = await fetchProductsData();
      setCategories(categories);
    })();
  }, []);
  console.log(categories);

  return (
    <>
      <Navbar />
      <section id="Rundstykker">
        {categories.length ? (
          <div id="categoriesContainer">
            {categories
              .filter(({ title }) => title === "Morgenbrød")
              .map(({ title, products }, idx) => (
                <div key={idx} className="category">
                  <h2>{title}</h2>
                  {products.length ? (
                    products.map(({ title, teaser, image }, idx) => (
                      <div key={idx} className="productItem">
                        <img
                          src={products.image} // Using 'image' that holds 'filename'
                          alt={title}
                          className="productImage"
                        />
                        <h3>{title}</h3>
                        <p>{teaser}</p>
                        <NavLink to={`/products/${idx}`} className="btnLæs">
                          Læs mere
                        </NavLink>
                      </div>
                    ))
                  ) : (
                    <li>No products available.</li>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  );
};

export default Rundstykker;
