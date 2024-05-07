import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trans, useTranslation } from "react-i18next";

const BannerJourney = () => {
  const { t } = useTranslation("common");

  return (
    <div className="c-banner__journey">
      <div className="overlay"></div>

      <div className="">
        <div className="journey__body">
          <div className="logo">
            <Image
              alt="Dentbul"
              objectFit="contain"
              title="Dentbul"
              src="/images/dentbul-logo.png"
              width={64}
              height={64}
              draggable="false"
              quality={100}
            />
          </div>

          <h2>{t("banner.journey.title")}</h2>
          <p>
            <Trans t={t} components={{ b: <b /> }}>
              banner.journey.description
            </Trans>
          </p>

          <Link href="/journey-plan">
            <a className="btn-primary">{t("banner.journey.button")}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerJourney;
