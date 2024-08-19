import React, { useState, useEffect } from "react";
import { fetchNewsData } from "../../../Providers/FetchNewsData";
import "./Nyheder.scss";

const FetchNyheder = ({ limit = 3 }) => {
  // Set default limit as 5
  const [NyhederData, setNyhederData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNewsData();
      setNyhederData(data);
    };

    fetchData();
  }, []);

  return (
    <article id="forsideArticle">
      <h2>Nyheder</h2>
      {NyhederData.length > 0 ? (
        <div id="nyhedsContainer">
          {NyhederData.slice(limit).map((news, index) => (
            <div key={index}>
              <p id="small">{news.created_at}</p>
              <h3>{news.title}</h3>
              <p>{news.teaser}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </article>
  );
};

export default FetchNyheder;
