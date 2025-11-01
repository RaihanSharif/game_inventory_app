// mounts the different routes into the app

const gamesRouter = require("./gameRoutes");

// called inside of app.js to mount the routes
const mountRoutes = (app) => {
  app.use("/", gamesRouter);
};

module.exports = mountRoutes;
