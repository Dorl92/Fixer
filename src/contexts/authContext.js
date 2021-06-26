import React, { useContext, useEffect, useState } from "react";
import { auth, database } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loggedUser, setLoggedUser] = useState();

  const [loading, setLoading] = useState(true)

  async function signup(email, password, username, photoUrl) {
    const createUser = await auth.createUserWithEmailAndPassword(email, password)
    await auth.currentUser.updateProfile({
      displayName: username,
      photoURL: photoUrl
    })
    return createUser;
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setLoggedUser(null);
    return auth.signOut();
  }

  function updateUserName(newUserName) {
    return auth.currentUser.updateProfile({
      displayName: newUserName
    })
  }

  function updatePhotoURL(newPhotoURL) {
    return auth.currentUser.updateProfile({
      photoURL: newPhotoURL
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      if (user) {
        database.ref('users/' + user.uid)
          .on('value', (snapshot) => {
            const data = snapshot.val();
            setLoggedUser(data)
          })
      }
      setLoading(false)
    })
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loggedUser,
    signup,
    login,
    logout,
    updatePhotoURL,
    updateUserName
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
};