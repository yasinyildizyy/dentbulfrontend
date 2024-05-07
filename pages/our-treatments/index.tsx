import React from "react";
import { inject, observer } from "mobx-react";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import Store from "stores";
import { BannerJourney, Breadcrumb } from "components";
import { CardTreatment } from "components/card";

interface IOurTreatmentsProps {
  store?: Store | any;
  locale?: string;
  treatments: any;
}

const OurTreatments = ({ treatments }: IOurTreatmentsProps) => {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo title={t("seo.our-treatments")} />

      <div className="p-our-treatments">
        <Breadcrumb
          pageTitle={t("breadcrumbs.our-treatments.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.our-treatments.home-page-text")}
          activePageText={t("breadcrumbs.our-treatments.active-page-text")}
          bgImage="breadcrumb-bg"
        />

        <>
          <section id="treatments" className="color-bg ptb-50">
            <div className="container">
              <div className="row justify-content-center">
                {treatments?.map((item: any, index: number) => (
                  <div key={index} className="col col-12 col-md-6 col-lg-4">
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

OurTreatments.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const treatmentsResponse = await store.treatmentStore.getTreatments({
    locale: ctx?.locale,
    page: "1",
    itemsPerPage: "24",
    pagination: "false",
  });

  return {
    treatments: treatmentsResponse?.data["hydra:member"],
  };
};

OurTreatments.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(OurTreatments));
