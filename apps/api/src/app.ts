import express, { NextFunction, Request, Response } from "express";

import { logger } from "./logger/logger.middleware";
import { PrismaClient } from "@prisma/client";
import { EnvService } from "./env/env.service";
import { Context } from "./common/context";
import { TickersService } from "./tickers/tickers.service";
import { TickersController } from "./tickers/tickers.controller";
import { TickersRouter } from "./tickers/tickers.router";
import cors from "cors";

import createHttpError from "http-errors";
import axios from "axios";

export async function createApp() {
  const app = express();

  const prisma = new PrismaClient();
  await prisma.$connect();
  console.log("[Database] Connected");

  const envService = new EnvService();

  // Setup context
  const context: Context = {
    db: prisma,
    envService: envService,
    fetcher: axios,
  };

  app.use(
    cors({
      origin: (origin, callback) => {
        callback(null, origin);
      },
    })
  );
  app.use(express());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger());

  // Setup routers
  const apiRouter = express.Router();
  const v1Router = express.Router();

  app.use("/api", apiRouter);
  apiRouter.use("/v1", v1Router);

  // Setup tickers module
  const tickersService = new TickersService(context);
  tickersService.enableRefresh();

  const tickersController = new TickersController(tickersService);
  const tickersRouter = new TickersRouter(tickersController);
  v1Router.use("/tickers", tickersRouter.router());

  // HTTP Error Handler - 404 Not Found
  app.use((req: Request, res: Response, next: NextFunction) => {
    return next(createHttpError(404, "Not found"));
  });

  // HTTP Error Handler - Server errors
  const DEFAULT_SERVER_ERROR = {
    code: 500,
    message: "Internal Server Error",
  };
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    let error: any;

    if (typeof err === "object") {
      error = {
        code: err.code || err.status || DEFAULT_SERVER_ERROR.code,
        message: err.message || DEFAULT_SERVER_ERROR.message,
        errors: err.errors,
      };
    } else {
      error = DEFAULT_SERVER_ERROR;
    }

    return res.status(error.code).json({
      error,
    });
  });

  return app;
}
