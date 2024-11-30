import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
// Removed 'InternalErrorResponse' import
import jwt, { JwtPayload } from 'jsonwebtoken'; // Added 'JwtPayload' import

import {
  AccessTokenErrorResponse,
  AuthFailureResponse,
} from '../core/ApiResponse';
import { Constants } from '../core/Constant';

dotenv.config();
export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token: string = authHeader.split(' ')[1];
    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
      // Updated callback function signature
      if (err) return new AccessTokenErrorResponse('Invalid Token').send(res);
      const user = decoded as JwtPayload; // Added type assertion
      (req as any).user = user;
      Number(user?.role) == Constants.USER_ROLE.ADMIN
        ? next()
        : new AuthFailureResponse('Unauthorized').send(res);
    });
  } else {
    return new AuthFailureResponse('Token not found').send(res);
  }
};
