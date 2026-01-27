import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {

    const { user } = useContext(AuthContext);

    if (user === null) {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spinner/>
            </div>
        )
    };
    return user ? children : <Navigate to="/login" replace />;
}
