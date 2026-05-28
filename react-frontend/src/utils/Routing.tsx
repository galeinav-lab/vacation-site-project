import {JSX} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Register from "../component/auth/register/Register";
import Login from "../component/auth/login/Login";
import VacationForm from "../component/vacation-form/VacationForm";
import VacationList from "../component/vacation-list/VacationList";
import VacationReport from "../component/vacation-report/VacationReport";
import PrivateRoute from "../component/private-route/PrivateRoute";
import {RoleId} from "../models/enums";


function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/vacation-list" element={<PrivateRoute permissionIdList={[RoleId.User, RoleId.Admin]} child={<VacationList />}/>}/>
            <Route path="/vacation-form" element={<PrivateRoute permissionIdList={[RoleId.Admin]} child={<VacationForm />}/>}/>
            <Route path="/vacation-form/:id" element={<PrivateRoute permissionIdList={[RoleId.Admin]} child={<VacationForm />}/>}/>
            <Route path="/vacation-report" element={<PrivateRoute permissionIdList={[RoleId.Admin]} child={<VacationReport />}/>}/>
            <Route path="/" element={<Navigate to="/vacation-list" replace />}/>
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
    );
}

export default Routing;
