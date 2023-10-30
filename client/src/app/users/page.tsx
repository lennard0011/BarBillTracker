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
        fetch(`http://localhost:8000/people/${userId}`, {
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
        const createdUserBody = await newUserResponse.json()
        const createdUser: User = {
            ...createdUserBody,
            id: createdUserBody._id
        }
        setUsers((users) => [...users, createdUser]);
        setNewUser(initialNewUser);
    }

    function createUserOnEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            createUser();
        }
    }

    async function updateUser() {
        if (updatingUser === undefined) {
            return;
        }
        fetch(`http://localhost:8000/people/${updatingUser.id}`, {
            method: "PUT",
            body: JSON.stringify(updatingUser),
            headers: { "Content-Type": "application/json" }
        })
        setUsers((users) => users.map((user) => {
            if (user.id !== updatingUser.id) {
                return user
            }
            return updatingUser;
        }));
        setUpdatingUser(undefined);
    }

    function updateUserOnEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            updateUser();
        }
    }

    const usersTableContent = users.map((user, index) => {
        if (user.id === updatingUser?.id) {
            return updateUserForm(user);
        }
        return <tr key={index}>
            <td className="text-center">{user.firstname}</td>
            <td className="text-center">{user.lastname}</td>
            <td className="text-center">{user.email}</td>
            <td className="text-center"><button onClick={() => deleteUser(user.id)}>❌</button></td>
            <td className="text-center"><button onClick={() => setUpdatingUser(user)}>✏️</button></td>
        </tr>
    });

    const usersTableHeaders = <thead>
        <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>E-mail</th>
            <th>Delete</th>
            <th>Update</th>
        </tr>
    </thead>

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
        return <tr key={user?.id}>
            <td className="text-center">
                <label htmlFor="firstname">
                    <input type="text" value={updatingUser?.firstname} className="bg-neutral-700" id="firstame" onChange={(e) => {
                        setUpdatingUser({ ...user, firstname: e.target.value })
                    }} onKeyDown={updateUserOnEnter} />
                </label>
            </td>
            <td className="text-center">
                <label htmlFor="lastname">
                    <input type="text" value={updatingUser?.lastname} className="bg-neutral-700" id="lastname" onChange={(e) => {
                        setUpdatingUser({ ...user, lastname: e.target.value })
                    }} onKeyDown={updateUserOnEnter} />
                </label>
            </td>
            <td className="text-center">
                <label htmlFor="email">
                    <input type="text" value={updatingUser?.email} className="bg-neutral-700" id="email" onChange={(e) => {
                        setUpdatingUser({ ...user, email: e.target.value })
                    }} onKeyDown={updateUserOnEnter} />
                </label>
            </td>
            <td className="text-center"><button onClick={() => deleteUser(user.id)}>❌</button></td>
            <td className="text-center"><button onClick={() => updateUser()}>💾</button></td>
        </tr>
    }

    return <div>
        <div className="flex justify-center items-center">
            <h1>People</h1>
        </div>
        <hr />
        <div className="flex justify-center items-center">
            {users.length > 0 && <table className="border-separate table-fixed w-4/5">{usersTableHeaders}<tbody>{usersTableContent}{createUserForm()}</tbody></table>}
        </div>
    </div>;
}