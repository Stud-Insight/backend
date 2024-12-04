import { CorsOptions } from "cors";
import config from "@config/config";

const allowedOrigins = config.server.allowedOrigins;

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
