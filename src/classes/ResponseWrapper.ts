import { Response } from 'express';

class ResponseWrapper {

    private res: Response;
    
    constructor(res: Response) {
        this.res = res;
    }

    public sendError(statusCode: number, errorType: string, message?: string): void {
        this.res.status(statusCode).json({ errorType, message });
    };

    public sendSuccess(statusCode: number, message: string, data: any): void {
        this.res.status(statusCode).json({
            message,
            data
        });
    };

}

export default ResponseWrapper;