import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import { SwiperSlide } from "swiper/react";
import Store from "stores";
import { ModalProvider } from "components/modals";
import { BannerJourney, Breadcrumb, Gallery, MainSwiper } from "components";
import { CardGallery } from "components/card";
import { isMobile } from "react-device-detect";

interface IDentalHolidaysProps {
  store?: Store | any;
  locale?: string;
  galleryTitanic: any;
  gallerySheraton: any;
  page: any;
}

const GALLERIES_LIMIT = 50;

const DentalHolidays = ({ store, galleryTitanic, page, gallerySheraton }: IDentalHolidaysProps) => {
  const { t } = useTranslation("common");
  const [modalType, setModalType]: any = useState(null);
  const [galleries, setGalleries]: any = useState(null);
  const modal = toJS(store.modalStore.modal);

  return (
    <>
      <NextSeo title={t("seo.dental-holidays")} />
      {modal && modal.isShow && modal?.type === modalType && (
        <ModalProvider className="sm-modal-height">{modal.body}</ModalProvider>
      )}

      <div className="p-dental-holidays">
        <Breadcrumb
          pageTitle={t("breadcrumbs.dental-holidays.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.dental-holidays.home-page-text")}
          activePageText={t("breadcrumbs.dental-holidays.active-page-text")}
          bgImage="breadcrumb-bg"
        />

        {modal && modal.isShow && modal?.type === "hotel" && (
          <Gallery
            id="before-after__gallery"
            data={{
              name: galleries?.name,
              initialIndex: modal.body?.index,
              photos: galleries?.galleries,
            }}
          />
        )}

        <>
          <section className="about-area pt-100 pb-32">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <div className="about-item">
                    <div className="about-left play-button">
                      <img
                        src={page?.photoUrl}
                        alt={t("breadcrumbs.about-us.page-title")}
                        title={t("breadcrumbs.about-us.page-title")}
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
                      alt={t("breadcrumbs.about-us.page-title")}
                      title={t("breadcrumbs.about-us.page-title")}
                    />
                    <div dangerouslySetInnerHTML={{ __html: page?.description }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="hotel-titanic" className="color-bg ptb-50">
            <div className="container">
              <div className="section-title">
                <h2>{t("dental-holidays.hotel-titanic")}</h2>
              </div>

              {isMobile ? (
                <MainSwiper
                  breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                  isShowControl
                  pagination={false}
                  id={"hotel-titanic"}
                  slidesPerView={4}
                  loop={true}
                  autoplay={4500}
                >
                  {galleryTitanic?.galleries?.slice(0, GALLERIES_LIMIT).map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                      <CardGallery
                        imagePath={item.url}
                        zoom
                        title={galleryTitanic?.name}
                        onAction={() => {
                          setGalleries(galleryTitanic);
                          store.modalStore.showModal({
                            isShow: true,
                            body: {
                              index: index,
                            },
                            type: "hotel",
                          });
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </MainSwiper>
              ) : (
                <div className="row justify-content-center">
                  {galleryTitanic?.galleries?.slice(0, GALLERIES_LIMIT).map((item: any, index: number) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-4">
                      <CardGallery
                        imagePath={item.url}
                        zoom
                        title={galleryTitanic?.name}
                        onAction={() => {
                          setGalleries(galleryTitanic);
                          store.modalStore.showModal({
                            isShow: true,
                            body: {
                              index: index,
                            },
                            type: "hotel",
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section id="hotel-sheraton" className="color-bg ptb-50">
            <div className="container">
              <div className="section-title">
                <h2>{t("dental-holidays.hotel-sheraton")}</h2>
              </div>

              {isMobile ? (
                <MainSwiper
                  breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                  isShowControl
                  pagination={false}
                  id={"hotel-sheraton"}
                  slidesPerView={4}
                  loop={true}
                  autoplay={4500}
                >
                  {gallerySheraton?.galleries?.slice(0, GALLERIES_LIMIT).map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                      <CardGallery
                        imagePath={item.url}
                        zoom
                        title={gallerySheraton?.name}
                        onAction={() => {
                          setGalleries(gallerySheraton);
                          store.modalStore.showModal({
                            isShow: true,
                            body: {
                              index: index,
                            },
                            type: "hotel",
                          });
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </MainSwiper>
              ) : (
                <div className="row justify-content-center">
                  {galleryTitanic?.galleries?.slice(0, GALLERIES_LIMIT).map((item: any, index: number) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-4">
                      <CardGallery
                        imagePath={item.url}
                        zoom
                        title={galleryTitanic?.name}
                        onAction={() => {
                          setGalleries(galleryTitanic);
                          store.modalStore.showModal({
                            isShow: true,
                            body: {
                              index: index,
                            },
                            type: "hotel",
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section id="banner-journey" className="mtb-50">
            <BannerJourney />
          </section>
        </>
      </div>
    </>
  );
};

DentalHolidays.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const pageResponse: any = await store.mainStore.getStaticPages(ctx?.locale, "dental-holiday");
  const galleryTitanicResponse = await store.mainStore.getGalleryCategories(ctx?.locale, "hotel-titanic");
  const gallerySheratonResponse = await store.mainStore.getGalleryCategories(ctx?.locale, "hotel-sheraton");

  return {
    page: pageResponse?.data,
    galleryTitanic: galleryTitanicResponse?.data,
    gallerySheraton: gallerySheratonResponse?.data,
  };
};

DentalHolidays.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(DentalHolidays));
