'use client';

import { useState, useEffect } from "react";

type newUser = {
    firstname: string,
    lastname: string,
    email: string,
}

type User = newUser & { id: string };

enum LoadingState {
    loading = "LOADING",
    failed = "FAILED",
    success = "SUCCESS",
}

const initialNewUser = {
    firstname: "",
    lastname: "",
    email: "",
}

const apiDomain = "http://146.190.225.155";

export default function Users() {
    const [apiKey, setApiKey] = useState<string>("");
    const [loadingUsersState, setIsLoadingUsers] = useState<LoadingState>(LoadingState.loading);
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<newUser>(initialNewUser);
    const [updatingUser, setUpdatingUser] = useState<User>();

    useEffect(() => {
        let timeoutId: string | number | NodeJS.Timeout | undefined;

        const fetchUserData = async () => {
            const usersDataResponse = await fetch(`${apiDomain}/people`, {
                method: "GET",
                headers: { "api-key": apiKey }
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
            setIsLoadingUsers(LoadingState.success);
        }

        // Delay API fetch by 0.5 seconds
        setIsLoadingUsers(LoadingState.loading);

        if (apiKey) {
            timeoutId = setTimeout(() => {                
                fetchUserData().catch(() => {
                    console.error("Failed to fetch users data");
                    setIsLoadingUsers(LoadingState.failed);
                });
            }, 500);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [apiKey]);

    async function deleteUser(userId: string) {
        fetch(`${apiDomain}/people/${userId}`, {
            method: "DELETE",
            headers: { "api-key": apiKey }
        })
        setUsers((users) => users.filter((user) => user.id !== userId));
    }

    async function createUser() {
        const newUserResponse = await fetch(`${apiDomain}/people`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json", "api-key": apiKey }
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
        fetch(`${apiDomain}/people/${updatingUser.id}`, {
            method: "PUT",
            body: JSON.stringify(updatingUser),
            headers: { "Content-Type": "application/json", "api-key": apiKey }
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

    function apiKeyField() {
        return <div className="flex justify-center items-center">
            <label htmlFor="apikey">
                <input type="text" value={apiKey} className="bg-neutral-700" id="apikey" onChange={(e) => {
                    setApiKey(e.target.value)
                }} />
            </label>
            <button onClick={() => setApiKey("")}>Clear</button>
        </div>
    }
        

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
        {apiKeyField()}
        <hr />
        <div className="flex justify-center items-center">
            {loadingUsersState === LoadingState.loading ? 
            <p>Loading...</p> :
            loadingUsersState === LoadingState.failed ? 
            <p>Failed. Check API key.</p> :
            <table className="border-separate table-fixed w-4/5">
                {usersTableHeaders}
                <tbody>
                    {usersTableContent}{createUserForm()}
                </tbody>
            </table>}
        </div>
    </div>;
}