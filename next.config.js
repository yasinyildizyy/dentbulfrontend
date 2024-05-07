const path = require("path");

module.exports = {
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  i18n: {
    locales: ["en", "de", "ru", "fr", "tr"],
    defaultLocale: "en",
  },
  images: {
    domains: ["localhost", "dentbul.com", "dentbul.bigoen.net", "towersimplant.com.tr"],
    deviceSizes: [320, 360, 375, 414, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [8, 16, 32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 60,
  },
  env: {
    GLOB_NAME: process.env.GLOB_NAME,
    SERVER_IP: process.env.SERVER_IP,
    SERVER_ID_RSA: process.env.SERVER_ID_RSA,
    APP_ENV: process.env.APP_ENV,
    APP_PORT: process.env.APP_PORT,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  publicRuntimeConfig: {
    pageConfig: {
      footer: true,
      header: {
        topHeader: true,
        navbar: true,
      },
      layout: true,
      error: false,
    },
  },
  async redirects() {
    return [
      {
        source: "/laminierte-zahnverblendungen-in-der-turkei",
        destination: "/our-treatments/dental-laminate-veneer-in-turkey",
        permanent: true,
      },
      {
        source: "/dental-laminate-veneer-in-turkey",
        destination: "/our-treatments/dental-laminate-veneer-in-turkey",
        permanent: true,
      },
      {
        source: "/facette-dentaire-laminee-en-turquie",
        destination: "/our-treatments/dental-laminate-veneer-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-lamine-kaplama",
        destination: "/our-treatments/dental-laminate-veneer-in-turkey",
        permanent: true,
      },
      {
        source: "/зубное-ламинированное-покрытие-в-тур",
        destination: "/our-treatments/dental-laminate-veneer-in-turkey",
        permanent: true,
      },
      {
        source: "/zahnimplantate-in-der-turkei",
        destination: "/our-treatments/dental-implants-in-turkey-istanbul",
        permanent: true,
      },
      {
        source: "/implants-in-turkey",
        destination: "/our-treatments/dental-implants-in-turkey-istanbul",
        permanent: true,
      },
      {
        source: "/implants-dentaires-en-turquie",
        destination: "/our-treatments/dental-implants-in-turkey-istanbul",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-implantlari",
        destination: "/our-treatments/dental-implants-in-turkey-istanbul",
        permanent: true,
      },
      {
        source: "/зубные-имплантаты-в-турции",
        destination: "/our-treatments/dental-implants-in-turkey-istanbul",
        permanent: true,
      },
      {
        source: "/zahnfleischbehandlungen-in-der-turkei",
        destination: "/our-treatments/gum-treatments-in-turkey",
        permanent: true,
      },
      {
        source: "/gum-treatments-in-turkey",
        destination: "/our-treatments/gum-treatments-in-turkey",
        permanent: true,
      },
      {
        source: "/traitements-des-gencives-en-turquie",
        destination: "/our-treatments/gum-treatments-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-eti-tedavileri",
        destination: "/our-treatments/gum-treatments-in-turkey",
        permanent: true,
      },
      {
        source: "/лечение-десен-в-турции",
        destination: "/our-treatments/gum-treatments-in-turkey",
        permanent: true,
      },
      {
        source: "/turkische-zahnkronen-volle-verblendung-der-zahne",
        destination: "/our-treatments/turkey-dental-crowns-full-veneers",
        permanent: true,
      },
      {
        source: "/dental-crowns-full-veneers",
        destination: "/our-treatments/turkey-dental-crowns-full-veneers",
        permanent: true,
      },
      {
        source: "/couronnes-dentaires-en-turquie-facettes-completes",
        destination: "/our-treatments/turkey-dental-crowns-full-veneers",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-kronlari-tam-kaplamalar",
        destination: "/our-treatments/turkey-dental-crowns-full-veneers",
        permanent: true,
      },
      {
        source: "/турция-зубные-коронки-полные-зубные-п",
        destination: "/our-treatments/turkey-dental-crowns-full-veneers",
        permanent: true,
      },
      {
        source: "/zahnkronen-in-der-turkei",
        destination: "/our-treatments/dental-crowns-in-turkey",
        permanent: true,
      },
      {
        source: "/dental-crowns-in-turkey",
        destination: "/our-treatments/dental-crowns-in-turkey",
        permanent: true,
      },
      {
        source: "/couronnes-dentaires-en-turquie",
        destination: "/our-treatments/dental-crowns-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-kronlari",
        destination: "/our-treatments/dental-crowns-in-turkey",
        permanent: true,
      },
      {
        source: "/зубные-коронки-в-турции",
        destination: "/our-treatments/dental-crowns-in-turkey",
        permanent: true,
      },
      {
        source: "/porzellan-verblendung-in-der-turkei",
        destination: "/our-treatments/porcelain-veneers-in-turkey",
        permanent: true,
      },
      {
        source: "/porcelain-veneers-in-turkey",
        destination: "/our-treatments/porcelain-veneers-in-turkey",
        permanent: true,
      },
      {
        source: "/facettes-de-porcelaine-en-turquie",
        destination: "/our-treatments/porcelain-veneers-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-porselen-dis-kaplama",
        destination: "/our-treatments/porcelain-veneers-in-turkey",
        permanent: true,
      },
      {
        source: "/фарфоровое-зубное-покрытие-в-турции",
        destination: "/our-treatments/porcelain-veneers-in-turkey",
        permanent: true,
      },
      {
        source: "/aufbiss-schiene-in-der-turkei",
        destination: "/our-treatments/gum-shield-in-turkey",
        permanent: true,
      },
      {
        source: "/gum-shield-in-turkey",
        destination: "/our-treatments/gum-shield-in-turkey",
        permanent: true,
      },
      {
        source: "/protege-dents-en-turquie",
        destination: "/our-treatments/gum-shield-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-sakiz-kalkani",
        destination: "/our-treatments/gum-shield-in-turkey",
        permanent: true,
      },
      {
        source: "/щит-хиос-в-турции",
        destination: "/our-treatments/gum-shield-in-turkey",
        permanent: true,
      },
      {
        source: "/дизайн-улыбки-в-турции",
        destination: "/our-treatments/smile-design-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-gulus-tasarimi",
        destination: "/our-treatments/smile-design-in-turkey",
        permanent: true,
      },
      {
        source: "/conception-de-sourire-en-turquie",
        destination: "/our-treatments/smile-design-in-turkey",
        permanent: true,
      },
      {
        source: "/smile-design-in-turkey",
        destination: "/our-treatments/smile-design-in-turkey",
        permanent: true,
      },
      {
        source: "/lachel-design-in-der-turkei",
        destination: "/our-treatments/smile-design-in-turkey",
        permanent: true,
      },
      {
        source: "/zahnweissung-in-der-turkei",
        destination: "/our-treatments/degistirilen",
        permanent: true,
      },
      {
        source: "/teeth-whitening",
        destination: "/our-treatments/degistirilen",
        permanent: true,
      },
      {
        source: "/turquie-blanchiment-des-dents-a-istanbul",
        destination: "/our-treatments/degistirilen",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-beyazlatma",
        destination: "/our-treatments/degistirilen",
        permanent: true,
      },
      {
        source: "/в-турции-стамбул-отбеливание-зубов",
        destination: "/our-treatments/degistirilen",
        permanent: true,
      },
      {
        source: "/gesichtsstraffung-in-der-turkei",
        destination: "/our-treatments/dental-face-lift-in-turkey",
        permanent: true,
      },
      {
        source: "/dental-face-lift-in-turkey",
        destination: "/our-treatments/dental-face-lift-in-turkey",
        permanent: true,
      },
      {
        source: "/lifting-dentaire-en-turquie",
        destination: "/our-treatments/dental-face-lift-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-yuz-germe",
        destination: "/our-treatments/dental-face-lift-in-turkey",
        permanent: true,
      },
      {
        source: "/подтяжка-лица-зубов-в-турции",
        destination: "/our-treatments/dental-face-lift-in-turkey",
        permanent: true,
      },
      {
        source: "/zahnverblendungen-in-der-turkei",
        destination: "/our-treatments/dental-veneers-in-turkey",
        permanent: true,
      },
      {
        source: "/dental-veneers-in-turkey",
        destination: "/our-treatments/dental-veneers-in-turkey",
        permanent: true,
      },
      {
        source: "/facettes-dentaires-en-turquie",
        destination: "/our-treatments/dental-veneers-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-kaplamalari",
        destination: "/our-treatments/dental-veneers-in-turkey",
        permanent: true,
      },
      {
        source: "/зубные-покрытия-в-турции",
        destination: "/our-treatments/dental-veneers-in-turkey",
        permanent: true,
      },
      {
        source: "/удаление-зубов-в-турции",
        destination: "/our-treatments/tooth-extraction-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-cekimi",
        destination: "/our-treatments/tooth-extraction-in-turkey",
        permanent: true,
      },
      {
        source: "/extraction-dentaire-en-turquie",
        destination: "/our-treatments/tooth-extraction-in-turkey",
        permanent: true,
      },
      {
        source: "/tooth-extraction-in-turkey",
        destination: "/our-treatments/tooth-extraction-in-turkey",
        permanent: true,
      },
      {
        source: "/zahnextraktion-in-der-turkei",
        destination: "/our-treatments/tooth-extraction-in-turkey",
        permanent: true,
      },
      {
        source: "/zahnspange-in-der-turkei",
        destination: "/our-treatments/braces-in-turkey",
        permanent: true,
      },
      {
        source: "/braces-in-turkey",
        destination: "/our-treatments/braces-in-turkey",
        permanent: true,
      },
      {
        source: "/appareils-dentaires-en-turquie",
        destination: "/our-treatments/braces-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-telleri",
        destination: "/our-treatments/braces-in-turkey",
        permanent: true,
      },
      {
        source: "/брекеты-в-турции",
        destination: "/our-treatments/braces-in-turkey",
        permanent: true,
      },
      {
        source: "/inlay-und-onlay-in-der-turkei",
        destination: "/our-treatments/inlays-and-onlays-in-turkey",
        permanent: true,
      },
      {
        source: "/inlays-and-onlays-in-turkey",
        destination: "/our-treatments/inlays-and-onlays-in-turkey",
        permanent: true,
      },
      {
        source: "/inlays-et-onlays-en-turquie",
        destination: "/our-treatments/inlays-and-onlays-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-inley-ve-onleyler",
        destination: "/our-treatments/inlays-and-onlays-in-turkey",
        permanent: true,
      },
      {
        source: "/вкладки-и-накладки-в-турции",
        destination: "/our-treatments/inlays-and-onlays-in-turkey",
        permanent: true,
      },
      {
        source: "/uber-uns",
        destination: "/corporate/about-us",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/corporate/about-us",
        permanent: true,
      },
      {
        source: "/a-propos-de-nous",
        destination: "/corporate/about-us",
        permanent: true,
      },
      {
        source: "/hakkimizda",
        destination: "/corporate/about-us",
        permanent: true,
      },
      {
        source: "/о-нас",
        destination: "/corporate/about-us",
        permanent: true,
      },
      {
        source: "/poliklinik",
        destination: "/corporate/dental-clinic",
        permanent: true,
      },
      {
        source: "/clinic",
        destination: "/corporate/dental-clinic",
        permanent: true,
      },
      {
        source: "/policlinique",
        destination: "/corporate/dental-clinic",
        permanent: true,
      },
      {
        source: "/poliklinigimiz",
        destination: "/corporate/dental-clinic",
        permanent: true,
      },
      {
        source: "/поликлиника",
        destination: "/corporate/dental-clinic",
        permanent: true,
      },
      {
        source: "/medezinische-angestellte",
        destination: "/corporate/medical-staff",
        permanent: true,
      },
      {
        source: "/medical-staff",
        destination: "/corporate/medical-staff",
        permanent: true,
      },
      {
        source: "/le-personnel-medical",
        destination: "/corporate/medical-staff",
        permanent: true,
      },
      {
        source: "/medikal-kadro",
        destination: "/corporate/medical-staff",
        permanent: true,
      },
      {
        source: "/медицинский-персонал",
        destination: "/corporate/medical-staff",
        permanent: true,
      },
      {
        source: "/haufig-gestellte-fragen",
        destination: "/corporate/faq",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/corporate/faq",
        permanent: true,
      },
      {
        source: "/sss",
        destination: "/corporate/faq",
        permanent: true,
      },
      {
        source: "/часто-задаваемые-вопросы",
        destination: "/corporate/faq",
        permanent: true,
      },
      {
        source: "/vip-unterkunft-und-transport",
        destination: "/corporate/dental-holiday",
        permanent: true,
      },
      {
        source: "/dental-holiday",
        destination: "/corporate/dental-holiday",
        permanent: true,
      },
      {
        source: "/tourisme-dentaire",
        destination: "/corporate/dental-holiday",
        permanent: true,
      },
      {
        source: "/vip-konaklama-ve-ulasim",
        destination: "/corporate/dental-holiday",
        permanent: true,
      },
      {
        source: "/vip-проживание-и-транспорт",
        destination: "/corporate/dental-holiday",
        permanent: true,
      },
      {
        source: "/bloggen",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/блог",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/online-beratung",
        destination: "/free-consultation",
        permanent: true,
      },
      {
        source: "/consultation-en-ligne",
        destination: "/free-consultation",
        permanent: true,
      },
      {
        source: "/online-konsultasyon",
        destination: "/free-consultation",
        permanent: true,
      },
      {
        source: "/онлайн-консультация",
        destination: "/free-consultation",
        permanent: true,
      },
      {
        source: "/kommunikation",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/коммуникация",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/patientenkommentare",
        destination: "/results/patient-testimonials",
        permanent: true,
      },
      {
        source: "/patient-testimonials",
        destination: "/results/patient-testimonials",
        permanent: true,
      },
      {
        source: "/avis-des-patients",
        destination: "/results/patient-testimonials",
        permanent: true,
      },
      {
        source: "/hasta-yorumlari",
        destination: "/results/patient-testimonials",
        permanent: true,
      },
      {
        source: "/комментарии-пациентов",
        destination: "/results/patient-testimonials",
        permanent: true,
      },
      {
        source: "/vorher-und-nachher",
        destination: "/results/before-after",
        permanent: true,
      },
      {
        source: "/before-after",
        destination: "/results/before-after",
        permanent: true,
      },
      {
        source: "/avant-apres",
        destination: "/results/before-after",
        permanent: true,
      },
      {
        source: "/oncesi-sonrasi",
        destination: "/results/before-after",
        permanent: true,
      },
      {
        source: "/до-и-после",
        destination: "/results/before-after",
        permanent: true,
      },
      {
        source: "/blog-detay/zahnbehandlungen-in-der-turkei",
        destination: "/blog/dental-treatments-in-turkey",
        permanent: true,
      },
      {
        source: "/blog-detail/dental-treatments-in-turkey",
        destination: "/blog/dental-treatments-in-turkey",
        permanent: true,
      },
      {
        source: "/detail-du-blog/traitements-dentaires-en-turquie",
        destination: "/blog/dental-treatments-in-turkey",
        permanent: true,
      },
      {
        source: "/blog-detay/turkiye-de-dis-tedavisi",
        destination: "/blog/dental-treatments-in-turkey",
        permanent: true,
      },
      {
        source: "/подробности-блога/лечение-зубов-в-турции",
        destination: "/blog/dental-treatments-in-turkey",
        permanent: true,
      },
      {
        source: "/blog-detay/zahntourismus-in-der-turkei",
        destination: "/blog/dental-tourism-in-turkey",
        permanent: true,
      },
      {
        source: "/blog-detail/dental-tourism-in-turkey",
        destination: "/blog/dental-tourism-in-turkey",
        permanent: true,
      },
      {
        source: "/detail-du-blog/tourisme-dentaire-en-turquie",
        destination: "/blog/dental-tourism-in-turkey",
        permanent: true,
      },
      {
        source: "/blog-detay/turkiye-de-dis-turizmi",
        destination: "/blog/dental-tourism-in-turkey",
        permanent: true,
      },
      {
        source: "/подробности-блога/стоматологический-туризм-в-турции",
        destination: "/blog/dental-tourism-in-turkey",
        permanent: true,
      },
      {
        source: "/blog-detay/implantatpreise-in-istanbul",
        destination: "/blog/implant-prices-in-istanbul",
        permanent: true,
      },
      {
        source: "/blog-detail/implant-prices-in-istanbul",
        destination: "/blog/implant-prices-in-istanbul",
        permanent: true,
      },
      {
        source: "/detail-du-blog/prix-des-implants-a-istanbul",
        destination: "/blog/implant-prices-in-istanbul",
        permanent: true,
      },
      {
        source: "/blog-detay/istanbul-da-implant-fiyatlari",
        destination: "/blog/implant-prices-in-istanbul",
        permanent: true,
      },
      {
        source: "/подробности-блога/цены-на-импланты-в-стамбуле",
        destination: "/blog/implant-prices-in-istanbul",
        permanent: true,
      },
      {
        source: "/blog-detay/zahnbehandlung-in-der-turkei-erhalten",
        destination: "/blog/getting-dental-treatment-turkey",
        permanent: true,
      },
      {
        source: "/blog-detail/getting-dental-treatment-turkey",
        destination: "/blog/getting-dental-treatment-turkey",
        permanent: true,
      },
      {
        source: "/detail-du-blog/obtenir-un-traitement-dentaire-en-turquie",
        destination: "/blog/getting-dental-treatment-turkey",
        permanent: true,
      },
      {
        source: "/blog-detay/turkiye-de-dis-yaptirmak",
        destination: "/blog/getting-dental-treatment-turkey",
        permanent: true,
      },
      {
        source: "/подробности-блога/лечение-зубов-в-турции",
        destination: "/blog/getting-dental-treatment-turkey",
        permanent: true,
      },
      {
        source: "/зубные-мосты-в-турции",
        destination: "/our-treatments/dental-bridges-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-kopruleri",
        destination: "/our-treatments/dental-bridges-in-turkey",
        permanent: true,
      },
      {
        source: "/bridge-dentaire-en-turquie",
        destination: "/our-treatments/dental-bridges-in-turkey",
        permanent: true,
      },
      {
        source: "/dental-bridges-in-turkey",
        destination: "/our-treatments/dental-bridges-in-turkey",
        permanent: true,
      },
      {
        source: "/zahnbrucken-in-der-turkei",
        destination: "/our-treatments/dental-bridges-in-turkey",
        permanent: true,
      },
      {
        source: "/aesthetische-prothesen-in-der-turkei",
        destination: "/our-treatments/aesthetic-prostheses-in-turkey",
        permanent: true,
      },
      {
        source: "/aesthetic-prostheses-in-turkey",
        destination: "/our-treatments/aesthetic-prostheses-in-turkey",
        permanent: true,
      },
      {
        source: "/protheses-esthetiques-en-turquie",
        destination: "/our-treatments/aesthetic-prostheses-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-estetik-protezler",
        destination: "/our-treatments/aesthetic-prostheses-in-turkey",
        permanent: true,
      },
      {
        source: "/эстетические-протезы-в-турции",
        destination: "/our-treatments/aesthetic-prostheses-in-turkey",
        permanent: true,
      },
      {
        source: "/zirkonium-zahnkronen-in-der-turkei",
        destination: "/our-treatments/in-turkey-istanbul-zirconium-dental-crowns",
        permanent: true,
      },
      {
        source: "/zirconia-crowns-turkey",
        destination: "/our-treatments/in-turkey-istanbul-zirconium-dental-crowns",
        permanent: true,
      },
      {
        source: "/en-turquie-istanbul-couronnes-dentaires-en-zircone",
        destination: "/our-treatments/in-turkey-istanbul-zirconium-dental-crowns",
        permanent: true,
      },
      {
        source: "/turkiye-de-zirkonyum-dis-kron-kaplamalari",
        destination: "/our-treatments/in-turkey-istanbul-zirconium-dental-crowns",
        permanent: true,
      },
      {
        source: "/турция-стамбул-циркониевые-зубные-ко",
        destination: "/our-treatments/in-turkey-istanbul-zirconium-dental-crowns",
        permanent: true,
      },
      {
        source: "/wurzelkanalbehandlung-in-der-turkei",
        destination: "/our-treatments/root-canal-processing-turkey-istanbul",
        permanent: true,
      },
      {
        source: "/root-canal-treatment-turkey",
        destination: "/our-treatments/root-canal-processing-turkey-istanbul",
        permanent: true,
      },
      {
        source: "/traitement-de-canal-turquie-istanbul",
        destination: "/our-treatments/root-canal-processing-turkey-istanbul",
        permanent: true,
      },
      {
        source: "/turkiye-de-kok-kanal-tedavisi",
        destination: "/our-treatments/root-canal-processing-turkey-istanbul",
        permanent: true,
      },
      {
        source: "/лечение-корневых-каналов-в-турции",
        destination: "/our-treatments/root-canal-processing-turkey-istanbul",
        permanent: true,
      },
      {
        source: "/zahnfullung-in-der-turkei",
        destination: "/our-treatments/dental-filling-in-turkey",
        permanent: true,
      },
      {
        source: "/remplissage-dentaire-en-turquie",
        destination: "/our-treatments/dental-filling-in-turkey",
        permanent: true,
      },
      {
        source: "/turkiye-de-dis-dolgusu",
        destination: "/our-treatments/dental-filling-in-turkey",
        permanent: true,
      },
      {
        source: "/зубной-пломб-в-турции",
        destination: "/our-treatments/dental-filling-in-turkey",
        permanent: true,
      },
    ];
  },
};
