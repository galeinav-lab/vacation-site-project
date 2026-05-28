import express, {Request, Response} from "express";
import {vacationService} from "../services/vacation-service";
import {Vacation} from "../models/vacation";
import {StatusCode} from "../models/enums";
import {uploadImageService} from "../services/upload-image-service";
import {tokenMiddleware} from "../middleware/token-middleware";

class VacationController {

    router = express.Router();

    constructor() {
        this.router.get("/api/vacation", tokenMiddleware.validateToken, this.getVacationList);
        this.router.post("/api/vacation", tokenMiddleware.validateAdmin, uploadImageService.upload.single("image"), this.addVacation);
        this.router.put("/api/vacation/:id", tokenMiddleware.validateAdmin, uploadImageService.upload.single("image"), this.updateVacation);
        this.router.delete("/api/vacation/:id", tokenMiddleware.validateAdmin, this.deleteVacation);
        this.router.get("/api/vacation/:id", tokenMiddleware.validateToken, this.getSingleVacation);
    }

    public async getVacationList(request: Request, response: Response) {
        const userId = (request as any).user?.id ?? 0;
        const vacationList = await vacationService.getVacationList(userId);
        response.json(vacationList);
    }

    public async addVacation(request: Request, response: Response) {
        const vacation: Vacation = new Vacation(JSON.parse(request.body.vacation));
        vacation.imageName = request.file?.filename;
        const vacationFromDB = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(vacationFromDB);
    }

    public async updateVacation(request: Request, response: Response) {
        const id = +request.params.id;
        const vacation: Vacation = new Vacation(JSON.parse(request.body.vacation));
        if (request.file?.filename) {
            vacation.imageName = request.file.filename;
        } else {
            const existing = await vacationService.getSingleVacation(id);
            vacation.imageName = existing.imageName;
        }
        await vacationService.updateVacation(id, vacation);
        response.json(vacation);
    }

    public async deleteVacation(request: Request, response: Response) {
        const id = +request.params.id;
        await vacationService.deleteVacation(id);
        response.sendStatus(StatusCode.NoContent);
    }

    public async getSingleVacation(request: Request, response: Response) {
        const id = +request.params.id;
        const vacation = await vacationService.getSingleVacation(id);
        response.json(vacation);
    }

}

export const vacationController = new VacationController();