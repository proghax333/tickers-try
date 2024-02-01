import { NextFunction, Request, Response } from "express";

export type Controller<T> = {
  (request: Request, response: Response, next: NextFunction): T;
};
