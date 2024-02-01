import { NextFunction, Request, Response } from "express";
import { Controller } from "../common/types";

export function controller<T>(handler: Controller<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };
}
