import React from "react";
import { inject, observer } from "mobx-react";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import Store from "stores";
import { BannerJourney, Breadcrumb } from "components";
import { CardBlog } from "components/card";

interface IBlogProps {
  store?: Store | any;
  locale?: string;
  blog: any;
}

const Blog = ({ blog }: IBlogProps) => {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo title={t("seo.blog")} />
      <div className="p-blog">
        <Breadcrumb
          pageTitle={t("breadcrumbs.blog.page-title")}
          homePageUrl="/"
          homePageText={t("breadcrumbs.blog.home-page-text")}
          activePageText={t("breadcrumbs.blog.active-page-text")}
          bgImage="breadcrumb-bg"
        />

        <>
          <section id="blog" className="color-bg ptb-50">
            <div className="container">
              <div className="row justify-content-center">
                {blog?.map((item: any, index: number) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <CardBlog
                      title={item.title}
                      content={item.description}
                      writeAt={item.writeAt}
                      imagePath={item.photoUrl}
                      button={t("home.blog.read-more")}
                      slug={`/blog/${item?.slug}`}
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

Blog.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const blogResponse = await store.blogStore.getBlog({ locale: ctx?.locale });

  return {
    blog: blogResponse?.data["hydra:member"],
  };
};

Blog.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(Blog));
