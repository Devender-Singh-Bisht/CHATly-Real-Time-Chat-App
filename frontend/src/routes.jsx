import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chats from "./pages/Chats";
import { ChatContextProvider } from "./contexts/ChatContext";
import AppLayout from "./components/AppLayout";
import FriendShip from "./pages/FriendShip";
import Profile from "./pages/Profile";

const routes = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        element: <AppLayout />,
        children: [
            {
                path: "friends",
                element: <FriendShip />
            },
            {
                path: "chats",
                element: <ChatContextProvider ><Chats /></ChatContextProvider >
            },
            {
                path: "profile/:username",
                element: <Profile />
            },
        ]
    }
]

export default routes;
