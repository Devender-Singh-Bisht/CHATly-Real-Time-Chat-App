import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chats from "./pages/Chats";
import ProtectedRoute from "./components/ProtectedRoute";

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
        element: <ProtectedRoute><Chats/></ProtectedRoute>
    },
]

export default routes;
