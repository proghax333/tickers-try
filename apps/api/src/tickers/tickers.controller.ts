import { ITickersService, TickersService } from "./tickers.service";

import { Request, Response, NextFunction } from "express";
import { controller } from "../lib/controller";

export class TickersController {
  constructor(private tickersService: ITickersService) {}

  getTickers = [
    controller(async (req: Request, res: Response, next: NextFunction) => {
      return this.tickersService.getTickers();
    }),
  ];
}
