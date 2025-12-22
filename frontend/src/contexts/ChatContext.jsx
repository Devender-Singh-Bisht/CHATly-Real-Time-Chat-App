import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

    const [chatUser, setChatUser] = useState(null);

    const handleChatUser = (id, name, profilePic) => {
        setChatUser({id, name, profilePic});
    }

    return (
        <ChatContext.Provider value={{chatUser, handleChatUser}} >
            {children}
        </ChatContext.Provider>
    );
};
