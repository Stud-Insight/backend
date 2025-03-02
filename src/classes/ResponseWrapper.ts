import { Response } from 'express';

class ResponseWrapper {

    private res: Response;
    
    constructor(res: Response) {
        this.res = res;
    }

    public sendError(statusCode: number, errorType: string, message?: string): void {
        this.res.status(statusCode).json({ errorType, message });
    };

}

export default ResponseWrapper;