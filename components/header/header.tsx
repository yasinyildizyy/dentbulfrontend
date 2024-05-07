import React from "react";
import i18n from "utils/i18n";
import { useRouter } from "next/router";
import Link from "next/link";
import cx from "classnames";
import { Dropdown } from "components/dropdown";
import { ActiveLink } from "utils";
import { useTranslation } from "react-i18next";

const TopHeader = ({ isVisible, whatsappNumber, socialMediaAccounts }: any) => {
  const { t } = useTranslation("common");

  return (
    <div
      className={cx("header-top", {
        "d-none": !isVisible.topHeader,
      })}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 col-sm-8 col-lg-9">
            <div className="header-top-item">
              <div className="header-top-left">
                <ul>
                  <li>
                    <a href={whatsappNumber?.key} className="btn-online" target={"_blank"} rel="noreferrer">
                      <i className="icofont-whatsapp" />
                      <span>{t("quiz.complete.online")}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-6 col-sm-4 col-lg-3">
            <div className="header-top-item">
              <div className="header-top-right">
                <ul>
                  {socialMediaAccounts?.map((item: any, index: number) => (
                    <li key={index}>
                      <a href={item.url} target="_blank" rel="noreferrer">
                        <i className={"icofont-" + item.iconName}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ isVisible, data }: any) => {
  const [menu, setMenu] = React.useState(true);
  const router = useRouter();

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  React.useEffect(() => {
    const elementId: any = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.body.classList.remove(lang === "ar" ? "ltr" : "rtl");
    document.body.classList.add(lang === "ar" ? "rtl" : "ltr");
    router.push(`${router?.asPath || "/"}`, `${router?.asPath || "/"}`, { locale: lang });
  };

  const allLanguages: any = {
    en: "English",
    tr: "Türkçe",
    de: "Deutsch",
    fr: "Français",
    ru: "Русский",
  };

  const languages = ["en", "tr", "de", "ru", "fr"];
  const langs = languages?.map((item: any) => ({
    value: item,
    label: allLanguages[item],
  }));

  const classOne = menu ? "collapse navbar-collapse" : "collapse navbar-collapse show";
  const classTwo = menu ? "navbar-toggler navbar-toggler-right collapsed" : "navbar-toggler navbar-toggler-right";

  return (
    <div
      id="navbar"
      className={cx("navbar-area sticky-top", {
        "d-none": !isVisible.navbar,
      })}
    >
      <div className="main-nav">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <ActiveLink href="/">
              <Link href={"/"}>
                <a onClick={toggleNavbar} className="navbar-brand">
                  <img src={"/images/dentbul-logo.png"} draggable="false" alt="Dentbul Logo" />
                </a>
              </Link>
            </ActiveLink>

            <button
              onClick={toggleNavbar}
              className={classTwo}
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </button>

            <div className={classOne} id="navbarSupportedContent">
              <ul className="navbar-nav">
                {data?.map((item: any, index: number) => (
                  <li key={index} className="nav-item">
                    <ActiveLink href={item.path} activeClassName="active">
                      <a
                        onClick={toggleNavbar}
                        className={cx("nav-link", {
                          "dropdown-toggle": item?.children?.length > 0,
                        })}
                      >
                        {item.name}
                      </a>
                    </ActiveLink>

                    {item?.children?.length > 0 && (
                      <ul className="dropdown-menu">
                        {item?.children?.map((subItem: any, subIndex: number) => (
                          <li key={subIndex} className="nav-item">
                            <ActiveLink href={subItem.path} activeClassName="active">
                              <a onClick={toggleNavbar} className="nav-link">
                                {subItem.name}
                              </a>
                            </ActiveLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav-srh">
              <Dropdown
                name="language"
                value={i18n?.language || "en"}
                onChange={(lang: any) => changeLanguage(lang?.value)}
                options={langs}
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

const Header = ({ data, isVisible, contacts, socialMediaAccounts }: any) => {
  const whatsappNumber = contacts?.filter((filter: any) => filter.uniqueName === "whatsapp")[0].extensions[0];

  return (
    <React.Fragment>
      <TopHeader isVisible={isVisible} socialMediaAccounts={socialMediaAccounts} whatsappNumber={whatsappNumber} />
      <Navbar isVisible={isVisible} data={data} />
    </React.Fragment>
  );
};

export default Header;
