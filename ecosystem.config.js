require("dotenv").config();

module.exports = {
  compress: true,
  apps: [
    {
      name: process.env.GLOB_NAME,
      script: "server.js",
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};
