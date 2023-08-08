import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts";
import { MyNotes } from "../components";
import AuthForm from "../pages/AuthForm/AuthForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <MyNotes />
            },
            {
                path: '/auth-form',
                element: <AuthForm />
            },
        ]
    }
])

export default router;