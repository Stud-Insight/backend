import LiteLogger from "@/utils/LiteLogger";

declare global {
    var llog: typeof LiteLogger = LiteLogger;
}

export {};