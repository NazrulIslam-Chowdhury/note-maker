import React, { useContext, useEffect, useRef, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci';
import { deleteNote, restoreNote } from '../../utils';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { MdRestore } from 'react-icons/md';

const GridView = ({ note, getNotes, getBinNotes, restore }) => {
    const { user } = useContext(AuthContext);
    const { category, title, description, _id } = note;
    const [open, setOpen] = useState(false);
    const ref = useRef();

    const deleteOnClick = (id) => {
        restore ? restoreNote(id, note, user, getBinNotes) : deleteNote(id, getNotes, note, user);
    }

    // close the menu clicking outside
    useEffect(() => {
        let closeOnTap = (e) => {
            if (!ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', closeOnTap);

        return () => {
            document.removeEventListener('mousedown', closeOnTap)
        }
    }, [])

    return (
        <div className='w-auto sm:w-[30rem] h-[20rem] bg-slate-100 hover:bg-sky-200 dark:bg-slate-800 dark:hover:bg-sky-400 dark:hover:bg-opacity-[0.5] dark:text-white dark:shadow-inner dark:shadow-white shadow-md shadow-black p-5 rounded-md space-y-3 transition-colors duration-[0.5s]  after:absolute after:bg-red-400 after:h-1 after:w-full after:rounded-lg after:bottom-0 after:left-0 bar relative'>
            <div ref={ref} className='flex justify-between items-center relative group'>
                <h1 className='text-2xl font-semibold'><span className='text-slate-500 text-sm'>Category :</span> {category}</h1>
                {
                    restore ?
                        <>
                            <MdRestore className='h-6 w-6 cursor-pointer' onClick={() => deleteOnClick(_id)} />
                        </>
                        :
                        <div >
                            <CiMenuKebab className='h-6 w-6 cursor-pointer' onClick={() => setOpen(!open)} />
                            {
                                open &&
                                <ul className={`absolute bg-slate-300 text-slate-700 dark:text-slate-400 dark:bg-slate-700 p-5 flex flex-col gap-3 right-6 top-1 rounded-md before:absolute before:bg-slate-300 dark:before:bg-slate-700 before:p-1 before:-right-1 before:top-3 before:rotate-45 z-10`}>
                                    <li className='hover:bg-slate-800 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>
                                        <Link
                                            to={`/note-description/${_id}`}
                                        >
                                            View
                                        </Link>
                                    </li>
                                    <li
                                        onClick={() => deleteOnClick(_id)}
                                        className='hover:bg-slate-800 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>Delete</li>
                                </ul>
                            }
                        </div>
                }
            </div>
            <h2 className='text-xl font-medium'><span className='text-slate-500 text-sm'>Title :</span> {title}</h2>
            <p><span className='text-slate-500 text-sm'>Description :</span> {description.length > 100 ? description.split(0, 101) : description}</p>
        </div>
    )
}

export default GridView