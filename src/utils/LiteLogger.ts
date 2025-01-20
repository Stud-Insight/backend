class LiteLogger {
    private static readonly RESET = '\x1b[0m';
    private static readonly BLACK_BOLD = '\x1b[1;30m';
    
    private static readonly WHITE_BG = '\x1b[0;107m';
    private static readonly ORANGE_BG = '\x1b[0;103m';
    private static readonly RED_BG = '\x1b[0;101m';
    private static readonly BLUE_BG = '\x1b[44m';
    private static readonly PURPLE_BG = '\x1b[0;105m';
    private static readonly LIME_BG = '\x1b[0;102m';

    static log(message: string): void {
        process.stdout.write(LiteLogger.WHITE_BG + LiteLogger.BLACK_BOLD + " LOG " + LiteLogger.RESET + " ");
        console.log(message);
    }
    
    static warn(message: string): void {
        process.stdout.write(LiteLogger.ORANGE_BG + LiteLogger.BLACK_BOLD + " WARN " + LiteLogger.RESET + " ");
        console.log(message);
    }

    static error(message: string): void {
        process.stdout.write(LiteLogger.RED_BG + LiteLogger.BLACK_BOLD + " ERROR " + LiteLogger.RESET + " ");
        console.log(message);
    }

    static info(message: string): void {
        process.stdout.write(LiteLogger.BLUE_BG + LiteLogger.BLACK_BOLD + " INFO " + LiteLogger.RESET + " ");
        console.log(message);
    }

    static debug(message: string): void {
        process.stdout.write(LiteLogger.PURPLE_BG + LiteLogger.BLACK_BOLD + " DEBUG " + LiteLogger.RESET + " ");
        console.log(message);
    }

    static pass(message: string): void {
        process.stdout.write(LiteLogger.LIME_BG + LiteLogger.BLACK_BOLD + " PASS " + LiteLogger.RESET + " ");
        console.log(message);
    }

}

export default LiteLogger;