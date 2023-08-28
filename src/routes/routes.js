import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts";
import { MyNotes } from "../components";
import {
    Login,
    SignUp,
    AddNote,
    NoteDescription,
    NoteBin,
    Notebooks,
    CategoryNotebooks,
    Favorite
} from "../pages";
import PrivateRoute from "./PrivateRoute";

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
                element: <PrivateRoute><AddNote /></PrivateRoute>
            },
            {
                path: '/note-description/:id',
                loader: ({ params }) => {
                    return (
                        fetch(`http://localhost:5000/notesAll/${params.id}`)
                    )
                },
                element: <NoteDescription />
            },
            {
                path: '/favorite-notes',
                element: <Favorite />
            },
            {
                path: '/note-bin',
                element: <NoteBin />
            },
            {
                path: '/notebooks',
                element: <Notebooks />
            },
            {
                path: '/category-notebooks/:name/:email',
                loader: async ({ params }) => {
                    return fetch(`http://localhost:5000/categoryNotebooks/${params.name}/${params.email}`)
                },
                element: <CategoryNotebooks />
            },
        ]
    }
])

export default router;