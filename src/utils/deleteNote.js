import moment from "moment";
import { toast } from "react-hot-toast";


const deleteNote = async (id, getNotes, note, user) => {
    const { category, title, description, image } = note;

    const proceed = window.confirm('Are you want to delete this note?')
    if (proceed) {
        const time = moment().format('MMMM Do YYYY, h:mm:ss a')
        // after deleting the note move to bin
        const binNote = {
            category: category,
            title: title,
            description: description,
            image: image,
            email: user?.email,
            deleted: time
        }

        const req = await fetch('https://note-maker-server.vercel.app/binNotes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(binNote)
        })
        const response = await req.json();
        // console.log(response);


        // deleting note
        const res = await fetch(`https://note-maker-server.vercel.app/notesAll/${id}`, {
            method: 'DELETE'
        })
        const data = await res.json();
        if (data.acknowledged) {
            toast.success('Note deleted');
        };
    }
    getNotes();
}

export default deleteNote;