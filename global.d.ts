import LiteLogger from "./src/utils/LoggerDeLextremeDeLaMort";

declare global {
    var llog: typeof LiteLogger;
}

export {};