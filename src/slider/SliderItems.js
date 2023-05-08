import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {onSnapshot} from "@firebase/firestore";
import {collection} from "firebase/firestore";
import {db} from "../firebase";

const SliderItems = () => {
  const [sliderImg, setSliderImg] = useState([]);

  useEffect(() => {
    const getItems = onSnapshot(
      collection(db, 'carousel'),
      (snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
          items.push({id: doc.id, ...doc.data()})
        });
        setSliderImg(items)
      },
      (error) => {
        console.log('All items - ', error.message)
      }
    );

    return () => {
      getItems()
    }
  }, [])

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
    <div style={{margin: "0 auto 50px"}}>
      <Slider {...settings}>
        {sliderImg.map((item) => {
          return (
            <div key={item.id}>
              <img
                src={item.image}
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
