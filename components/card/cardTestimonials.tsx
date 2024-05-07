import React from "react";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import { MainSwiper } from "components/swiper";

interface ICardTestimonials {
  title: string;
  button: string;
  onAction?: any;
  photos: any;
}

const CardTestimonials = ({ title, button, onAction, photos }: ICardTestimonials) => {
  return (
    <div className="c-card__testimonials">
      <div className="doctor-item">
        <div className="doctor-top">
          <div>
            {photos?.length > 1 ? (
              <MainSwiper id={5} pagination slidesPerView={1} loop={false}>
                {photos?.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-img">
                      <img src={item.url} alt={title} title={title} />
                    </div>
                  </SwiperSlide>
                ))}
              </MainSwiper>
            ) : (
              <img src={photos[0]?.url} alt={title} title={title} />
            )}
          </div>

          {onAction && (
            <div onClick={onAction} className="watch-button">
              <a>{button}</a>
            </div>
          )}
        </div>
        <div className="doctor-bottom">
          <h3>
            <Link href="/doctor-details">
              <a>{title}</a>
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CardTestimonials;
