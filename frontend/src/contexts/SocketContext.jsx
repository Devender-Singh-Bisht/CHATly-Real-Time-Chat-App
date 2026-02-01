import { socket } from '../socket';
import { createContext, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';


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