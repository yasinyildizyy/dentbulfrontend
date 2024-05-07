import React from "react";
import { inject, observer } from "mobx-react";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import Store from "stores";
import { BannerJourney, Breadcrumb } from "components";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

interface IFaqProps {
  store?: Store | any;
  locale?: string;
  faqList: any;
}

const Faq = ({ faqList }: IFaqProps) => {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo title={t("seo.faq")} />

      <div className="p-faq">
        <Breadcrumb
          pageTitle={t("breadcrumbs.faq.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.faq.home-page-text")}
          activePageText={t("breadcrumbs.faq.active-page-text")}
          bgImage="breadcrumb-bg"
        />

        <>
          <section className="faq-area-two pt-32 pb-100">
            <div className="container">
              {faqList?.map((item: any, index: number) => (
                <div key={index} className="pt-32 pb-32">
                  <div className="section-title">
                    <h3>{item?.title}</h3>
                  </div>

                  <div className="row">
                    <div className="col col-12 col-lg-12">
                      <Accordion allowZeroExpanded preExpanded={["a-" + index]}>
                        {item.faqs?.map((subItem: any, subIndex: any) => (
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
              ))}
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

Faq.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const faqResponse: any = await store.mainStore.getFaq({ locale: ctx?.locale, order: "asc" });

  return {
    faqList: faqResponse?.data["hydra:member"],
  };
};

Faq.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(Faq));
