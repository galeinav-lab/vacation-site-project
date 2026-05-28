import {dal} from "../utils/dal";
import {Role} from "../models/roles";

class RoleService {

    public async getRoleList(): Promise<Role[]> {
        const sql = "select * from role";
        const roleList = await dal.execute(sql) as Role[];
        return roleList;
    }
}

export const roleService = new RoleService();