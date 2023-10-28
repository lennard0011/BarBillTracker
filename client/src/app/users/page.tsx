'use client';

import { useState, useEffect } from "react";

type User = {
    id: string,
    name: string,
    email: string,
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const usersDataResponse = await fetch("http://localhost:8000/people", {
                method: "GET"
            })
            const usersDataExteral = await usersDataResponse.json()
            const usersDataFormatted = usersDataExteral.map((userData: {_id: string, firstname: string, lastname: string, email: string, }) => {
                const formattedUser: User = {
                    id: userData._id,
                    name: `${userData.firstname} ${userData.lastname}`,
                    email: userData.email
                }
                return formattedUser;
            })

            setUsers(usersDataFormatted);
        }

        fetchUserData().catch(console.error);
    }, []);

    async function deleteUser(userId: string) {
        console.log(userId)
        const removedUserResponse = await fetch(`http://localhost:8000/people/${userId}`, {
            method: "DELETE",            
        })
        return removedUserResponse;
    }

    const usersTableContent = users.map((user, index) => {
        return <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td><button onClick={() => deleteUser(user.id)}>❌</button></td>
            </tr>
    });

    const usersTableHeaders = <tr>
        <th>Name</th>
        <th>E-mail</th>
        <th>Delete</th>
    </tr>

    return <div>
        {users.length > 0 && <table>{usersTableHeaders} {usersTableContent}</table>}
    </div>;
}