import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            const toastId = toast.loading("Loading...");

            try {
                const res = await fetch("http://localhost:3000/api/auth/verify", { method: 'GET', credentials: "include" });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error("Unable to access this URL, please Login.")
                }
                setUser(data["data"]);
            } catch {
                setUser(false);
            } finally {
                toast.dismiss(toastId);
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
