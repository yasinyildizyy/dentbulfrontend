import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import Store from "stores";
import { SwiperSlide } from "swiper/react";
import { Breadcrumb, Gallery, MainSwiper } from "components";
import { CardDoctor, CardGallery } from "components/card";

interface IMedicalStaffProps {
  store?: Store | any;
  locale?: string;
  doctors: any;
  gallery: any;
}

const GALLERIES_LIMIT = 10;

const MedicalStaff = ({ store, doctors, gallery }: IMedicalStaffProps) => {
  const { t } = useTranslation("common");
  const modal = toJS(store.modalStore.modal);

  return (
    <>
      <NextSeo title={t("seo.medical-staff")} />
      <div className="p-medical-staff">
        <Breadcrumb
          pageTitle={t("breadcrumbs.medical-staff.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.medical-staff.home-page-text")}
          activePageText={t("breadcrumbs.medical-staff.active-page-text")}
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
          <section id="medical-staff" className="color-bg ptb-50">
            <div className="container">
              <div className="section-title">
                <h2>{t("dental-clinic.medical-staff")}</h2>
              </div>

              <div className="row justify-content-center">
                {doctors?.map((item: any, index: number) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-3">
                    <CardDoctor fullName={item.fullName} title={item.title} photoUrl={item.photoUrl} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="before-after" className="color-bg pt-32 pb-32">
            <div className="container">
              <div className="section-title">
                <h2>{t("about-us.before-after")}</h2>
              </div>

              <MainSwiper
                isShowControl={false}
                breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                pagination={false}
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

MedicalStaff.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const doctorsResponse = await store.mainStore.getDoctors({ locale: ctx?.locale });
  const galleryBeforeAfterResponse = await store.mainStore.getGalleryCategories(ctx?.locale, "before-after");

  return {
    doctors: doctorsResponse?.data["hydra:member"],
    gallery: galleryBeforeAfterResponse?.data,
  };
};

MedicalStaff.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(MedicalStaff));
