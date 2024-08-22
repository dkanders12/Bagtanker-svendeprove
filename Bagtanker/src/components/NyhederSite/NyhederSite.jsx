import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNewsData } from "../../Providers/FetchNewsData";
import "./NyhederSite.scss";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [currentNews, setCurrentNews] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { news, images } = await fetchNewsData();
      setNewsData(news);

      const foundItem = news.find((item) => item.id === id);
      setCurrentNews(foundItem);

      // Assuming `foundItem.image_id` is the field linking to the image
      if (foundItem && foundItem.image_id) {
        const foundImage = images.find((img) => img.id === foundItem.image_id);
        setCurrentImage(foundImage);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNewsClick = (newsId) => {
    navigate(`/News/${newsId}`);
  };

  if (!currentNews) return <p>Loading...</p>;

  return (
    <section id="news-detail">
      <article id="left-bar">
        <h1>{currentNews.title}</h1>
        {currentImage && (
          <img
            src={currentImage.filename}
            alt={currentNews.title}
            className="news-detail-image"
          />
        )}
        <p>{currentNews.content}</p>
        <p>{formatDate(currentNews.created_at)}</p>
      </article>
      <article id="right-bar">
        {newsData.slice(0, 5).map((newsItem) => (
          <div
            key={newsItem.id}
            className="related-news"
            onClick={() => handleNewsClick(newsItem.id)}
            style={{ cursor: "pointer" }}
          >
            <p id="small">{formatDate(newsItem.created_at)}</p>
            <h3>{newsItem.title}</h3>
            <p>{newsItem.teaser}</p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default NewsDetail;
