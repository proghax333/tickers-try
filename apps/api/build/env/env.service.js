"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
class EnvService {
    constructor() {
        dotenv_1.default.config();
        this.env = process.env;
    }
    get(key) {
        return process.env[key];
    }
    set(key, value) {
        process.env[key] = value;
    }
}
exports.EnvService = EnvService;
