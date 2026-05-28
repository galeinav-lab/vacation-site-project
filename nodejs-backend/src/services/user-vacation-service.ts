import {UserVacation} from "../models/user-vacation";
import {vacationService} from "./vacation-service";
import {userService} from "./user-service";
import {dal} from "../utils/dal";
import {ResultSetHeader} from "mysql2";

class UserVacationService {

    public async addUserToVacation(userVacation: UserVacation): Promise<void> {
        userVacation.validate();
        await vacationService.getSingleVacation(userVacation.vacationId);
        await userService.getSingleUser(userVacation.userId);
        const sql = "insert into userVacation(vacationId, userId) values (?,?)";
        await dal.execute(sql, [userVacation.vacationId, userVacation.userId]);
    }

    public async removeUserFromVacation(userId: number, vacationId: number): Promise<void> {
        const sql = "DELETE FROM userVacation WHERE userId = ? AND vacationId = ?";
        await dal.execute(sql, [userId, vacationId]);
    }

    public async getUserVacationList(): Promise<UserVacation[]> {
        const sql = "SELECT * FROM userVacation";
        const userVacationList = await dal.execute(sql) as UserVacation[];
        return userVacationList
    }
}

export const userVacationService = new UserVacationService();