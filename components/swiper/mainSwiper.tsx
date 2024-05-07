import React from "react";
import { Swiper } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import cx from "classnames";
import { ArrowNext, ArrowPrev } from "components/icons";

interface ISwiperProps {
  id?: number | string;
  isShowControl?: boolean;
  children?: any;
  initialSlide?: number;
  slidesPerView?: number;
  loop?: boolean;
  centeredSlidesBounds?: boolean;
  pauseOnMouseEnter?: boolean;
  autoplay?: number;
  isSlider?: boolean;
  allowTouchMove?: boolean;
  effect?: any;
  pagination?: any;
  breakpoint?: any;
}

const MainSwiper = ({
  id,
  children,
  isShowControl = false,
  initialSlide,
  slidesPerView,
  loop,
  centeredSlidesBounds,
  pauseOnMouseEnter,
  autoplay,
  isSlider,
  allowTouchMove = true,
  pagination = false,
  effect = "slide",
  breakpoint,
}: ISwiperProps) => {
  const swiperCore = [EffectFade, Navigation, Autoplay];
  if (pagination) {
    swiperCore.push(Pagination);
  }

  SwiperCore.use(swiperCore);

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: isSlider ? 1 : 3,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: isSlider ? 1 : breakpoint?.[768] || slidesPerView,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: breakpoint?.[1024] || slidesPerView || 3,
      spaceBetween: 32,
    },
    1366: {
      slidesPerView: breakpoint?.[1366] || slidesPerView || 3,
      spaceBetween: 32,
    },
    1440: {
      slidesPerView: breakpoint?.[1440] || slidesPerView,
      spaceBetween: 32,
    },
  };

  return (
    <div id="swiperjs" className={"swiper-" + id}>
      {isShowControl && (
        <div className={cx("swiper__buttons", { "swiper__buttons--slider": isSlider })}>
          <div id={"js-next" + id} className="swiper__buttons--next">
            <ArrowNext width={16} height={16} />
          </div>
          <div id={"js-prev" + id} className="swiper__buttons--prev">
            <ArrowPrev width={16} height={16} />
          </div>
        </div>
      )}

      <Swiper
        className={"swiper" + id}
        allowTouchMove={allowTouchMove}
        slidesPerView={slidesPerView}
        effect={effect}
        spaceBetween={24}
        initialSlide={initialSlide}
        threshold={25}
        slideDuplicateActiveClass="swiper__slide--active"
        slideActiveClass="swiper__slide--active"
        centeredSlides={centeredSlidesBounds}
        centeredSlidesBounds={centeredSlidesBounds}
        pagination={{
          dynamicBullets: true,
        }}
        loop={loop}
        autoplay={{
          delay: autoplay || 999999,
          pauseOnMouseEnter: pauseOnMouseEnter,
        }}
        grabCursor
        navigation={{
          nextEl: "#js-next" + id,
          prevEl: "#js-prev" + id,
          disabledClass: "swiper__buttons--disable",
        }}
        breakpoints={breakpoints}
      >
        {children}
      </Swiper>
    </div>
  );
};

MainSwiper.defaultProps = {
  initialSlide: 0,
  slidesPerView: 4,
  centeredSlidesBounds: false,
  pauseOnMouseEnter: false,
  loop: false,
  autoplay: false,
};

export default MainSwiper;
