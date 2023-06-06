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
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const constants_1 = require("../constants");
exports.authRouter = express_1.default.Router();
exports.authRouter.get("/", (req, res, next) => {
    return res.status(200).json({ message: "Working" });
});
exports.authRouter.get("/grant", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.query;
        const resp = yield utils_1.spotifyApi.authorizationCodeGrant(code);
        return res.status(200).json(Object.assign({}, resp.body));
    }
    catch (e) {
        next(e);
    }
}));
exports.authRouter.post("/refreshToken", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const _spotifyApi = new spotify_web_api_node_1.default({
            clientId: constants_1.CLIENT_ID,
            clientSecret: constants_1.CLIENT_SECRET,
            redirectUri: constants_1.REDIRECT_URI,
            refreshToken,
        });
        const resp = yield _spotifyApi.refreshAccessToken();
        return res.status(200).json(Object.assign({}, resp.body));
    }
    catch (e) {
        // console.log(e)
        next(e);
    }
}));
