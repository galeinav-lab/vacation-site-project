import express, {Request, Response} from "express";
import {authService} from "../services/auth-service";
import {userService} from "../services/user-service";

class UserController {
    router = express.Router();

    constructor() {
        this.router.get("/api/user/:id", this.getSingleUser);
    }

    public async getSingleUser(request: Request, response: Response) {
        const id = +request.params.id;
        const user = await userService.getSingleUser(id);
        response.json(user);
    }
}

export const userController = new UserController();