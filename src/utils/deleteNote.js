import { toast } from "react-hot-toast";


const deleteNote = async (id, getNotes, note, user) => {
    const { category, title, description, image } = note;

    // after deleting the note move to bin
    const binNote = {
        category: category,
        title: title,
        description: description,
        image: image,
        email: user?.email
    }

    const req = await fetch('http://localhost:5000/binNotes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(binNote)
    })
    const response = await req.json();
    // console.log(response);


    // deleting note
    const res = await fetch(`http://localhost:5000/notesAll/${id}`, {
        method: 'DELETE'
    })
    const data = await res.json();
    if (data.acknowledged) {
        toast.success('Note deleted');
    };
    getNotes();
}

export default deleteNote;