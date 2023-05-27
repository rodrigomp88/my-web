import { useEffect, useReducer } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { AuthContext, authReducer } from "./";
import { types } from "../../types/types";

const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        dispatch({ type: types.logout });
        return true;
      }
      dispatch({ type: types.login, payload: currentUser });
      return true;
    });

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: types.login, payload: JSON.parse(storedUser) });
    }

    return () => unsubuscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await signInWithEmailAndPassword(auth, email, password);
      const { user } = data;
      dispatch({ type: types.login, payload: user });

      localStorage.setItem("user", JSON.stringify(user));

      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        login,
        logout,
        // loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
