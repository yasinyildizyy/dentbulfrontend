import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import { SwiperSlide } from "swiper/react";
import Store from "stores";
import { ModalProvider } from "components/modals";
import { Breadcrumb, Gallery, MainSwiper } from "components";
import { CardGallery } from "components/card";

interface IAboutUsProps {
  store?: Store | any;
  locale?: string;
  page: any;
  testimonials: any;
  gallery: any;
}

const GALLERIES_LIMIT = 10;

const AboutUs = ({ store, page, testimonials, gallery }: IAboutUsProps) => {
  const { t } = useTranslation("common");
  const [modalType, setModalType]: any = useState(null);
  const modal = toJS(store.modalStore.modal);

  return (
    <>
      <NextSeo title={t("seo.about-us")} />
      {modal && modal.isShow && modal?.type === modalType && (
        <ModalProvider className="sm-modal-height">{modal.body}</ModalProvider>
      )}

      <div className="p-about-us">
        <Breadcrumb
          pageTitle={t("breadcrumbs.about-us.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.about-us.home-page-text")}
          activePageText={t("breadcrumbs.about-us.active-page-text")}
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
          <div className="about-area pt-100 pb-32">
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
          </div>

          {page?.subs?.length > 0 &&
            page?.subs?.map((item: any, index: number) => (
              <div key={index}>
                {index % 2 === 0 ? (
                  <div key={index} className="color-bg about-area mt-32 mb-32 pt-32 pb-32">
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col-lg-7">
                          <div className="about-item about-right">
                            <h2>{item?.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: item?.description }}></div>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="about-item about-left animation-none">
                            <img
                              src={item?.photoUrl}
                              alt={t("breadcrumbs.about-us.page-title")}
                              title={t("breadcrumbs.about-us.page-title")}
                              className="animation-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="about-area mt-32 mb-32 pt-32 pb-32">
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col-lg-5">
                          <div className="about-item about-left animation-none">
                            <img
                              src={item?.photoUrl}
                              alt={t("breadcrumbs.about-us.page-title")}
                              title={t("breadcrumbs.about-us.page-title")}
                              className="animation-none"
                            />
                          </div>
                        </div>
                        <div className="col-lg-7">
                          <div className="about-item about-right">
                            <h2>{item?.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: item?.description }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

          <div className="review-area ptb-100 sm-swiper-btn">
            <div className="container">
              <MainSwiper
                id={1}
                isShowControl
                breakpoint={{ 768: 1, 1024: 1, 1366: 1 }}
                slidesPerView={1}
                loop={true}
                autoplay={4500}
              >
                {testimonials?.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="feedback-item">
                      <div className="client-img">
                        <img src={item.photos[0]?.url} alt={item.fullName} title={item.fullName} />
                        <h3>{item.fullName}</h3>
                      </div>
                      <p>{item.comment}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </MainSwiper>
            </div>
          </div>

          <section id="before-after" className="color-bg ptb-50 sm-swiper-btn">
            <div className="container">
              <div className="section-title">
                <h2>{t("about-us.before-after")}</h2>
              </div>

              <MainSwiper
                isShowControl
                id={2}
                breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
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

AboutUs.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const pageResponse: any = await store.mainStore.getStaticPages(ctx?.locale, "about-us");
  const testimonialsResponse = await store.testimonialsStore.getTestimonials({ locale: ctx?.locale });
  const galleryResponse = await store.mainStore.getGalleryCategories(ctx?.locale, "before-after");

  return {
    page: pageResponse?.data,
    testimonials: testimonialsResponse?.data["hydra:member"],
    gallery: galleryResponse?.data,
  };
};

AboutUs.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(AboutUs));
