import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import common_en from "../public/locales/en.json";
import common_tr from "../public/locales/tr.json";
import common_de from "../public/locales/de.json";
import common_ru from "../public/locales/ru.json";
import common_fr from "../public/locales/fr.json";

const resources = {
  en: {
    common: common_en,
  },
  tr: {
    common: common_tr,
  },
  de: {
    common: common_de,
  },
  ru: {
    common: common_ru,
  },
  fr: {
    common: common_fr,
  },
};

const detectionOptions = {
  order: ["htmlTag", "localStorage", "navigator", "path"],
  caches: ["localStorage"],
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: detectionOptions,
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
