import userImg from "../assets/images/blankUser.jpg";
import {useEffect, useState} from "react";
import {getCurrentUser} from "../apiCalls.js";

function Navbar() {

    const [user, setUser] = useState({
        username: null,
        name: null,
        lastName: null,
    });

    useEffect(() => {
        try {
            getCurrentUser().then(res => setUser(res.data));
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div className="flex items-center px-10 w-screen h-[50px] bg-gray-100">
            <a className="text-xl uppercase font-[300]" href="/" >Student Forum</a>
            <div className="flex items-center gap-2 ml-auto cursor-pointer">
                <span>{user.username}</span>
                <img className="w-10 h-10 rounded-full" src={userImg} alt="userPicture"/>
            </div>
        </div>
    )
}

export default Navbar;