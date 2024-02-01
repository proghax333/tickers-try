"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickersRouter = void 0;
const express_1 = __importDefault(require("express"));
class TickersRouter {
    constructor(tickersController) {
        this.tickersController = tickersController;
    }
    router() {
        const router = express_1.default.Router();
        router.get("/", this.tickersController.getTickers);
        return router;
    }
}
exports.TickersRouter = TickersRouter;
