import config from "config";
import { CorsOptions } from "cors";

const allowedOrigins = config.get<string[]>("server.allowedOrigins");

export const corsOptions: CorsOptions = {
    origin: ((requestOrigin, callback) => {
        const origin = requestOrigin || "";
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }),
    optionsSuccessStatus: 200,
};
