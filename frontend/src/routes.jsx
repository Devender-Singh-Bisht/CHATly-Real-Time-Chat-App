import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chats from "./pages/Chats";

const routes = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "login",
        element: <Login/>,
    },
    {
        path: "register",
        element: <Register/>,
    },
    {
        path: "chats",
        element: <Chats/>,
    },
]

export default routes;
