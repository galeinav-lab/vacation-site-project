import axios from "axios";
import {Vacation} from "../models/vacation";
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {UserVaction} from "../models/user-vaction";

class UserVacationService {

    public async getUserVacationList() {
        try {
            const response = await axios.get<UserVaction[]>(appConfig.apiAddress + "user-vacation", {
                headers: {Authorization: "Bearer " + authStore.getState().token}
            });
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }

}

export const userVacationService = new UserVacationService();