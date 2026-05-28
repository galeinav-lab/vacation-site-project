import Joi from "joi";
import {ValidationError} from "./client-error";

export class Vacation {

    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageName?: string;
    public id?: number;

    constructor(vacation: Vacation) {
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.id = vacation.id;
    }

    private static validationSchema = Joi.object({
        destination: Joi.string().required().min(2).max(45),
        description: Joi.string().required().min(10).max(500),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price: Joi.number().required().min(1),
        imageName: Joi.string().optional(),
        id: Joi.number().optional().min(1),
    });

    public validate() {
        const result = Vacation.validationSchema.validate(this);
        if (result.error) {
            throw new ValidationError(result.error.message);
        }
    }
}