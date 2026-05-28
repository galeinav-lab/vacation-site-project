import axios from "axios";
import {Vacation} from "../models/vacation";
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {UserVaction} from "../models/user-vaction";
import {VacationActionType, vacationStore} from "../state/vacation-state";

class VacationService {

    isFetched: boolean = false;

    public clearCache(): void {
        this.isFetched = false;
        vacationStore.dispatch({type: VacationActionType.ClearVacationList, payload: null});
    }

    public async getVacationList(forceFetch: boolean = false): Promise<Vacation[]> {
        if (!this.isFetched || forceFetch) {
            try {
                const response = await axios.get<Vacation[]>(appConfig.apiAddress + "vacation", {
                    headers: {Authorization: "Bearer " + authStore.getState().token}
                });
                this.isFetched = true;
                vacationStore.dispatch({type: VacationActionType.GetVacationList, payload: response.data});
            } catch (err) {
                throw err;
            }
        }
        return vacationStore.getState().vacationList
    }

    public async getSingleVacation(id: number): Promise<Vacation> {
        try {
            const response = await axios.get<Vacation>(appConfig.apiAddress + "vacation/" + id, {
                headers: {Authorization: "Bearer " + authStore.getState().token}
            });
            return response.data;
        }
        catch (err) {
            throw err;
        }
    }

    public async addVacation(vacation: Vacation): Promise<Vacation> {
        const formData = new FormData();
        formData.append("vacation", JSON.stringify(vacation));
        formData.append("image", vacation.image![0]);
        try {
            const response = await axios.post<Vacation>(appConfig.apiAddress + "vacation", formData, {headers: { Authorization: "Bearer " + authStore.getState().token }});
            vacationStore.dispatch({type: VacationActionType.AddVacation, payload: response.data});
            return response.data;
        }
        catch (err) {
            throw err;
        }
    }

    public async updateVacation(vacation: Vacation): Promise<void> {
        const formData = new FormData();
        formData.append("vacation", JSON.stringify(vacation));
        if (vacation.image && vacation.image[0]) {
            formData.append("image", vacation.image[0]);
        }
        try {
            const response = await axios.put<Vacation>(appConfig.apiAddress + "vacation/" + vacation.id, formData, {headers: { Authorization: "Bearer " + authStore.getState().token }});
            vacationStore.dispatch({type: VacationActionType.UpdateVacation, payload: response.data});
        }
        catch (err) {
            throw err;
        }
    }

    public async deleteVacation(id: number): Promise<void> {
        try {
            await axios.delete(appConfig.apiAddress + "vacation/" + id, {headers: { Authorization: "Bearer " + authStore.getState().token }});
            vacationStore.dispatch({type: VacationActionType.DeleteVacation, payload: id});
        }
        catch (err) {
            throw err;
        }
    }

    public async follow(userId: number, vacationId: number): Promise<void> {
        const userVacation = new UserVaction(userId, vacationId);
        await axios.post(appConfig.apiAddress + "user-vacation", userVacation, {headers: { Authorization: "Bearer " + authStore.getState().token }});
    }

    public async unfollow(userId: number, vacationId: number): Promise<void> {
        await axios.delete(appConfig.apiAddress + "user-vacation/" + userId + "/" + vacationId, {headers: { Authorization: "Bearer " + authStore.getState().token }});
    }

}

export const vacationService = new VacationService();