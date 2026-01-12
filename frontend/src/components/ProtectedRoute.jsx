import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {

    const { user } = useContext(AuthContext);

    if (user === null) return null;
    return user ? children : <Navigate to="/login" replace/>;
}
 