"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UrlSchema = new mongoose_1.default.Schema({
    originURL: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true
    }
});
exports.default = UrlSchema;
