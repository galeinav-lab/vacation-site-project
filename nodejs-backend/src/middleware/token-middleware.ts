import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {secureService} from "../services/secure-service";
import {UnauthorizedError} from "../models/client-error";
import {User} from "../models/user";

class TokenMiddleware {

    public validateToken(request: Request, response: Response, next: NextFunction) {
        const token = request.headers.authorization?.substring(7);
        if (secureService.validateToken(token!)) {
            const container = jwt.decode(token!) as { user: User };
            (request as any).user = container.user;
            next();
            return;
        }
        next(new UnauthorizedError("Unauthorized"));
    }

    public validateAdmin(request: Request, response: Response, next: NextFunction) {
        const token = request.headers.authorization?.substring(7);
        if (secureService.validateAdmin(token!)) {
            next();
            return;
        }
        next(new UnauthorizedError("Unauthorized"));
    }

}

export const tokenMiddleware = new TokenMiddleware();
