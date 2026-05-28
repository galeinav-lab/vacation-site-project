import React, {JSX, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './VacationForm.css'
import {useForm} from "react-hook-form";
import {Vacation} from "../../models/vacation";
import {vacationService} from "../../services/vacation-service";
import {AxiosError} from "axios";
import {appConfig} from "../../utils/app-config";

function VacationForm(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    let vacationToUpdate = useRef<Vacation | undefined>(undefined)

    const {register, watch, formState, handleSubmit, reset, setValue } = useForm<Vacation>();

    useEffect(() => {

        async function getSingleVacation() {
            try {
                setLoading(true);
                vacationToUpdate.current = await vacationService.getSingleVacation(+params.id!);
                setValue("description", vacationToUpdate.current.description);
                setValue("destination", vacationToUpdate.current.destination);
                setValue("startDate", vacationToUpdate.current.startDate);
                setValue("endDate", vacationToUpdate.current.endDate);
                setValue("price", vacationToUpdate.current.price);
                setValue("image", vacationToUpdate.current.image);
                setLoading(false);
            }
            catch (err) {
                alert(err);
            }
        }

        if (params.id) {
            getSingleVacation();
        }

    }, []);

    async function addVacation(vacation: Vacation) {
        try {
            if (params.id) {
                vacation.id = vacationToUpdate!.current!.id;
                await vacationService.updateVacation(vacation)
            }
            else {
                await vacationService.addVacation(vacation);
            }
            reset();
            navigate("/vacation-list");
        }
        catch (error) {
            console.log(error)
            const myErr = error as AxiosError;
            alert((myErr.response?.data as any)?.error);
        }
    }

    function cancel() {
        reset();
        navigate("/vacation-list");
    }

    return (
        <form onSubmit={handleSubmit(addVacation)}>
            {loading ? <p>Loading...</p> :
            <div className="form">
                <h2>{params.id ? "Update Vacation" : "Add New Vacation"}</h2>
                <input type="text" placeholder="* Destination"{...register("destination",
                    {
                        required: {value: true, message: "Destination is required"},
                        minLength: {value: 2, message: "Must be at least 2 characters"},
                        maxLength: {value: 45, message: "Max 45 characters"}
                    }
                )}/>
                {formState.errors.destination && <p>{formState.errors.destination?.message}</p>}
                <textarea placeholder="* Description"{...register("description",
                    {
                        required: {value: true, message: "Description is required"},
                        minLength: {value: 10, message: "Must be at least 10 characters"},
                        maxLength: {value: 500, message: "Max 500 characters"}
                    }
                )}/>
                {formState.errors.description && <p>{formState.errors.description?.message}</p>}
                <input type="datetime-local" placeholder="* Start Date"{...register("startDate",
                    {
                        required: {value: true, message: "Date is required"},
                        validate: (value) => {
                            if (params.id) return true; // past dates allowed when editing
                            const start = new Date(value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            if (start < today) return "Start date cannot be in the past";
                            return true;
                        },
                        deps: ["endDate"],
                    }
                )}/>
                {formState.errors.startDate && <p>{formState.errors.startDate?.message}</p>}
                <input type="datetime-local" placeholder="* End Date"{...register("endDate",
                    {
                        required: {value: true, message: "Date is required"},
                        validate: (value) => {
                            const startValue = watch("startDate");
                            if (!startValue) return true;
                            const end = new Date(value);
                            const start = new Date(startValue);
                            if (end < start) return "End date must be after start date";
                            return true;
                        },
                    }
                )}/>
                {formState.errors.endDate && <p>{formState.errors.endDate?.message}</p>}
                <input type="number" placeholder="* Price"{...register("price",
                    {
                        required: {value: true, message: "Price is required"},
                        min: {value: 0, message: "Must Be Positive Number"},
                        max: {value: 10000, message: "Max 10,000"}
                    }
                )}/>
                {formState.errors.price && <p>{formState.errors.price?.message}</p>}
                {params.id && vacationToUpdate.current?.imageName && (
                    <div className="current-image">
                        <span className="current-image-label">Current image:</span>
                        <img
                            src={appConfig.uploadsAddress + vacationToUpdate.current.imageName}
                            alt="current"
                        />
                    </div>
                )}
                <input type="file" placeholder={params.id ? "Cover Image (optional)" : "* Cover Image"} {...register("image",
                    {
                        required: params.id ? false : {value: true, message: "Image is required"},
                    }
                )}/>
                {formState.errors.image && <p>{formState.errors.image?.message as string}</p>}
                <button>{params.id? "Update Vacation" : "Add Vacation"}</button>
                <button onClick={cancel}>Cancel</button>
            </div>}
        </form>
    );
}

export default VacationForm;