import express from "express";
import { TickersController } from "./tickers.controller";

export class TickersRouter {
  constructor(private tickersController: TickersController) {}

  router() {
    const router = express.Router();

    router.get("/", this.tickersController.getTickers);

    return router;
  }
}
