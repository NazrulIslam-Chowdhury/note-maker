import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts";
import { MyNotes } from "../components";
import { Login, SignUp, AddNote, NoteDescription } from "../pages";

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
            {
                path: '/note-description/:id',
                loader: ({ params }) => {
                    return (
                        fetch(`http://localhost:5000/notesAll/${params.id}`)
                    )
                },
                element: <NoteDescription />
            }
        ]
    }
])

export default router;