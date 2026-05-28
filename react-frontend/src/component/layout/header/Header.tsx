import React, {JSX, useEffect, useState} from 'react';
import './Header.css';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthActionType, authStore} from "../../../state/auth-state";
import {User} from "../../../models/user";
import {RoleId} from "../../../models/enums";

function Header(): JSX.Element {
    const navigate = useNavigate();

    const [isLogin, setLogin] = useState<boolean>(authStore.getState().user !== null);

    const [user, setUser] = useState<User | null>(authStore.getState().user);

    useEffect(() => {

        authStore.subscribe(() => {
            setLogin(authStore.getState().user !== null);
            setUser(authStore.getState().user);
        });

    }, []);

    function logout(): void {
        authStore.dispatch({type: AuthActionType.Logout, payload: null});
        navigate("/login");
    }

    return (
        <div className="Header">
            <h1>Vacation Site</h1>
            {!isLogin ?
                <div className="links">
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </div> : <div className="links">
                    <span>Hello {user ? user!.firstName + " " + user!.lastName : ''}</span>
                    <NavLink to="/vacation-list">Vacation List</NavLink>
                    {Number(user?.roleId) === RoleId.Admin && <NavLink to="/vacation-form">Add Vacation</NavLink>}
                    {Number(user?.roleId) === RoleId.Admin && <NavLink to="/vacation-report">Vacation Report</NavLink>}
                    <button onClick={() => logout()}>Logout</button>
                </div>
            }
        </div>
    );
}

export default Header;
