import Joi from "joi";
import {ValidationError} from "./client-error";

export class UserVacation {

    public userId: number;
    public vacationId: number;

    constructor(userVacation: UserVacation) {
        this.userId = userVacation.userId;
        this.vacationId = userVacation.vacationId;
    }

    private static validationSchema = Joi.object({
        userId: Joi.number().required().positive(),
        vacationId: Joi.number().required().positive(),
    });

    public validate() {
        const result = UserVacation.validationSchema.validate(this);
        if (result.error) {
            throw new ValidationError(result.error.message);
        }
    }
}