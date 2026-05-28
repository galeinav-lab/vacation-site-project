import {Vacation} from "../models/vacation";
import {dal} from "../utils/dal";
import {ResultSetHeader} from "mysql2";
import {ResourceNotFound} from "../models/client-error";

class VacationService {

    public async getVacationList(userId: number): Promise<Vacation[]> {
        const sql = "SELECT v.*, " +
            "COUNT(uv.userId) AS likesCount, " +
            "MAX(uv.userId = ?) AS isLiked " +
            "FROM vacation v LEFT JOIN userVacation uv ON v.id = uv.vacationId " +
            "GROUP BY v.id";
        const vacations = await dal.execute(sql, [userId]) as any[];
        return vacations
    }

    public async addVacation(vacation: Vacation): Promise<Vacation> {
        vacation.validate();
        const sql = "insert into vacation (destination, description, startDate, endDate, price, imageName) values (?, ?, ?, ?, ?, ?)";
        const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName]) as ResultSetHeader;
        vacation.id = result.insertId;
        return vacation;
    }

    public async updateVacation(id : number, vacation: Vacation): Promise<void> {
        vacation.validate();
        const sql = "update vacation set destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageName = ? where id = ?";
        const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, id]) as ResultSetHeader;
        if (result.affectedRows === 0) {
            throw new ResourceNotFound(id);
        }
    }

    public async deleteVacation(id: number): Promise<void> {
        const sql = "delete from vacation where id = ?";
        const result = await dal.execute(sql, [id]) as ResultSetHeader;
        if (result.affectedRows === 0) {
            throw new ResourceNotFound(id);
        }
    }

    public async getSingleVacation(id: number) {
        const sql = "select * from vacation where id = ?";
        const vacationList = await dal.execute(sql, [id]) as Vacation[];
        const vacation = vacationList[0];
        if (!vacation) {
            throw new ResourceNotFound(id);
        }
        return vacation;
    }
}

export const vacationService = new VacationService();