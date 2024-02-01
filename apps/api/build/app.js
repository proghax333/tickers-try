"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const logger_middleware_1 = require("./logger/logger.middleware");
const client_1 = require("@prisma/client");
const env_service_1 = require("./env/env.service");
const tickers_service_1 = require("./tickers/tickers.service");
const tickers_controller_1 = require("./tickers/tickers.controller");
const tickers_router_1 = require("./tickers/tickers.router");
function createApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const prisma = new client_1.PrismaClient();
        yield prisma.$connect();
        console.log("[Database] Connected");
        const envService = new env_service_1.EnvService();
        // Setup context
        const context = {
            db: prisma,
            envService: envService,
        };
        app.use((0, express_1.default)());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, logger_middleware_1.logger)());
        const apiRouter = express_1.default.Router();
        const v1Router = express_1.default.Router();
        app.use("/api", apiRouter);
        apiRouter.use("/v1", v1Router);
        // Setup tickers router
        const tickersService = new tickers_service_1.TickersService(context);
        const tickersController = new tickers_controller_1.TickersController(tickersService);
        const tickersRouter = new tickers_router_1.TickersRouter(tickersController);
        v1Router.use("/tickers", tickersRouter.router());
        return app;
    });
}
exports.createApp = createApp;
