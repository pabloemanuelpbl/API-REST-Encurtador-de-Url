"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports
const express_1 = __importDefault(require("express"));
const UrlControler_1 = require("./routes/UrlControler");
const MongoConection_1 = require("./database/MongoConection");
//config
const api = (0, express_1.default)();
api.use(express_1.default.json());
api.use(express_1.default.urlencoded({ extended: true }));
const database = new MongoConection_1.MongooseConection();
database.connect();
//rotas
const urlController = new UrlControler_1.URLController();
api.post('/shorten', urlController.shorten);
api.get("/:hash", urlController.redirect);
api.listen(5000, () => console.log("Express listening port: 5000"));
