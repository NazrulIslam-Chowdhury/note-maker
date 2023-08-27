import { toast } from "react-hot-toast";

const addToFavorite = async (liked, setLiked, note) => {
    liked ? setLiked(false) : setLiked(true);
    const isFavorite = {
        isFavorite: liked ? false : true
    }
    const req = await fetch(`http://localhost:5000/notesAll/favorite/${note._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(isFavorite)
    })
    const res = await req.json();
    if (liked !== true && res.acknowledged) {
        toast.success('Marked as favorite')
    } else (
        toast.success('Unmarked as favorite')
    )
}

export default addToFavorite;