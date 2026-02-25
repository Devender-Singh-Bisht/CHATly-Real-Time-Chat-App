import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {

            const URL = import.meta.env.VITE_API_URL;

            try {
                const res = await fetch(`${URL}/api/auth/verify`, { method: 'GET', credentials: "include" });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error("Unable to access this URL, please Login.")
                }
                setUser(data["data"]);
            } catch {
                setUser(false);
            }
        }

        verifyUser();
    }, []);

    const handleAuthContextOnLogin = (userData) => {
        setUser(userData || user);
    };

    const handleAuthContextOnLogout = () => {
        setUser(false);
    };

    return (
        <AuthContext.Provider value={{ user, handleAuthContextOnLogin, handleAuthContextOnLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
