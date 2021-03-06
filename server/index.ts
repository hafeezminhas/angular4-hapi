import * as Server from "./server";
import * as Database from "./database";
import * as Config from "./configuration";

console.log(`Running on ${process.env.NODE_ENV || "dev"}`);

process.on("uncaughtException", (error: Error) => {
  console.log("UnCaughtException", error);
});

process.on("unhandledRejection", (reason: any, position: any) => {
  console.log("Unhandled Rejection at:", position, "reason:", reason);
});

const dbConfig = Config.getDatabaseConfig();

const database = Database.init(dbConfig);

const serverConfig = Config.getServerConfig();

Server.init(serverConfig, database).then((server) => {
  server.start(() => {
    console.log("Server running at: ", server.info.uri);
  });
});

