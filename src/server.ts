/* eslint-disable no-console */
import mongoose from "mongoose";
import { Server } from "http";

import app from "./app";
import config from "./config";

let server: Server;

process.on("uncaughtException", (error) => {
  console.log("👹🐱‍🏍 uncaughtException is detected", error);
  process.exit(1);
});

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Connected to MongoDB");
    server = app.listen(config.port, () => {
      console.log(`Application app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }

  process.on("unhandledRejection", (error) => {
    console.log(
      "👹🐱‍🏍 unhandledRejection is detected, we are closing our server"
    );
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();
