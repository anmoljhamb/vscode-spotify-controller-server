import express from "express";
import { spotifyApi } from "../utils";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../constants";

export const authRouter = express.Router();

authRouter.get("/", (req, res, next) => {
    return res.status(200).json({ message: "Working" });
});

authRouter.get("/grant", async (req, res, next) => {
    try {
        const { code } = req.query;
        const resp = await spotifyApi.authorizationCodeGrant(code as string);
        return res.status(200).json({ ...resp.body });
    } catch (e) {
        next(e);
    }
});

authRouter.post("/refreshToken", async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const _spotifyApi = new SpotifyWebApi({
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            redirectUri: REDIRECT_URI,
            refreshToken,
        });
        const resp = await _spotifyApi.refreshAccessToken();
        return res.status(200).json({ ...resp.body });
    } catch (e) {
        // console.log(e)
        next(e);
    }
});
