'use client';

import { useState, useEffect } from "react";

type User = {
    name: string,
    email: string,
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // TODO: Fix CORS localhost error
        const fetchUserData = async () => {
            const usersDataResponse = await fetch("http://localhost:8000/people", {
                method: "GET"
            })
            const usersDataExteral = await usersDataResponse.json()
            const usersDataFormatted = usersDataExteral.map((userData: { first_name: any; email: any; }) => {
                const formattedUser: User = {
                    name: userData.first_name,
                    email: userData.email
                }
                return formattedUser;
            })

            setUsers(usersDataFormatted);
        }

        fetchUserData().catch(console.error);
    }, []);

    // for every user return an entry in a table

    const usersTableContent = users.map((user, index) => {
        return <tr key={index}><td>{user.name}</td><td>{user.email}</td></tr>
    });

    const usersTableHeaders = <tr>
        <th>Name</th>
        <th>E-mail</th>
    </tr>

    return <div>
        {users.length > 0 && <table>{usersTableHeaders} {usersTableContent}</table>}
    </div>;
}