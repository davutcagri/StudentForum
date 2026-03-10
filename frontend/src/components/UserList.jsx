import {useEffect, useState} from "react";
import {getAllUsers} from "../apiCalls.js";

function UserList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getAllUsers();
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    return (
        <div className="grid gap-4">
            {users?.map((user) => (
                <div key={user.username} className="border rounded-xl p-4 shadow">
                    <div className="font-bold">{user.name} {user.surname}</div>
                    <div className="text-gray-500">@{user.username}</div>
                </div>
            ))}
        </div>
    );
}

export default UserList;