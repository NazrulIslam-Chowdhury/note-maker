import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts";
import { MyNotes } from "../components";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <MyNotes />
            }
        ]
    }
])

export default router;