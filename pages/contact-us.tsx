import React from "react";
import { inject, observer } from "mobx-react";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import Store from "stores";
import { Breadcrumb, ContactForm } from "components";

interface IContactUsProps {
  store?: Store | any;
  locale: string;
  settings: any;
}

const ContactUs = ({ store, settings, locale }: IContactUsProps) => {
  const { t } = useTranslation("common");
  const emails = settings?.filter((filter: any) => filter.uniqueName === "email")[0];
  const phones = settings?.filter((filter: any) => filter.uniqueName === "phone")[0];
  const address = settings?.filter((filter: any) => filter.uniqueName === "address")[0];
  const whatsappNumber = settings?.filter((filter: any) => filter.uniqueName === "whatsapp")[0].extensions[0];

  return (
    <>
      <NextSeo title={t("seo.contact-us")} />

      <div className="p-contact-us">
        <Breadcrumb
          pageTitle={t("breadcrumbs.contact-us.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.contact-us.home-page-text")}
          activePageText={t("breadcrumbs.contact-us.active-page-text")}
          bgImage="breadcrumb-bg"
        />

        <>
          <div className="location-area pt-100 pb-70">
            <div className="container">
              <div className="row justify-content-center location-wrap">
                <div className="col-sm-6 col-lg-4">
                  <div className="location-item">
                    <i className="icofont-location-pin"></i>
                    <h3>{t("contact-us.location")}</h3>
                    {address?.extensions?.slice(0, 1)?.map((item: any, index: number) => (
                      <p key={index}>{item.value}</p>
                    ))}
                  </div>
                </div>

                <div className="col-sm-6 col-lg-4">
                  <div className="location-item">
                    <i className="icofont-ui-message"></i>
                    <h3>{t("contact-us.email")}</h3>
                    {emails?.extensions?.map((item: any, index: number) => (
                      <p key={index}>{item.value}</p>
                    ))}
                  </div>
                </div>

                <div className="col-sm-6 col-lg-4">
                  <div className="location-item">
                    <i className="icofont-ui-call"></i>
                    <h3>{t("contact-us.phone")}</h3>
                    {phones?.extensions?.map((item: any, index: number) => (
                      <p key={index}>{item.value}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <ContactForm
              store={store}
              locale={locale}
              contact={{
                slug: whatsappNumber?.key,
                title: whatsappNumber?.value,
              }}
              content={{ title: t("contact-us.title") }}
            />
          </div>
        </>
      </div>
    </>
  );
};

ContactUs.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const settingsResponse = await store.mainStore.getSettings(ctx?.locale);

  return {
    settings: settingsResponse?.data["hydra:member"],
    locale: ctx?.locale,
  };
};

ContactUs.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(ContactUs));
