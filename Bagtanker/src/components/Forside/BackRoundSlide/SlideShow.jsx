import React, { useEffect, useState } from "react";
import "./SlideShow.scss";
import screen1 from "../../../assets/BackroundImg/Image1.jpg";
import screen2 from "../../../assets/BackroundImg/Image2.jpg";
import screen3 from "../../../assets/BackroundImg/Image3.jpeg";
import screen4 from "../../../assets/BackroundImg/Image4.jpg";
import screen5 from "../../../assets/BackroundImg/Image5.jpg";

const images = [screen1, screen2, screen3, screen4, screen5];

export const BackRoundSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <section id="backround">
      <div className="slider">
        <div
          className="sliders"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="slide"
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div id="radio">
        {images.map((_, index) => (
          <input
            key={index}
            type="radio"
            name="radio-btn"
            id={`radio${index + 1}`}
            checked={currentSlide === index}
            onChange={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      <div className="navigation-auto">
        {images.map((_, index) => (
          <div
            key={index}
            className={`auto-btn${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};
