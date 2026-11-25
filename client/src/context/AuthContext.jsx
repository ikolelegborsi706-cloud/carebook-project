import { createContext, useState, useEffect, useContext } from "react";
import { apiFetch } from "../api.js";


const AuthContext = createContext(null);


export function AuthProvider({children}) {
    // store the currently signed in user, null means no user is signed in.
    const [user, setUser] = useState(null);

    // loading stays true while a save token is being verified with the server.
    const [loading, setLoading] = useState(Boolean(localStorage.getItem('token')));

    // if the token exists, it asks the server for the matching user account.
    // invalid or expired tokens are removed; loading stops when validation ends.
    useEffect(() => {
        if(!localStorage.getItem('token')) return;
        apiFetch('/auth/me')
        .then((data) => setUser(data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    }, []);

// sends credentials or registration values to an authentication endpoint.
//On sucesss, saves the returned token and updates the current user.
async function authenticate(path, values) {
    const data = await apiFetch(path, { method: "POST", body: values});
    localStorage.setItem('token', data.token );
    setUser(data.user);
    return data.user;
}

// wrap authenticate() with the logic endpoint.
const login = (values) => authenticate('/auth/login', values);

// wraps authenticate() with registration endpoint.
const register = (values) => authenticate('/auth/register', values);

// Removes the save token and clears the current user without calling the server.
const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
};

return (
    <AuthContext.Provider value={{user, loading, login, register, logout}}>
        {children}
    </AuthContext.Provider>
    
);
}
export const useAuth = () => useContext(AuthContext);