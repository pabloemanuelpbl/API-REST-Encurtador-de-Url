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
exports.URLController = void 0;
const shortid_1 = __importDefault(require("shortid"));
const Constant_1 = require("../Config/Constant");
const Schema_1 = __importDefault(require("../database/model/Schema"));
const mongoose_1 = __importDefault(require("mongoose"));
//model dados
const model = mongoose_1.default.model("dados", Schema_1.default);
class URLController {
    shorten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originURL } = req.body;
            const hash = shortid_1.default.generate();
            const shortURL = `${Constant_1.config.API_URL}/${hash}`;
            const url = { originURL, hash, shortURL };
            model.findOne({ originURL: originURL }).then((find) => {
                if (originURL === undefined) {
                    console.error("originURL não definido");
                }
                else if (find.length == 0) {
                    console.log("não existe, criar nova");
                    model.create({ originURL, hash, shortURL });
                }
                else {
                    console.log("existe sim boy");
                    url.originURL = find.originURL;
                    url.hash = find.hash;
                    url.shortURL = find.shortURL;
                }
                res.json(url);
            });
        });
    }
    redirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hash } = req.params;
            model.findOne({ hash }).then((find) => {
                res.redirect(find.originURL);
            });
        });
    }
}
exports.URLController = URLController;
