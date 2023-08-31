import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { AiFillFolderOpen, AiOutlineEye } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTitle } from '../../utils';
import { toast } from 'react-hot-toast';

const Notebooks = () => {
    const { user } = useContext(AuthContext);
    const [notebooks, setNotebooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useTitle('Notebooks')

    // get all notebooks
    const myNotebooks = useCallback(
        async () => {
            const req = await fetch(`https://note-server-alpha.vercel.app/categories?email=${user?.email}`);
            const res = await req.json();
            setNotebooks(res);
        }, [user?.email]
    )

    useEffect(() => {
        myNotebooks()
        setIsLoading(false)
    }, [myNotebooks])

    // filter out the duplicate categories
    const uniqueCategories = [...new Set(notebooks.map((notebook) => notebook.category))];

    // delete category and its notes
    const deleteOnClick = async (category) => {
        const proceed = window.confirm('Are you sure you want to delete this category? If do this all notes of this category will be deleted')
        if (proceed) {
            const res = await fetch(`https://note-server-alpha.vercel.app/categories/${category}?email=${user?.email}`, {
                method: "DELETE"
            });
            const data = await res.json();
            const req = await fetch(`https://note-server-alpha.vercel.app/categoryNotes/${category}?email=${user?.email}`, {
                method: "DELETE"
            });
            const response = await req.json();
            if (response.acknowledged) {
                toast.success('Category deleted');
            }

        }
        myNotebooks();
    }

    if (isLoading) return <h1 className='absolute left-[52rem] top-[20rem] z-10'>Loading...</h1>

    return (
        <div
            className='left-24 sm:left-[7rem] top-16 sm:top-8 sm:w-[89.5vw] w-[72vw] space-y-4 relative'>
            <div
                className='flex items-center justify-start sm:translate-x-64 translate-x-0 flex-wrap sm:gap-28 gap-2' >
                {
                    uniqueCategories.map((uniqueCategory, idx) => (
                        <div
                            key={idx}
                        >

                            <div className='flex flex-col bg-slate-300 gap-20 p-5 rounded-md relative'>
                                <AiFillFolderOpen className='w-20 h-20 dark:text-gray-400' />
                                <div className='text-slate-700 dark:text-slate-400 bottom-0 rounded-md'>
                                    <Link
                                        to={`/category-notebooks/${uniqueCategory}/${user?.email}`}
                                        className='hover:bg-slate-800 hover:text-white px-2 py-1 transition-colors duration-[0.5s] cursor-pointer rounded absolute left-2 bottom-2'
                                    >
                                        <AiOutlineEye className='w-6 h-6' />
                                    </Link>
                                    <div
                                        onClick={() => deleteOnClick(uniqueCategory)}
                                        className='hover:bg-slate-800 hover:text-white px-2 py-1 transition-colors duration-[0.5s] cursor-pointer rounded absolute right-2 bottom-2'>
                                        <MdOutlineDeleteForever className='w-6 h-6' />
                                    </div>
                                </div>
                            </div>
                            <p className='dark:text-white p-3 lowercase' >{uniqueCategory}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Notebooks