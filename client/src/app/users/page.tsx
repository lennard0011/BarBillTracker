'use client';

import { useState, useEffect, KeyboardEventHandler } from "react";

type newUser = {
    firstname: string,
    lastname: string,
    email: string,
}

type User = newUser & { id: string };

const initialNewUser = {
    firstname: "",
    lastname: "",
    email: "",
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<newUser>(initialNewUser);
    const [updatingUser, setUpdatingUser] = useState<User>();

    useEffect(() => {
        const fetchUserData = async () => {
            const usersDataResponse = await fetch("http://localhost:8000/people", {
                method: "GET"
            })
            const usersDataExteral = await usersDataResponse.json()
            const usersDataFormatted = usersDataExteral.map((userData: { _id: string, firstname: string, lastname: string, email: string, }) => {
                const formattedUser: User = {
                    id: userData._id,
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    email: userData.email
                };
                return formattedUser;
            })

            setUsers(usersDataFormatted);
        }
        fetchUserData().catch(console.error);
    }, []);

    async function deleteUser(userId: string) {
        await fetch(`http://localhost:8000/people/${userId}`, {
            method: "DELETE",
        })
        setUsers((users) => users.filter((user) => user.id !== userId));
    }

    async function createUser() {
        const newUserResponse = await fetch(`http://localhost:8000/people`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" }
        })
        const createdUser: User = await newUserResponse.json()
        setNewUser(initialNewUser);
        setUsers((users) => [...users, createdUser]);
    }

    function createUserOnEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            createUser();
        }
    }

    async function updateUser() {

    }

    const usersTableContent = users.map((user, index) => {
        if (user.id === updatingUser?.id) {
            return updateUserForm(updatingUser);
        }
        return <tr key={index}>
            <td className="text-center">{user.firstname}</td>
            <td className="text-center">{user.lastname}</td>
            <td className="text-center">{user.email}</td>
            <td className="text-center"><button onClick={() => deleteUser(user.id)}>❌</button></td>
            <td className="text-center"><button onClick={() => setUpdatingUser(user)}>✏️</button></td>
        </tr>
    });

    const usersTableHeaders = <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>E-mail</th>
        <th>Delete</th>
        <th>Update</th>
    </tr>

    function createUserForm() {
        return <tr>
            <td className="text-center">
                <label htmlFor="firstname">
                    <input type="text" value={newUser.firstname} className="bg-neutral-700" id="firstame" onChange={(e) => {
                        setNewUser((user) => {
                            return { ...user, firstname: e.target.value }
                        })
                    }} onKeyDown={createUserOnEnter} />
                </label>
            </td>
            <td className="text-center">
                <label htmlFor="lastname">
                    <input type="text" value={newUser.lastname} className="bg-neutral-700" id="lastname" onChange={(e) => {
                        setNewUser((user) => {
                            return { ...user, lastname: e.target.value }
                        })
                    }} onKeyDown={createUserOnEnter} />
                </label>
            </td>
            <td className="text-center">
                <label htmlFor="email">
                    <input type="text" value={newUser.email} className="bg-neutral-700" id="email" onChange={(e) => {
                        setNewUser((user) => {
                            return { ...user, email: e.target.value }
                        })
                    }} onKeyDown={createUserOnEnter} />
                </label>
            </td>
            <td className="text-center">
                <button onClick={() => createUser()}>Create</button>
            </td>
        </tr>
    }

    function updateUserForm(user: User) {
        return <tr>
            <td className="text-center">
                <label htmlFor="firstname">
                    <input type="text" value={user.firstname} className="bg-neutral-700" id="firstame" onChange={(e) => {
                        setUpdatingUser({ ...user, firstname: e.target.value })
                    }} onKeyDown={updateUser} />
                </label>
            </td>
            <td className="text-center">
                <label htmlFor="lastname">
                    <input type="text" value={user.lastname} className="bg-neutral-700" id="lastname" onChange={(e) => {
                        setUpdatingUser({ ...user, lastname: e.target.value })
                    }} onKeyDown={updateUser} />
                </label>
            </td>
            <td className="text-center">
                <label htmlFor="email">
                    <input type="text" value={user.email} className="bg-neutral-700" id="email" onChange={(e) => {
                        setUpdatingUser({ ...user, email: e.target.value })
                    }} onKeyDown={updateUser} />
                </label>
            </td>
            <td className="text-center"><button onClick={() => deleteUser(user.id)}>❌</button></td>
            <td className="text-center"><button onClick={() => updateUser()}>💾</button></td>
        </tr>
    }

    return <div>
        {users.length > 0 && <table className="border-separate"><tbody>{usersTableHeaders}{usersTableContent}{createUserForm()}</tbody></table>}
    </div>;
}