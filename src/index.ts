import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import createHttpErrors from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import { inject } from "@vercel/analytics";

inject();
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const PORT = process.env.PORT || 8080;
const app = express();

// 3rd party middlewares.
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Working" });
});

app.use((req, res, next) => {
    return next(
        new createHttpErrors.NotFound(
            `The requested url ${req.url} was not found.`
        )
    );
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof createHttpErrors.HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.sendStatus(500);
});

app.listen(PORT, () => {
    console.log(`Listening on the url *:${PORT}`);
});
