import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts";
import { MyNotes } from "../components";
import { Login, SignUp, AddNote } from "../pages";

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
                path: '/sign-up',
                element: <SignUp />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/add-note',
                element: <AddNote />
            },
        ]
    }
])

export default router;