import {User} from "../models/user";
import {dal} from "../utils/dal";
import {ResourceNotFound, UnauthorizedError, ValidationError} from "../models/client-error";
import {ResultSetHeader} from "mysql2";
import {secureService} from "./secure-service";
import {Credentials} from "../models/credentials";
import bcrypt from "bcrypt";

class AuthService {

    public async register(user: User): Promise<string> {
        user.validate();
        const isEmailExist = await this.validateEmail(user.email);
        if (isEmailExist) throw new ValidationError("Email already taken");
        user.password = await secureService.hash(user.password);
        const sql = "insert into user (firstName, lastName, email, password, roleId) VALUES (?, ?, ?, ? ,?)";
        const result = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]) as ResultSetHeader;
        user.id = result.insertId
        return secureService.generateToken(user);
    }

    public async validateEmail(email: string): Promise<boolean> {
        const sql = "select * from user where email = ?";
        const userList = await dal.execute(sql, [email]) as User[];
        const user = userList[0];
        return user !== undefined;
    }

    public async login(credentials: Credentials): Promise<string> {
        credentials.validate();
        const sql = "select * from user where email = ?";
        const userList = await dal.execute(sql, [credentials.email]) as User[];
        const user = userList[0];
        if (!user) throw new UnauthorizedError("Incorrect email or password");
        const isCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrect) throw new UnauthorizedError("Incorrect email or password");
        return secureService.generateToken(user);
    }
}

export const authService = new AuthService();