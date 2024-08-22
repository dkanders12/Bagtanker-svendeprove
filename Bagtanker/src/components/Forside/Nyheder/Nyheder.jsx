import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNewsData } from "../../../Providers/FetchNewsData";
import "./Nyheder.scss";

const FetchNyheder = ({ limit = 3 }) => {
  const [NyhederData, setNyhederData] = useState([]);
  const [ImageData, setImageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { news, images } = await fetchNewsData();
      setNyhederData(news);
      setImageData(images);
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleImageClick = (id) => {
    navigate(`/News/${id}`);
  };

  return (
    <article id="forsideArticle">
      <h2>Nyheder</h2>
      {NyhederData.length > 0 ? (
        <div id="nyhedsContainer">
          {NyhederData.slice(0, limit).map((news, index) => (
            <div key={index} className="newsItem">
              {ImageData[index] && (
                <img
                  id="nyhederImg"
                  src={ImageData[index].filename}
                  className="newsImage"
                  alt={news.title}
                  onClick={() => handleImageClick(news.id)}
                  style={{ cursor: "pointer" }}
                />
              )}
              <div>
                <p id="small">{formatDate(news.created_at)}</p>
                <h3>{news.title}</h3>
                <p>{news.teaser}</p>
              </div>
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
