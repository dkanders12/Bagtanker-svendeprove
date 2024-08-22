import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsData } from "../../Providers/FetchNewsData";

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { news } = await fetchNewsData();
      const foundItem = news.find((item) => item.id === id);
      setNewsItem(foundItem);
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!newsItem) return <p>Loading...</p>;

  return (
    <section>
      <article id="left-bar">
        <h1>{newsItem.title}</h1>
        <p>{newsItem.content}</p>
        <p>{formatDate(newsItem.created_at)}</p>
      </article>
      <article id="right-bar">
        <div>
          <p id="small">{formatDate(newsItem.created_at)}</p>
          <h3>{newsItem.title}</h3>
          <p>{newsItem.teaser}</p>
        </div>
      </article>
    </section>
  );
};

export default NewsDetail;
