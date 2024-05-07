import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import Store from "stores";
import { SwiperSlide } from "swiper/react";
import { ModalProvider } from "components/modals";
import { BannerJourney, Breadcrumb, Gallery, MainSwiper } from "components";
import { CardGallery, CardTestimonials } from "components/card";

interface IBeforeAfterProps {
  store?: Store | any;
  locale?: string;
  galleryBeforeAfter: any;
  testimonials: any;
}

const GALLERIES_LIMIT = 48;

const BeforeAfter = ({ store, galleryBeforeAfter, testimonials }: IBeforeAfterProps) => {
  const { t } = useTranslation("common");
  const [modalType, setModalType]: any = useState(null);
  const [galleries, setGalleries]: any = useState(null);
  const modal = toJS(store.modalStore.modal);

  return (
    <>
      <NextSeo title={t("seo.before-after")} />
      {modal && modal.isShow && modal?.type === modalType && (
        <ModalProvider className="sm-modal-height">{modal.body}</ModalProvider>
      )}
      {modal && modal.isShow && modal?.type === "before-after-gallery" && (
        <Gallery
          id="before-after__gallery"
          data={{
            name: galleries?.name,
            initialIndex: modal.body?.index,
            photos: galleries?.galleries,
          }}
        />
      )}

      <div className="p-before-after">
        <Breadcrumb
          pageTitle={t("breadcrumbs.results-before-after.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.results-before-after.home-page-text")}
          activePageText={t("breadcrumbs.results-before-after.active-page-text")}
          bgImage="breadcrumb-bg"
        />

        <>
          <section id="before-after" className="ptb-50">
            <div className="container">
              <div className="row justify-content-center">
                {galleryBeforeAfter?.galleries?.slice(0, GALLERIES_LIMIT / 2).map((item: any, index: number) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-3">
                    <CardGallery
                      imagePath={item.url}
                      zoom
                      isGallery
                      title={galleryBeforeAfter?.name}
                      onAction={() => {
                        setGalleries(galleryBeforeAfter);
                        store.modalStore.showModal({
                          isShow: true,
                          body: {
                            index: index,
                          },
                          type: "before-after-gallery",
                        });
                      }}
                    />
                  </div>
                ))}

                <section id="banner-journey" className="mt-5 mb-32">
                  <BannerJourney />
                </section>

                {galleryBeforeAfter?.galleries
                  ?.slice(GALLERIES_LIMIT / 2, GALLERIES_LIMIT)
                  .map((item: any, index: number) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-3">
                      <CardGallery
                        imagePath={item.url}
                        zoom
                        isGallery
                        title={galleryBeforeAfter?.name}
                        onAction={() => {
                          setGalleries(galleryBeforeAfter);
                          store.modalStore.showModal({
                            isShow: true,
                            body: {
                              index: index,
                            },
                            type: "before-after-gallery",
                          });
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </section>

          <section id="banner-journey" className="mtb-50">
            <BannerJourney />
          </section>

          <section id="patient-testimonials" className="ptb-50">
            <div className="container">
              <div className="section-title">
                <h2>{t("home.patient-testimonials.title")}</h2>
              </div>

              <MainSwiper
                isShowControl
                id={3}
                breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                slidesPerView={4}
                loop={false}
                autoplay={7500}
              >
                {testimonials?.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <CardTestimonials
                      title={item.fullName}
                      photos={item?.photos?.slice(0, 1)}
                      button={t("home.patient-testimonials.watch-video")}
                      onAction={() => {
                        setModalType("testimonials-video");
                        store.modalStore.showModal({
                          isShow: true,
                          body: (
                            <iframe
                              width="100%"
                              height="768"
                              src={`https://www.youtube.com/embed/${item.videoId || "K4TOrB7at0Y"}?controls=0&rel=0`}
                              title="Dentbul"
                              frameBorder={0}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ),
                          type: "testimonials-video",
                        });
                      }}
                    />
                  </SwiperSlide>
                ))}
              </MainSwiper>
            </div>
          </section>
        </>
      </div>
    </>
  );
};

BeforeAfter.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const galleryDentalClinicResponse = await store.mainStore.getGalleryCategories(ctx?.locale, "before-after");
  const testimonialsResponse = await store.testimonialsStore.getTestimonials({ locale: ctx?.locale });

  return {
    galleryBeforeAfter: galleryDentalClinicResponse?.data,
    testimonials: testimonialsResponse?.data["hydra:member"],
  };
};

BeforeAfter.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(BeforeAfter));
