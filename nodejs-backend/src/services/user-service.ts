import {dal} from "../utils/dal";
import {User} from "../models/user";
import {ResourceNotFound} from "../models/client-error";

class UserService {

    public async getSingleUser(id: number) {
        const sql = "select * from user where id = ?";
        const userList = await dal.execute(sql, [id]) as User[];
        const user = userList[0];
        if (!user) {
            throw new ResourceNotFound(id);
        }
        return user;
    }
}

export const userService = new UserService();