import express, {Request, Response} from "express";
import {RoleId, StatusCode} from "../models/enums";
import {User} from "../models/user";
import {authService} from "../services/auth-service";
import {Credentials} from "../models/credentials";

class AuthController {

    router = express.Router();

    constructor() {
        this.router.post("/api/auth/register", this.register);
        this.router.post("/api/auth/login", this.login);
    }

    public async register(request: Request, response: Response) {
        const user: User = new User(request.body);
        user.roleId = RoleId.User;
        const token = await authService.register(user);
        response.status(StatusCode.Created).json({token});
    }

    public async login(request: Request, response: Response) {
        const credentials: Credentials = new Credentials(request.body);
        const token = await authService.login(credentials);
        response.json({token});
    }
}

export const authController = new AuthController();