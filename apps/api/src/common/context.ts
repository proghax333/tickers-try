import { PrismaClient } from "@prisma/client";
import { IEnvService } from "../env/env.service";
import { AxiosInstance } from "axios";

export type Context = {
  db: PrismaClient;
  envService: IEnvService;
  fetcher: AxiosInstance;
};
