import React from "react";
import { SwiperSlide } from "swiper/react";
import { CardGallery } from "components/card";
import { ModalProvider } from "components/modals";
import { MainSwiper } from "components/swiper";

const Gallery = ({ data, id = "gallery" }: any) => {
  return (
    <div className="c-gallery">
      <ModalProvider>
        <MainSwiper
          isShowControl
          id={id || "gallery"}
          slidesPerView={1}
          loop={true}
          initialSlide={data?.initialIndex || 0}
        >
          {data?.photos?.map((subItem: any, subIndex: number) => (
            <SwiperSlide key={subIndex}>
              <CardGallery imagePath={subItem?.url} title={data?.name} />
            </SwiperSlide>
          ))}
        </MainSwiper>
      </ModalProvider>
    </div>
  );
};

export default Gallery;
