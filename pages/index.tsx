import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Link from "next/link";
import Store from "../stores";
import { isMobile } from "react-device-detect";
import { SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { BannerJourney, HomeSlider, MainSwiper } from "components";
import { ModalProvider } from "components/modals";
import { NextSeo } from "next-seo";
import { CardTestimonials, CardInfo, CardTreatment, CardBlog } from "components/card";

interface IProps {
  store?: Store | any;
  locale?: string;
  sliders: any;
  treatments: any;
  testimonials: any;
  blog: any;
  aboutUs: any;
}

const IWantTo = () => {
  const { t } = useTranslation("common");

  return (
    <div id="i-want-to">
      {isMobile ? (
        <MainSwiper id={1} slidesPerView={3} breakpoint={{ 768: 2 }} loop={true} autoplay={3500}>
          <SwiperSlide>
            <CardInfo
              icon="icofont-doctor"
              title={t("home.i-want-to.feature-1.title")}
              content={t("home.i-want-to.feature-1.content")}
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardInfo
              icon="icofont-people"
              title={t("home.i-want-to.feature-2.title")}
              content={t("home.i-want-to.feature-2.content")}
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardInfo
              icon="icofont-certificate-alt-2"
              title={t("home.i-want-to.feature-3.title")}
              content={t("home.i-want-to.feature-3.content")}
            />
          </SwiperSlide>
        </MainSwiper>
      ) : (
        <div className="row justify-content-center">
          <div className="col col-12 col-lg-3">
            <CardInfo
              icon="icofont-doctor"
              title={t("home.i-want-to.feature-1.title")}
              content={t("home.i-want-to.feature-1.content")}
            />
          </div>
          <div className="col col-12 col-lg-3">
            <CardInfo
              icon="icofont-people"
              title={t("home.i-want-to.feature-2.title")}
              content={t("home.i-want-to.feature-2.content")}
            />
          </div>
          <div className="col col-12 col-lg-3">
            <CardInfo
              icon="icofont-certificate-alt-2"
              title={t("home.i-want-to.feature-3.title")}
              content={t("home.i-want-to.feature-3.content")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Index = ({ store, sliders, treatments, testimonials, blog, aboutUs }: IProps) => {
  const { t } = useTranslation("common");
  const [modalType, setModalType]: any = useState(null);
  const modal = toJS(store.modalStore.modal);

  return (
    <>
      <NextSeo title={t("seo.home")} />
      {modal && modal.isShow && modal?.type === modalType && (
        <ModalProvider className="sm-modal-height">{modal.body}</ModalProvider>
      )}

      <div className="p-home">
        <>
          <HomeSlider data={sliders} />

          <div className="container">
            <IWantTo />
          </div>
        </>

        <>
          <section id="about-us" className="hospital-area pt-32 pb-32">
            <div className="container p-0">
              <div className="hospital-shape">
                <img src="/images/home/home-three-hart.png" alt="Shape" />
              </div>

              <div className="row m-0 align-items-center">
                <div className="col-lg-6 p-0">
                  <div className="hospital-item">
                    {aboutUs?.videoId && (
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
                                src={`https://www.youtube.com/embed/${aboutUs?.videoId}?controls=0&rel=0`}
                                title="Dentbul"
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ),
                            type: "about-video",
                          });
                        }}
                        className="hospital-play-btn popup-youtube"
                      >
                        <i className="icofont-ui-play"></i>
                      </div>
                    )}

                    <div className="row m-0">
                      <div className="col-lg-12 p-0">
                        <img src="/images/home/home-about.png" alt="About" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="hospital-right">
                    <div dangerouslySetInnerHTML={{ __html: aboutUs?.description }}></div>

                    <Link href="/corporate/about-us">
                      <a className="primary-btn">{t("home.about-us.button")}</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="treatments" className="color-bg ptb-50 sm-swiper-btn">
            <div className="container">
              <div className="section-title">
                <h2>{t("home.our-treatments.title")}</h2>
              </div>

              {isMobile || treatments?.length < 5 ? (
                <MainSwiper
                  isShowControl
                  breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                  id={2}
                  slidesPerView={3}
                  loop={true}
                  autoplay={4500}
                >
                  {treatments?.map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                      <CardTreatment
                        title={item.name}
                        content={item.shortDescription}
                        imagePath={item.photoUrl}
                        button={t("home.our-treatments.read-more")}
                        slug={`/our-treatments/${item?.slug}`}
                      />
                    </SwiperSlide>
                  ))}
                </MainSwiper>
              ) : (
                <div className="row justify-content-center">
                  {treatments?.map((item: any, index: number) => (
                    <div key={index} className="col-md-6 col-lg-4">
                      <CardTreatment
                        title={item.name}
                        content={item.shortDescription}
                        imagePath={item.photoUrl}
                        button={t("home.our-treatments.read-more")}
                        slug={`/our-treatments/${item?.slug}`}
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

          <section id="patient-testimonials" className="ptb-50 sm-swiper-btn">
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

          <section id="blog" className="color-bg ptb-50 sm-swiper-btn">
            <div className="container">
              <div className="section-title">
                <h2>{t("home.blog.title")}</h2>
              </div>

              <MainSwiper
                isShowControl
                breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                id={4}
                slidesPerView={3}
                loop={true}
                autoplay={4500}
              >
                {blog?.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <CardBlog
                      title={item.title}
                      content={item.description}
                      writeAt={item.writeAt}
                      imagePath={item.photoUrl}
                      button={t("home.blog.read-more")}
                      slug={`/blog/${item?.slug}`}
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

Index.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();

  const sliderResponse = await store.mainStore.getSlider({ locale: ctx?.locale });
  const treatmentsResponse = await store.treatmentStore.getTreatments({ locale: ctx?.locale, isShowHomepage: "true" });
  const testimonialsResponse = await store.testimonialsStore.getTestimonials({
    locale: ctx?.locale,
    isShowHomepage: "true",
  });
  const blogResponse = await store.blogStore.getBlog({ locale: ctx?.locale });
  const pageResponse = await store.mainStore.getStaticPages(ctx?.locale, "about-us");

  return {
    sliders: sliderResponse?.data["hydra:member"],
    treatments: treatmentsResponse?.data["hydra:member"],
    testimonials: testimonialsResponse?.data["hydra:member"],
    blog: blogResponse?.data["hydra:member"],
    aboutUs: pageResponse?.data,
  };
};

Index.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(Index));
