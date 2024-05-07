import React from "react";
import { inject, observer } from "mobx-react";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import Store from "stores";
import cx from "classnames";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

import { BannerJourney, Breadcrumb } from "components";

interface IOurTreatmentsProps {
  store?: Store | any;
  locale?: string;
  treatment: any;
  faq: any;
}

const OurTreatments = ({ treatment, faq }: IOurTreatmentsProps) => {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo title={`${treatment?.name} | ${t("seo.our-treatments")}`} />

      <div className="p-our-treatment__details">
        <Breadcrumb
          pageTitle={treatment?.name}
          homePageUrl="/our-treatments"
          homePageText={t("breadcrumbs.our-treatments-detail.home-page-text")}
          activePageText={treatment?.name}
          bgImage="breadcrumb-bg"
        />

        <>
          <div className="service-details-area pt-32 pb-32">
            <div className="container">
              <div className="services-details-img">
                <img draggable="false" src={treatment?.photoUrl} alt={treatment?.name} title={treatment?.title} />

                <h2>{treatment?.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: treatment?.longDescription }}></div>
              </div>
            </div>

            {treatment?.subs?.length > 0 &&
              treatment?.subs?.map((item: any, index: number) => (
                <div key={index}>
                  {index % 2 === 0 ? (
                    <div key={index} className="color-bg about-area mt-32 mb-32 pt-32 pb-32">
                      <div className="container">
                        <div className="row align-items-center">
                          <div
                            className={cx("", {
                              "col-lg-7": item?.photoUrl,
                              "col-lg-12": !item?.photoUrl,
                            })}
                          >
                            <div className="about-item about-right">
                              <h2>{item?.title}</h2>
                              <div dangerouslySetInnerHTML={{ __html: item?.description }}></div>
                            </div>
                          </div>
                          {item?.photoUrl && (
                            <div className="col-lg-5">
                              <div className="about-item about-left animation-none">
                                <img
                                  src={item?.photoUrl}
                                  alt={t("breadcrumbs.about-us.page-title")}
                                  title={t("breadcrumbs.about-us.page-title")}
                                  draggable="false"
                                  className="animation-none"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="about-area mt-32 mb-32 pt-32 pb-32">
                      <div className="container">
                        <div className="row align-items-center">
                          {item?.photoUrl && (
                            <div className="col-lg-5">
                              <div className="about-item about-left animation-none">
                                <img
                                  src={item?.photoUrl}
                                  draggable="false"
                                  alt={t("breadcrumbs.about-us.page-title")}
                                  title={t("breadcrumbs.about-us.page-title")}
                                  className="animation-none"
                                />
                              </div>
                            </div>
                          )}
                          <div
                            className={cx("", {
                              "col-lg-7": item?.photoUrl,
                              "col-lg-12": !item?.photoUrl,
                            })}
                          >
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
          </div>

          {faq && (
            <div className="faq-area-two pb-70">
              <div className="container">
                <div className="section-title">
                  <h3>{faq?.title}</h3>
                </div>

                <div className="row">
                  <div className="col col-12 col-lg-12">
                    <Accordion allowZeroExpanded preExpanded={["a-0"]}>
                      {faq.faqs?.map((subItem: any, subIndex: any) => (
                        <AccordionItem key={subIndex} uuid={"a-" + subIndex}>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              <span>{subItem.question}</span>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <p>{subItem.answer}</p>
                          </AccordionItemPanel>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          )}

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
  const { slug } = ctx.query;
  const treatmentResponse = await store.treatmentStore.getTreatmentDetail(ctx?.locale, slug);

  let faqResponse = null;
  if (treatmentResponse?.data?.faqGroup) {
    faqResponse = await store.mainStore.getFaqById(ctx?.locale, treatmentResponse?.data?.faqGroup);
  }

  return {
    treatment: treatmentResponse?.data,
    faq: faqResponse?.data,
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
