import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import { AuthFailureResponse } from "../core/ApiResponse";

dotenv.config();
const isValidKey = (req: Request, res: Response, next: NextFunction): any => {
    if (req.headers['x-api-key'] !== process.env.API_KEY) return new AuthFailureResponse('Invalid API Key').send(res);
    next();
};

export default isValidKey;