import React, { useEffect } from "react";
import { AppInitialProps } from "next/app";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { I18nextProvider } from "react-i18next";
import { Provider } from "mobx-react";
import NProgress from "nprogress";
import Store from "../stores";
import i18n from "../utils/i18n";

import "../styles/index.scss";
import { Footer, Header, StickCallButton } from "components";

const { publicRuntimeConfig } = getConfig();

interface IProps extends AppInitialProps {
  store?: Store;
  Component: any;
  statusCode: any;
  menuHeader: any;
  menuFooter: any;
  settings: any;
  socialMediaAccounts: any;
  pageConfig: {
    header: {
      topHeader: boolean;
      navbar: boolean;
    };
    footer: boolean;
    whatsappVisible: boolean;
  };
}

const store = new Store();
const MyApp = (props: IProps) => {
  const router = useRouter();
  const { menuHeader, menuFooter, settings, socialMediaAccounts, statusCode, Component, pageProps, pageConfig } = props;

  useEffect(() => {
    if (statusCode && [404, 500].includes(statusCode)) {
      router.push("404");
    }
  }, [statusCode]);

  useEffect(() => {
    router.events.on("routeChangeStart", NProgress.start);
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());

    return () => {
      router.events.off("routeChangeStart", NProgress.start);
      router.events.off("routeChangeComplete", () => NProgress.done());
      router.events.off("routeChangeError", () => NProgress.done());
    };
  }, [router.events]);

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        {!pageConfig?.header?.topHeader && !pageConfig?.header?.navbar ? (
          <div />
        ) : (
          <Header
            isVisible={pageConfig?.header}
            store={store}
            data={menuHeader}
            contacts={settings}
            socialMediaAccounts={socialMediaAccounts}
          />
        )}

        {pageConfig?.whatsappVisible && <StickCallButton settings={settings} />}
        <Component {...pageProps} />
        {pageConfig?.footer ? <Footer data={menuFooter} contacts={settings} /> : <div />}
      </Provider>
    </I18nextProvider>
  );
};

MyApp.getInitialProps = async ({ ctx, Component }: { ctx: any; Component: any }): Promise<IProps | AppInitialProps> => {
  let { pageConfig } = publicRuntimeConfig;

  const menuHeaderResponse = await store.mainStore.getMenu({ locale: ctx?.locale, type: "header" });
  const menuFooterResponse = await store.mainStore.getMenu({ locale: ctx?.locale, type: "footer" });
  const settingsResponse = await store.mainStore.getSettings(ctx?.locale);
  const socialMediaAccountsResponse = await store.mainStore.getSocialMediaAccounts({ locale: ctx?.locale });

  if (Component.pageConfig) {
    pageConfig = {
      ...pageConfig,
      ...Component.pageConfig,
    };
  }

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ctx });
  }

  const statusCode = ctx?.res ? ctx?.res.statusCode : null;

  return {
    pageProps,
    statusCode,
    pageConfig,
    menuHeader: menuHeaderResponse?.data?.["hydra:member"],
    menuFooter: menuFooterResponse?.data?.["hydra:member"],
    settings: settingsResponse?.data?.["hydra:member"],
    socialMediaAccounts: socialMediaAccountsResponse?.data?.["hydra:member"],
  };
};

NProgress.configure({ showSpinner: false });

export default MyApp;
