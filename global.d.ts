import LiteLogger from "./src/utils/LiteLogger";

declare global {
    var llog: typeof LiteLogger;
}

export {};