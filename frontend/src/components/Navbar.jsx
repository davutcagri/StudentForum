import userImg from "../assets/images/blankUser.jpg";
import {useEffect, useState, useRef} from "react";
import {getCurrentUser, logout} from "../apiCalls.js";
import {Outlet} from "react-router-dom";
import Cookies from "js-cookie";

function Navbar() {

    const [user, setUser] = useState({
        username: null,
        name: null,
        lastName: null,
    });

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        try {
            getCurrentUser().then(res => setUser(res.data));
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onClicklLogout = async () => {
        await logout();
        //window.location.reload();
    };

    return (
        <>
            <div className="flex items-center px-10 w-screen h-[50px] bg-gray-100">
                <a className="text-xl uppercase font-[300]" href="/">Student Forum</a>
                <div ref={dropdownRef} className="relative flex items-center gap-2 ml-auto cursor-pointer" onClick={() => setOpen(!open)}>
                    <span>{user.username}</span>
                    <img className="w-10 h-10 rounded-full" src={userImg} alt="userPicture"/>

                    {open && (
                        <div className="absolute right-0 top-12 w-40 bg-white border rounded-lg shadow">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
                            <button onClick={onClicklLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">Logout</button>
                        </div>
                    )}
                </div>
            </div>
            <Outlet/>
        </>
    )
}

export default Navbar;