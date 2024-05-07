import React from "react";
import Store from "stores";
import { inject, observer } from "mobx-react";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { SwiperSlide } from "swiper/react";
import { BannerJourney, Breadcrumb, MainSwiper } from "components";
import { CardBlog } from "components/card";

interface IBlogDetailProps {
  store?: Store | any;
  locale?: string;
  blog: any;
  latestBlog: any;
}

const BlogDetail = ({ blog, latestBlog }: IBlogDetailProps) => {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo title={t("seo.blog")} />

      <div className="p-blog-detail">
        <Breadcrumb
          pageTitle={blog?.title}
          homePageUrl="/"
          homePageText={t("breadcrumbs.blog-detail.home-page-text")}
          activePageText={blog?.title}
          bgImage="breadcrumb-bg"
        />

        <>
          <section className="blog-details-area pt-32">
            <div className="container">
              <div className="blog-details-item">
                <div className="blog-details-img">
                  <img src={blog?.photoUrl} alt={blog?.title} title={blog?.title} />
                  <ul className="write-at">
                    <li>
                      <i className="icofont-calendar"></i>
                      {dayjs(blog?.writeAt).format("DD.MM.YYYY")}
                    </li>
                  </ul>
                  <h2>{blog?.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: blog?.body }}></div>
                </div>
              </div>
            </div>
          </section>

          <section id="banner-journey" className="mtb-50">
            <BannerJourney />
          </section>

          <section id="blog" className="color-bg ptb-50">
            <div className="container">
              <div className="section-title">
                <h2>{t("home.blog.title")}</h2>
              </div>

              <MainSwiper
                isShowControl={false}
                breakpoint={{ 768: 2, 1024: 3, 1366: 3 }}
                id={4}
                slidesPerView={3}
                loop={true}
                autoplay={4500}
              >
                {latestBlog?.map((item: any, index: number) => (
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

BlogDetail.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const { slug } = ctx.query;
  const blogResponse = await store.blogStore.getBlogPostDetail(ctx?.locale, slug);
  const latestBlogResponse = await store.blogStore.getBlog({ locale: ctx?.locale, order: "desc" });

  return {
    blog: blogResponse?.data,
    latestBlog: latestBlogResponse?.data["hydra:member"],
  };
};

BlogDetail.pageConfig = {
  header: {
    topHeader: true,
    navbar: true,
  },
  footer: true,
  whatsappVisible: false,
};

export default inject("store")(observer(BlogDetail));
