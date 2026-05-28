import {createStore} from "redux";
import {Vacation} from "../models/vacation";

export class VacationState {
    vacationList: Vacation[] = [];
    selectedVacation: Vacation | null = null;
}

export enum VacationActionType {
    GetVacationList = "GetVacationList",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    UpdateSelectedVacation = "UpdateSelectedVacation",
    ClearVacationList = "ClearVacationList",
}

export interface VacationAction {
    type: VacationActionType,
    payload: any,
}

export function vacationReducer(vacationState: VacationState = new VacationState(), action: VacationAction): VacationState {

    const newState: VacationState = {...vacationState};
    newState.vacationList = [...newState.vacationList];

    switch (action.type) {
        case VacationActionType.GetVacationList:
            newState.vacationList = action.payload;
            break;
        case VacationActionType.AddVacation:
            newState.vacationList.push(action.payload);
            break;
        case VacationActionType.UpdateVacation:
            const indexToUpdate = newState.vacationList.findIndex((item) => item.id === action.payload.id);
            newState.vacationList[indexToUpdate] = {
                ...newState.vacationList[indexToUpdate],
                ...action.payload,
            };
            break;
        case VacationActionType.DeleteVacation:
            const indexToDelete = newState.vacationList.findIndex((item) => item.id === action.payload);
            newState.vacationList.splice(indexToDelete, 1);
            break;
        case VacationActionType.UpdateSelectedVacation:
            if (action.payload) {
                const vacation = newState.vacationList.find(vacation => vacation.id === action.payload);
                newState.selectedVacation = vacation!;
            }
            else {
                newState.selectedVacation = null;
            }
            break;
        case VacationActionType.ClearVacationList:
            newState.vacationList = [];
            newState.selectedVacation = null;
            break;
    }
    return newState;
}

export const vacationStore = createStore(vacationReducer);
