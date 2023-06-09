"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
// 3rd party middlewares.
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use("/auth", routes_1.authRouter);
// 404 middleware
app.use((req, res, next) => {
    return next(new http_errors_1.default.NotFound(`The requested url ${req.url} was not found.`));
});
// error handler
app.use((err, req, res, next) => {
    if (err instanceof http_errors_1.default.HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.sendStatus(500);
});
app.listen(PORT, () => {
    console.log(`Listening on the url *:${PORT}`);
});
