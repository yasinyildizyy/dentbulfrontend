import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import Store from "stores";
import { SwiperSlide } from "swiper/react";
import { ModalProvider } from "components/modals";
import { BannerJourney, Breadcrumb, Gallery, MainSwiper } from "components";
import { CardGallery, CardPatient } from "components/card";

interface IPatientTestimonialsProps {
  store?: Store | any;
  locale?: string;
  testimonials: any;
  gallery: any;
}

const GALLERIES_LIMIT = 10;

const PatientTestimonials = ({ store, testimonials, gallery }: IPatientTestimonialsProps) => {
  const { t } = useTranslation("common");
  const [modalType, setModalType]: any = useState(null);
  const modal = toJS(store.modalStore.modal);

  return (
    <>
      <NextSeo title={t("seo.patient-testimonials")} />
      {modal && modal.isShow && modal?.type === modalType && (
        <ModalProvider className="sm-modal-height">{modal.body}</ModalProvider>
      )}

      <div className="p-patient-testimonials">
        <Breadcrumb
          pageTitle={t("breadcrumbs.results-patient-testimonials.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.results-patient-testimonials.home-page-text")}
          activePageText={t("breadcrumbs.results-patient-testimonials.active-page-text")}
          bgImage="breadcrumb-bg"
        />

        {modal && modal.isShow && modal?.type === "about-gallery" && (
          <Gallery
            id="before-after__gallery"
            data={{
              name: gallery?.name,
              initialIndex: modal.body?.index,
              photos: gallery?.galleries,
            }}
          />
        )}

        <>
          <section className="pt-32 pb-32">
            <div className="container">
              <div className="row">
                {testimonials?.map((item: any, index: number) => (
                  <div key={index} className="col col-12 mb-4">
                    <CardPatient
                      constant={{
                        country: {
                          key: t("patient-testimonials.country"),
                          value: item.countryName,
                        },
                        treatment: {
                          key: t("patient-testimonials.treatment"),
                          value: item.type,
                        },
                        year: {
                          key: t("patient-testimonials.year"),
                          value: item.year,
                        },
                      }}
                      button={t("patient-testimonials.watch-video")}
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
                      comment={item.comment}
                      title={item.fullName}
                      imagePath={item.photos[0].url}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="banner-journey" className="mtb-50">
            <BannerJourney />
          </section>

          <section id="before-after" className="color-bg ptb-50">
            <div className="container">
              <div className="section-title">
                <h2>{t("about-us.before-after")}</h2>
              </div>

              <MainSwiper
                isShowControl={false}
                breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                id={2}
                slidesPerView={4}
                loop={true}
                autoplay={4500}
              >
                {gallery?.galleries?.slice(0, GALLERIES_LIMIT).map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <CardGallery
                      imagePath={item.url}
                      zoom
                      title={gallery?.name}
                      onAction={() => {
                        store.modalStore.showModal({
                          isShow: true,
                          body: {
                            index: index,
                          },
                          type: "about-gallery",
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

PatientTestimonials.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const testimonialsResponse = await store.testimonialsStore.getTestimonials({
    locale: ctx?.locale,
    isShowHomepage: "true",
  });
  const galleryResponse = await store.mainStore.getGalleryCategories(ctx?.locale, "before-after");

  return {
    testimonials: testimonialsResponse?.data["hydra:member"],
    gallery: galleryResponse?.data,
  };
};

PatientTestimonials.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(PatientTestimonials));
