import axios from "axios";
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {Role} from "../models/roles";

class RoleService {

    isFetched: boolean = false;

    public async getRoleList(forceFetch: boolean = false): Promise<Role[]> {
        try {
            const response = await axios.get<Role[]>(appConfig.apiAddress + "role", {headers: {Authorization: "Bearer " + authStore.getState().token }});
            return response.data;
        } catch (err) {
            console.error("Error from getRoleList");
            throw err;
        }
    }
}

export const roleService = new RoleService();
