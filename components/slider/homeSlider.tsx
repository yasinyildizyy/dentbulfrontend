import React from "react";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import { MainSwiper } from "components/swiper";

const HomeSlider = ({ data }: any) => {
  return (
    <>
      <div className="c-slider">
        <MainSwiper
          isShowControl
          allowTouchMove
          isSlider
          id={"home-slider"}
          slidesPerView={1}
          loop={true}
          autoplay={2500}
        >
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <div
                className="slider-item slider-item-two slider-item-img"
                style={{
                  backgroundImage: `url(${item.photoUrl})`,
                }}
              >
                <div className="d-table">
                  <div className="d-table-cell">
                    <div className="container">
                      <div className="slider-text">
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>

                        {item.buttonUrl && item.buttonName && (
                          <div className="common-btn">
                            <Link href={item.buttonUrl}>
                              <a>{item.buttonName}</a>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </MainSwiper>
      </div>
    </>
  );
};

export default HomeSlider;
