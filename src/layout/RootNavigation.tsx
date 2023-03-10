import { createBrowserRouter } from "react-router-dom";
import SetAvatar from "../components/avatarImage/SetAvatar";
import Chat from "../components/Chat";
import Login from "../components/login/Login";
import Register from "../components/signup/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/setAvatar",
    element: <SetAvatar />,
  },
]);

export default router;
