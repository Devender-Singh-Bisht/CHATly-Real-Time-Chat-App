import { Outlet } from "react-router";
import { SocketProvider } from "../contexts/SocketContext";
import ProtectedRoute from "./ProtectedRoute";

const AppLayout = () => {
    return (
        <ProtectedRoute>
            <SocketProvider>
                <Outlet />
            </SocketProvider>
        </ProtectedRoute>
    );
};

export default AppLayout;
