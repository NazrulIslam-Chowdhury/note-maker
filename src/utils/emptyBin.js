import { toast } from "react-hot-toast";

const emptyBin = async (user, getBinNotes, notes) => {
    if (notes.length > 0) {
        const proceed = window.confirm('Are you want to delete all notes from the bin?')
        if (proceed) {
            const req = await fetch(`https://note-maker-server.vercel.app/binNotes?${user?.email}`, {
                method: 'DELETE'
            });
            const res = await req.json();
            if (res.acknowledged) {
                toast.success('All notes deleted')
            };
        }
    }
    getBinNotes()
}

export default emptyBin;