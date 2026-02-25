import {useEffect, useState} from "react";
import {getCurrentUser} from "../apiCalls.js";
import {Navigate, Outlet} from "react-router-dom";

function PublicRoute() {
    const [authenticated, setAuthenticated] = useState();

    useEffect(() => {
        getCurrentUser().then(() => setAuthenticated(true)).catch(() => setAuthenticated(false));
    }, []);

    if (authenticated === true) {
        return <Navigate to="/"/>
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Outlet/>
        </div>
    )
}

export default PublicRoute;