import express from "express";
import { spotifyApi } from "../utils";

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
