import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';
// import { logger } from '../utils/index';
import { Request, Response, NextFunction } from 'express';
import Exception from '../exception';
import logger from './utils/logger';

config();



interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export function authN(req: AuthenticatedRequest, res: Response): AuthenticatedRequest {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) throw new Exception('unauthorized', 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) throw new Exception('invalid auth token', 401);

        req.user = decoded;
        return req;
    }
    logger.error(`you are not logged in ${res}`, 401);
    throw new Exception('you are not logged in', 401);
}

export function isLoggedIn(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    authN(req, res);
    next();
}
