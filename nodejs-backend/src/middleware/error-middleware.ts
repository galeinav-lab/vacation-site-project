import {NextFunction, Request, Response} from "express";
import {StatusCode} from "../models/enums";
import {RouteNotFound} from "../models/client-error";

class ErrorMiddleware {

    public catchAll(err: any, request: Request, response: Response, next: NextFunction) {
        const status = err.status ?? StatusCode.ServerError;
        const message = err.message;
        response.status(status).json({error: message});

    }

    public routeNotFound(request: Request, response: Response, next: NextFunction) {
        next(new RouteNotFound(request.originalUrl));
    }

}

export const errorMiddleware = new ErrorMiddleware();
