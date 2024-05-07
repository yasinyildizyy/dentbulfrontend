import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Footer = ({ data, contacts }: any) => {
  const { t } = useTranslation("common");

  const emails = contacts?.filter((filter: any) => filter.uniqueName === "email")[0];
  const phones = contacts?.filter((filter: any) => filter.uniqueName === "phone")[0];
  const address = contacts?.filter((filter: any) => filter.uniqueName === "address")[0];

  return (
    <>
      <footer className="pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <div className="footer-item">
                <div className="footer-contact">
                  <h3>{t("footer.contact-us")}</h3>
                  <ul>
                    <li>
                      <i className="icofont-ui-message"></i>
                      {emails?.extensions?.map((item: any, index: number) => (
                        <a key={index} href={item.key} target="_blank" rel="noreferrer">
                          {item.value}
                        </a>
                      ))}
                    </li>
                    <li>
                      <i className="icofont-stock-mobile"></i>
                      {phones?.extensions?.map((item: any, index: number) => (
                        <a key={index} href={item.key} target="_blank" rel="noreferrer">
                          {item.value}
                        </a>
                      ))}
                    </li>
                    {address?.extensions?.map((item: any, index: number) => (
                      <li key={index}>
                        <i className="icofont-location-pin"></i>
                        <a key={index} target="_blank" rel="noreferrer">
                          {item.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-2">
              <div className="footer-item">
                <div className="footer-quick">
                  <h3>{data[0]?.name}</h3>
                  <ul>
                    {data[0]?.children?.map((item: any, index: number) => (
                      <li key={index}>
                        <Link href={item?.path}>
                          <a>{item.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="footer-item">
                <div className="footer-quick">
                  <h3>{data[1]?.name}</h3>
                  <ul>
                    {data[1]?.children.slice(0, 10)?.map((item: any, index: number) => (
                      <li key={index}>
                        <Link href={item?.path}>
                          <a>{item.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="footer-item">
                <div className="footer-quick">
                  <h3 className="opacity-0">{data[1]?.name}</h3>
                  <ul>
                    {data[1]?.children.slice(10, 20)?.map((item: any, index: number) => (
                      <li key={index}>
                        <Link href={item?.path}>
                          <a>{item.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
