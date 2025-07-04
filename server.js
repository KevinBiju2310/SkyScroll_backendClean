require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const DatabaseConnection = require("./src/Infrastructure/Database/connection");
const Container = require("./src/Infrastructure/DependencyInjection/container");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.container = new Container();

    this.setUpMiddleware();
    this.setUpRoutes();
  }

  setUpMiddleware() {
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      })
    );

    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  setUpRoutes() {
    const routes = this.container.resolve("routes");
    this.app.use("/", routes.getRouter());
  }

  async start() {
    try {
      await DatabaseConnection.connect();
      this.app.listen(this.port, () => {
        console.log("Server is running");
      });
    } catch (error) {
      console.error("Failed to start server: ", error);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();
