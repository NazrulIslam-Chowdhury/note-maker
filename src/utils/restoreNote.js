import moment from "moment";
import { toast } from "react-hot-toast";

const restoreNote = async (id, note, user, getBinNotes) => {
    const { category, title, description, image } = note;

    const time = moment().format('MMMM Do YYYY, h:mm:ss a');
    // after deleting the note move to all note
    const restoreNote = {
        category: category,
        title: title,
        description: description,
        image: image,
        email: user?.email,
        created: time
    }

    const req = await fetch('https://note-server-alpha.vercel.app/notes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(restoreNote)
    })
    const response = await req.json();
    // console.log(response);


    // deleting note
    const res = await fetch(`https://note-server-alpha.vercel.app/binNotes/${id}`, {
        method: 'DELETE'
    })
    const data = await res.json();
    if (data.acknowledged) {
        toast.success('Note Restored');
    };
    getBinNotes();
}

export default restoreNote;