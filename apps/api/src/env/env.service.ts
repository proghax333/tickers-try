import dotenv from "dotenv";

export class EnvService {
  public env: any;

  constructor() {
    dotenv.config();
    this.env = process.env;
  }

  get(key: string) {
    return process.env[key];
  }

  set(key: string, value: any) {
    process.env[key] = value;
  }
}

export type IEnvService = EnvService;
