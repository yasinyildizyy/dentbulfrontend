import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const StepComplete = ({ whatsappNumber }: any) => {
  const { t } = useTranslation("common");

  return (
    <div className="quiz__elements--complete">
      <img src="/images/checked.png" />
      <h3>{t("quiz.complete.final-title")}</h3>
      <p className="sub-title">{t("quiz.complete.final")}</p>
      <a
        href={whatsappNumber?.key}
        className="d-flex align-items-center justify-content-center mb-5"
        target="_blank"
        rel="noreferrer"
      >
        <i className="icofont-whatsapp"></i>
        <b className="m-2">{t("form.contact.whatsapp")}</b>
      </a>

      <Link href="/">
        <a className="btn-primary">{t("404.button")}</a>
      </Link>
    </div>
  );
};

export default StepComplete;
