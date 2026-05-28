import React, {JSX, ReactNode, useEffect} from 'react';
import './PrivateRoute.css';
import {authStore} from "../../state/auth-state";
import {Navigate} from "react-router-dom";
import {RoleId} from "../../models/enums";

interface PrivateRouteProps {
    child: ReactNode;
    permissionIdList: RoleId[];
    noPermissionRedirect?: string;
}

function PrivateRoute(privateRouteProps: PrivateRouteProps): JSX.Element {

    const user = authStore.getState().user;
    const hasPermission = !!user && privateRouteProps.permissionIdList.includes(Number(user.roleId));

    useEffect(() => {
        if (user && !hasPermission) {
            alert("You don't have permission to access this page.");
        }
    }, [user, hasPermission]);

    if (!user) {
        return (<Navigate to="/login" />);
    }

    if (!hasPermission) {
        return (<Navigate to={privateRouteProps.noPermissionRedirect ?? "/vacation-list"} />);
    }

    return (
        <>{privateRouteProps.child}</>
    );
}

export default PrivateRoute;
