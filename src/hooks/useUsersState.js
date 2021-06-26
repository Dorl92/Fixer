import { useState } from 'react';
import { database } from "../firebase";

export default initialUsers => {
    const [users, setUsers] = useState(initialUsers);
    return {
        users,
        setUsers,
        addNewUser: async (newUser) => { database.ref('users/' + newUser.userId).set(newUser) },
        editUser: async (updatedUser, userId) => {database.ref('users/' + userId).update(updatedUser)},
        addNewSeller: async (newSeller, userId) => { database.ref('users/' + userId).update(newSeller) }
    }
}
