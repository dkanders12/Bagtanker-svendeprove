import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNewsData } from "../../Providers/FetchNewsData";
import "./NyhederSite.scss";
import Footer from "../Forside/Footer/Footer";

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

  const splitContentIntoParagraphs = (content) => {
    const words = content.split(" ");
    const paragraphs = [];

    for (let i = 0; i < words.length; i += 100) {
      paragraphs.push(words.slice(i, i + 100).join(" "));
    }

    return paragraphs;
  };

  if (!currentNews) return <p>Loading...</p>;

  return (
    <section id="news-detail">
      <div id="fix">
        <article id="left-bar">
          <h1>{currentNews.title}</h1>{" "}
          <p>{formatDate(currentNews.created_at)}</p>
          <p>{currentNews.teaser}</p>
          {currentImage && (
            <img
              src={currentImage.filename}
              alt={currentNews.title}
              className="news-detail-image"
            />
          )}
          {splitContentIntoParagraphs(currentNews.content).map(
            (paragraph, index) => (
              <p key={index}>{paragraph}</p>
            )
          )}
        </article>
        <article id="right-bar">
          <h4>Se også....</h4>
          {newsData.slice(0, 5).map((newsItem) => (
            <div
              key={newsItem.id}
              className="related-news"
              onClick={() => navigate(`/News/${newsItem.id}`)}
              style={{ cursor: "pointer" }}
            >
              <p id="small">{formatDate(newsItem.created_at)}</p>
              <h3>{newsItem.title}</h3>
              <p>{newsItem.teaser}</p>
            </div>
          ))}
        </article>
      </div>
      <Footer></Footer>
    </section>
  );
};

export default NewsDetail;
