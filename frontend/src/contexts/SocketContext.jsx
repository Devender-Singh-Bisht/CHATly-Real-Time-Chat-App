import { io } from "socket.io-client";
import { createContext, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';


const SOCKET_URL = import.meta.env.REACT_APP_SOCKET_URL || "http://localhost:3000";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
});

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            socket.connect();
        }

        return () => {
            socket.disconnect();
        };
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};