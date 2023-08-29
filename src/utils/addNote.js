import { toast } from "react-hot-toast";


const addNote = async (data, setIsLoading, user, image_hosting_url) => {
    setIsLoading(true);
    const { category, title, description } = data;

    const formData = new FormData();
    formData.append('image', data?.image[0]);

    const fetchImage = await fetch(image_hosting_url, {
        method: 'POST',
        body: formData,
    })
    const res = await fetchImage.json();
    const image = res.data?.display_url;

    try {
        const cate = await fetch('https://note-maker-server.vercel.app/note-categories', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ category: category, user_email: user?.email })
        })

        const response = await cate.json();
        // console.log(response);
    } catch (err) {
        setIsLoading(false);
        alert(err);
    };


    const singleNote = {
        category: category,
        title: title,
        description: description,
        image: image ? image : null,
        email: user?.email
    }

    try {
        const result = await fetch('https://note-maker-server.vercel.app/notes', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(singleNote)
        })
        const res = await result.json();
        if (res.acknowledged) {
            toast.success('Note added successfully')
        }
    } catch (err) {
        setIsLoading(false);
        alert(err);
    };
    setIsLoading(false);
}

export default addNote;