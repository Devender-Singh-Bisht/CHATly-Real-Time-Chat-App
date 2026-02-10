import { useState } from "react";
import { Outlet } from "react-router";
import { SocketProvider } from "../contexts/SocketContext";
import ProtectedRoute from "./ProtectedRoute";

const AppLayout = () => {

    const [conversations, setConversations] = useState([]);

    return (
        <ProtectedRoute>
            <SocketProvider>
                <Outlet context={{ conversations, setConversations }} />
            </SocketProvider>
        </ProtectedRoute>
    );
};

export default AppLayout;
