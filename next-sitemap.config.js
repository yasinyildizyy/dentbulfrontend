module.exports = {
  siteUrl: "https://dentbul.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://dentbul.com/sitemap.xml"],
  },
};
