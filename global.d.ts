import LiteLogger from "./src/utils/LiteLogger";

declare global {
    var llog: typeof LiteLogger;
}

import { Request } from "express";
import AccessTokenPayload from "./src/interfaces/tokens/AccessTokenPayload";

declare module "express-serve-static-core" {
    interface Request {
        authDecoded?: AccessTokenPayload;
    }
}

export {};