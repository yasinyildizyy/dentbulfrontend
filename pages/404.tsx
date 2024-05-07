import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { NextSeo } from "next-seo";

const Error404 = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo title={t("404.sub-title")} />

      <div className="error-area">
        <div className="error-item">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="error-text">
                <h1>{t("404.title")}</h1>
                <p>{t("404.sub-title")}</p>
                <span>{t("404.description")}</span>

                <Link href="/">
                  <a>{t("404.button")}</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
