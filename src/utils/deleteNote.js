import { toast } from "react-hot-toast";

const deleteNote = async (id, getNotes) => {
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