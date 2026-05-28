import express, {Request, Response} from "express";
import {authService} from "../services/auth-service";
import {userService} from "../services/user-service";
import {UserVacation} from "../models/user-vacation";
import {userVacationService} from "../services/user-vacation-service";
import {StatusCode} from "../models/enums";

class UserVacationController {
    router = express.Router();

    constructor() {
        this.router.post("/api/user-vacation", this.addUserToVacation);
        this.router.delete("/api/user-vacation/:userId/:vacationId", this.removeUserFromVacation);
        this.router.get("/api/user-vacation", this.getUserVacationList);
    }

    public async addUserToVacation(request: Request, response: Response) {
        const userVacation = new UserVacation(request.body);
        const user = await userVacationService.addUserToVacation(userVacation);
        response.status(StatusCode.Created).end();
    }
    public async removeUserFromVacation(request: Request, response: Response) {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        await userVacationService.removeUserFromVacation(userId, vacationId);
        response.sendStatus(StatusCode.NoContent);
    }

    public async getUserVacationList(request: Request, response: Response) {
        const userVacationList = await userVacationService.getUserVacationList();
        response.json(userVacationList);
    }
}

export const userVacationController = new UserVacationController();