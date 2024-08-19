import React, { useEffect, useState } from "react";
import "./SlideShow.scss";
import screen1 from "../../assets/BackroundImg/Image1.jpg";
import screen2 from "../../assets/BackroundImg/Image2.jpg";
import screen3 from "../../assets/BackroundImg/Image3.jpeg";
import screen4 from "../../assets/BackroundImg/Image4.jpg";
import screen5 from "../../assets/BackroundImg/Image5.jpg";

const images = [screen1, screen2, screen3, screen4, screen5];

export const BackRoundSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const totalSlides = images.length;

    const autoSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const intervalId = setInterval(autoSlide, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="backround">
      <div className="slider">
        <div className="sliders">
          {images.map((image, i) => (
            <div
              key={i}
              className={`slide ${i === currentSlide ? "active" : ""}`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%", // Juster højden efter behov
                width: "100%", // Juster bredden efter behov
              }}
            ></div>
          ))}
          <div className="navigation-auto">
            {Array.from({ length: images.length }, (_, i) => (
              <div key={i} className={`auto-btn${i + 1}`}></div>
            ))}
          </div>
        </div>
        <div className="navigation-manual">
          {Array.from({ length: images.length }, (_, i) => (
            <label
              key={i}
              htmlFor={`radio${i + 1}`}
              className="manual-btn"
            ></label>
          ))}
        </div>{" "}
      </div>

      <div id="radio">
        {Array.from({ length: images.length }, (_, i) => (
          <input
            key={i}
            type="radio"
            name="radio-btn"
            id={`radio${i + 1}`}
            checked={i === currentSlide}
            onChange={() => setCurrentSlide(i)}
          />
        ))}
      </div>
    </section>
  );
};
