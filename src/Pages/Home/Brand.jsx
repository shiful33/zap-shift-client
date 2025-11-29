import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../assets/brands/amazon.png";
import amazon_vector from "../../assets/brands/amazon_vector.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstand from "../../assets/brands/randstad.png";
import star from "../../assets/brands/star.png";
import star_people from "../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const brandLogos = [
    amazon, amazon_vector, casio, moonstar, randstand, star, star_people
];

const Brand = () => {
  return (
    <div className="mb-[100px]">
        <div>
            <h2 className="text-[28px] font-extrabold mb-12 text-center">We've helped thousands of sales teams</h2>
        </div>
    <Swiper
      loop={true}
      slidesPerView={5}
      centeredSlides={true}
      spaceBetween={20}
      grabCursor={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
        }}
    >
        {
            brandLogos.map((logo, index) => <SwiperSlide key={index}>
                <img src={logo} alt="" />
            </SwiperSlide>)
        }
      
    </Swiper>
    </div>
  );
};

export default Brand;
