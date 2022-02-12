import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsContext from "context/ProductsContext";

const SliderItems = () => {
  const { sliderUrl } = useContext(ProductsContext);

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  return (
    <div style={{ margin: "0 auto 50px" }}>
      <Slider {...settings}>
        {sliderUrl.map((image) => {
          return (
            <div key={image}>
              <img
                src={image}
                alt="Pic"
                style={{
                  width: "100%",
                  height: 500,
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderItems;
