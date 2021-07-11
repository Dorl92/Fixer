import React, { createContext, useContext } from "react";
import useUsersState from "../hooks/useUsersState";

const UsersContext = createContext();

export function useUsersContext() {
    return useContext(UsersContext);
}

export function UsersProvider(props) {
    const { users, setUsers, addNewUser, editUser, addNewSeller } = useUsersState([])
    const value = {
        users,
        setUsers,
        addNewUser,
        editUser,
        addNewSeller
    }
    return (
        <UsersContext.Provider value={value}>
            {props.children}
        </UsersContext.Provider>
    )
}
