import {useEffect, useState} from "react";
import {getCurrentUser} from "../apiCalls.js";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const [authenticated, setAuthenticated] = useState();

    useEffect(() => {
        getCurrentUser().then(() => setAuthenticated(true)).catch(() => setAuthenticated(false));
    }, []);

    if (authenticated === false) {
        return <Navigate to="/register" />
    }

    return <Outlet />
}