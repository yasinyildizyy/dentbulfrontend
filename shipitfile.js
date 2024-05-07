require("dotenv").config();

module.exports = (shipit) => {
  require("shipit-deploy")(shipit);
  require("shipit-shared")(shipit);

  shipit.initConfig({
    default: {
      branch: "develop",
      repositoryUrl: "git@gitlab.bigoen.net:customer/frontend/dentbul.git", // Will change with the repo.
      keepReleases: 2,
      shared: {
        overwrite: true,
        files: [
          ".env",
          {
            path: ".env",
            overwrite: false,
            chmod: "644",
          },
        ],
      },
    },
    develop: {
      servers: process.env.SERVER_IP,
      key: process.env.SERVER_ID_RSA,
      branch: "develop",
      deployTo: "/var/www/frontend/dentbul/develop", // It will change with the way of the project.
    },
    master: {
      servers: process.env.SERVER_IP,
      key: process.env.SERVER_ID_RSA,
      branch: "master",
      deployTo: "/var/www/frontend/dentbul/production", // It will change with the way of the project.
    },
  });

  const sourceZsh = "source ~/.zshrc";
  let releasePath = `${shipit.config.deployTo}/current`;
  const sourceEnv = `source ${shipit.config.deployTo}/shared/.env`;

  shipit.blTask("yarn", async () => {
    await shipit.remote(`${sourceZsh} && cd ${releasePath} && yarn`);
  });
  shipit.blTask("yarn:build", async () => {
    await shipit.remote(`${sourceZsh} && cd ${releasePath} && sed -i 's/shipit/origin/g' .git/config && yarn build`);
  });
  shipit.blTask("pm2:restart", async () => {
    await shipit.remote(`${sourceZsh} && cd ${releasePath} && pm2 restart ecosystem.config.js`);
  });
  shipit.blTask("pm2:start", async () => {
    await shipit.remote(`${sourceZsh} && cd ${releasePath} && pm2 start ecosystem.config.js`);
  });
  shipit.blTask("pm2:delete", async () => {
    try {
      await shipit.remote(`${sourceZsh} && ${sourceEnv} && cd ${releasePath} &&` + " pm2 delete ${GLOB_NAME}");
    } catch (e) {
      console.log("pm2 not started before.");
    }
  });

  shipit.on("deployed", async () => {
    releasePath = shipit.releasePath;
    await shipit.start("yarn", "yarn:build", "pm2:delete", "pm2:start");
  });
};
