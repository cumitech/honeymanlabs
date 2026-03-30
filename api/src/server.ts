import "reflect-metadata";
import app from "./app";

import { sequelize } from "./database/database";
import { appConfig, env } from "./config";

const start = async () => {
  try {
    await sequelize.authenticate();

    if (env.DB_SYNC) {
      await sequelize.sync();
    }
  } catch (err) {
    if (env.REQUIRE_DB) throw err;
    console.warn("Database unavailable, starting server anyway.");
  }

  app.listen(appConfig.port, () => {
    console.log(`Server listening on port ${appConfig.port}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
