import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import createHttpErrors from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import { inject } from "@vercel/analytics";
import { spotifyApi } from "./utils";
import { authRouter } from "./routes";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const PORT = process.env.PORT || 8080;
const app = express();

// 3rd party middlewares.
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/auth", authRouter);

// 404 middleware
app.use((req, res, next) => {
    return next(
        new createHttpErrors.NotFound(
            `The requested url ${req.url} was not found.`
        )
    );
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof createHttpErrors.HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.sendStatus(500);
});

app.listen(PORT, () => {
    console.log(`Listening on the url *:${PORT}`);
});
