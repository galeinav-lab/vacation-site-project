import {User} from "../models/user";
import axios, {AxiosError} from "axios";
import {appConfig} from "../utils/app-config";
import {AuthActionType, authStore} from "../state/auth-state";
import {Credentials} from "../models/credentials";

class AuthService {

    public async register(user: User): Promise<void> {
        try {
            user.roleId = +user.roleId;
            const response = await axios.post(appConfig.apiAddress + "auth/register" , user);
            authStore.dispatch({type: AuthActionType.Login, payload: response.data.token});
        }
        catch (err) {
            alert(err);
            throw err;
        }
    }

    public async login(credentials: Credentials): Promise<void> {
        try {
            const response = await axios.post(appConfig.apiAddress + "auth/login" , credentials);
            authStore.dispatch({type: AuthActionType.Login, payload: response.data.token});
        }
        catch (err) {
            alert(err);
            throw err;
        }
    }
}

export const authService = new AuthService();