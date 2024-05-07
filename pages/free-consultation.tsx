import React from "react";
import { inject, observer } from "mobx-react";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import Store from "stores";
import { Breadcrumb, ContactForm } from "components";

interface IFreeConsultationProps {
  store?: Store | any;
  locale: string;
}

const FreeConsultation = ({ store, locale }: IFreeConsultationProps) => {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo title={t("seo.free-consultation")} />

      <div className="p-free-consultation">
        <Breadcrumb
          pageTitle={t("breadcrumbs.free-consultation.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.free-consultation.home-page-text")}
          activePageText={t("breadcrumbs.free-consultation.active-page-text")}
          bgImage="breadcrumb-bg"
        />

        <>
          <div className="container-fluid">
            <ContactForm
              store={store}
              locale={locale}
              content={{ title: t("free-consultation.form.title"), description: t("free-consultation.form.sub-title") }}
            />
          </div>
        </>
      </div>
    </>
  );
};

FreeConsultation.getInitialProps = async ({ ctx }: any) => {
  return {
    locale: ctx?.locale,
  };
};

FreeConsultation.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(FreeConsultation));
