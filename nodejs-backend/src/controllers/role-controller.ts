import express, {Request, Response} from "express";
import {tokenMiddleware} from "../middleware/token-middleware";
import {roleService} from "../services/role-service";

class RoleController {

    router = express.Router();

    constructor() {
        this.router.get("/api/role/", tokenMiddleware.validateAdmin, this.getRoleList);
    }

    public async getRoleList(request: Request, response: Response) {
        const roleList = await roleService.getRoleList();
        response.json(roleList);
    }

}

export const roleController = new RoleController();