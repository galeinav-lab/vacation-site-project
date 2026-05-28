import {RoleId} from "./enums";
import Joi from "joi";
import {ValidationError} from "./client-error";

export class User {

    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId?: RoleId;
    public id?: number

    constructor(user: User) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
        this.id = user.id;
    }

    private static validationSchema = Joi.object({
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4).max(256),
        roleId: Joi.optional(),
        id: Joi.number().optional().positive()
    });

    public validate() {
        const result = User.validationSchema.validate(this);
        if (result.error) {
            throw new ValidationError(result.error.message);
        }
    }

}