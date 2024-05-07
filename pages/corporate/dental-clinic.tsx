import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { SwiperSlide } from "swiper/react";
import Store from "stores";
import { ModalProvider } from "components/modals";
import { Breadcrumb, Gallery, MainSwiper } from "components";
import { CardDoctor, CardGallery } from "components/card";

interface IDentalClinicProps {
  store?: Store | any;
  locale?: string;
  page: any;
  galleryClinic: any;
  galleryBeforeAfter: any;
  doctors: any;
}

const GALLERIES_LIMIT = 12;

const DentalClinic = ({ store, page, galleryClinic, galleryBeforeAfter, doctors }: IDentalClinicProps) => {
  const { t } = useTranslation("common");
  const [modalType, setModalType]: any = useState(null);
  const modal = toJS(store.modalStore.modal);
  const [galleries, setGalleries]: any = useState(null);

  return (
    <>
      <NextSeo title={t("seo.dental-clinic")} />
      {modal && modal.isShow && modal?.type === modalType && (
        <ModalProvider className="sm-modal-height">{modal.body}</ModalProvider>
      )}

      {modal && modal.isShow && modal?.type === "dental-clinic-gallery" && (
        <Gallery
          id="before-after__gallery"
          data={{
            name: galleries?.name,
            initialIndex: modal.body?.index,
            photos: galleries?.galleries,
          }}
        />
      )}

      <div className="p-dental-clinic">
        <Breadcrumb
          pageTitle={t("breadcrumbs.dental-clinic.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.dental-clinic.home-page-text")}
          activePageText={t("breadcrumbs.dental-clinic.active-page-text")}
          bgImage="breadcrumb-bg"
        />

        <>
          <div className="about-area pt-100 pb-32">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <div className="about-item">
                    <div className="about-left play-button">
                      <img
                        src={page?.photoUrl}
                        alt={t("breadcrumbs.dental-clinic.page-title")}
                        title={t("breadcrumbs.dental-clinic.page-title")}
                      />
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          setModalType("about-video");
                          store.modalStore.showModal({
                            isShow: true,
                            body: (
                              <iframe
                                width="100%"
                                height="768"
                                src={`https://www.youtube.com/embed/${page?.videoId}?controls=0&rel=0`}
                                title="Dentbul"
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ),
                            type: "about-video",
                          });
                        }}
                        className="play-button--btn"
                      >
                        <i className="icofont-ui-play"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="about-item about-right">
                    <img
                      src="/images/corporate/about-shape.png"
                      alt={t("breadcrumbs.dental-clinic.page-title")}
                      title={t("breadcrumbs.dental-clinic.page-title")}
                    />
                    <div dangerouslySetInnerHTML={{ __html: page?.description }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section id="dental-clinic" className="color-bg ptb-50">
            <div className="container">
              <div className="section-title">
                <h2>{t("dental-clinic.dental-clinic")}</h2>
              </div>

              <MainSwiper
                breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                isShowControl
                pagination={false}
                id={"dental-clinic"}
                slidesPerView={4}
                loop={true}
                autoplay={4500}
              >
                {galleryClinic?.galleries?.slice(0, GALLERIES_LIMIT).map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <CardGallery
                      imagePath={item.url}
                      zoom
                      title={galleryClinic?.name}
                      onAction={() => {
                        setGalleries(galleryClinic);
                        store.modalStore.showModal({
                          isShow: true,
                          body: {
                            index: index,
                          },
                          type: "dental-clinic-gallery",
                        });
                      }}
                    />
                  </SwiperSlide>
                ))}
              </MainSwiper>
            </div>
          </section>

          <section id="before-after" className="ptb-50">
            <div className="container">
              <div className="section-title">
                <h2>{t("dental-clinic.before-after")}</h2>
              </div>

              {isMobile ? (
                <MainSwiper
                  breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                  isShowControl
                  pagination={false}
                  id={"before-after"}
                  slidesPerView={4}
                  loop={true}
                  autoplay={4500}
                >
                  {galleryBeforeAfter?.galleries?.slice(0, GALLERIES_LIMIT).map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                      <CardGallery
                        imagePath={item.url}
                        zoom
                        title={galleryBeforeAfter?.name}
                        onAction={() => {
                          setGalleries(galleryBeforeAfter);
                          store.modalStore.showModal({
                            isShow: true,
                            body: {
                              index: index,
                            },
                            type: "dental-clinic-gallery",
                          });
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </MainSwiper>
              ) : (
                <div className="row justify-content-center">
                  {galleryBeforeAfter?.galleries?.slice(0, GALLERIES_LIMIT).map((item: any, index: number) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-3">
                      <CardGallery
                        imagePath={item.url}
                        zoom
                        title={galleryBeforeAfter?.name}
                        onAction={() => {
                          setGalleries(galleryBeforeAfter);
                          store.modalStore.showModal({
                            isShow: true,
                            body: {
                              index: index,
                            },
                            type: "dental-clinic-gallery",
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section id="medical-staff" className="color-bg ptb-50">
            <div className="container">
              <div className="section-title">
                <h2>{t("dental-clinic.medical-staff")}</h2>
              </div>

              <MainSwiper
                isShowControl
                breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                pagination={false}
                id={"doctors"}
                slidesPerView={4}
                loop={true}
                autoplay={4500}
              >
                {doctors?.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <CardDoctor fullName={item.fullName} title={item.title} photoUrl={item.photoUrl} />
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

DentalClinic.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const pageResponse: any = await store.mainStore.getStaticPages(ctx?.locale, "dental-clinic");
  const galleryDentalClinicResponse = await store.mainStore.getGalleryCategories(ctx?.locale, "dental-clinic");
  const galleryBeforeAfterResponse = await store.mainStore.getGalleryCategories(ctx?.locale, "before-after");
  const doctorsResponse = await store.mainStore.getDoctors({ locale: ctx?.locale });

  return {
    page: pageResponse?.data,
    galleryClinic: galleryDentalClinicResponse?.data,
    galleryBeforeAfter: galleryBeforeAfterResponse?.data,
    doctors: doctorsResponse?.data["hydra:member"],
  };
};

DentalClinic.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(DentalClinic));
