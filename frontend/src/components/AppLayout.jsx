import { useState } from "react";
import { Outlet } from "react-router";
import { SocketProvider } from "../contexts/SocketContext";
import ProtectedRoute from "./ProtectedRoute";
import { ChatContextProvider } from "../contexts/ChatContext";

const AppLayout = () => {

    const [conversations, setConversations] = useState([]);
    const [visible, setVisible] = useState(false);

    return (
        <ProtectedRoute>
            <SocketProvider>
                <ChatContextProvider>
                    <Outlet context={{ conversations, setConversations, visible, setVisible }} />
                </ChatContextProvider>
            </SocketProvider>
        </ProtectedRoute>
    );
};

export default AppLayout;
