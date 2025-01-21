class LiteLogger {
    private static readonly RESET = '\x1b[0m';
    private static readonly BLACK_BOLD = '\x1b[1;30m';
    
    private static readonly WHITE_BG = '\x1b[0;107m';
    private static readonly ORANGE_BG = '\x1b[0;103m';
    private static readonly RED_BG = '\x1b[0;101m';
    private static readonly BLUE_BG = '\x1b[44m';
    private static readonly PURPLE_BG = '\x1b[45m';
    private static readonly LIME_BG = '\x1b[0;102m';

    static log(message?: any, ...optionalParams: any[]): void {
        process.stdout.write(LiteLogger.WHITE_BG + LiteLogger.BLACK_BOLD + " LOG " + LiteLogger.RESET + " ");
        if (optionalParams.length == 0) console.log(message);
        else console.log(message, optionalParams);
    }
    
    static warn(message?: any, ...optionalParams: any[]): void {
        process.stdout.write(LiteLogger.ORANGE_BG + LiteLogger.BLACK_BOLD + " WARN " + LiteLogger.RESET + " ");
        if (optionalParams.length == 0) console.log(message);
        else console.warn(message, optionalParams);
    }

    static error(message?: any, ...optionalParams: any[]): void {
        process.stdout.write(LiteLogger.RED_BG + LiteLogger.BLACK_BOLD + " ERROR " + LiteLogger.RESET + " ");
        if (optionalParams.length == 0) console.log(message);
        else console.error(message, optionalParams);
    }

    static info(message?: any, ...optionalParams: any[]): void {
        process.stdout.write(LiteLogger.BLUE_BG + LiteLogger.BLACK_BOLD + " INFO " + LiteLogger.RESET + " ");
        if (optionalParams.length == 0) console.log(message);
        else console.info(message, optionalParams);
    }

    static debug(message?: any, ...optionalParams: any[]): void {
        process.stdout.write(LiteLogger.PURPLE_BG + LiteLogger.BLACK_BOLD + " DEBUG " + LiteLogger.RESET + " ");
        if (optionalParams.length == 0) console.log(message);
        else console.debug(message, optionalParams);
    }

    static ok(message?: any, ...optionalParams: any[]): void {
        process.stdout.write(LiteLogger.LIME_BG + LiteLogger.BLACK_BOLD + " OK " + LiteLogger.RESET + " ");
        if (optionalParams.length == 0) console.log(message);
        else console.log(message, optionalParams);
    }

}

export default LiteLogger;