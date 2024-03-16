import { Request, Response, NextFunction } from "express";

const isValidRequest = (targetRequest: any) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            if (validateRequest(request.body, targetRequest)) {
                next();
            } else {
                response.status(400).json({ error: 'Invalid request format' });
            }
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    };
};

const validateRequest = (requestData: any, expectedType: any): boolean => {
    for (const key in expectedType) {
        if (typeof requestData[key] !== typeof expectedType[key]) {
            return false;
        }
    }
    return true;
};

export default isValidRequest;
