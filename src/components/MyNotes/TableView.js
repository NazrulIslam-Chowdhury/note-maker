import React, { useContext, useEffect, useRef, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { MdRestore } from 'react-icons/md'
import { deleteNote, restoreNote } from '../../utils';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
// import { Link } from 'react-router-dom';

const TableView = ({ note, getNotes, getBinNotes, restore, categoryNote }) => {
    const { user } = useContext(AuthContext);
    const { description, title, category, _id, favorite, created, deleted } = note;
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
        <tbody className='bg-slate-100 hover:bg-sky-200 dark:bg-slate-800 dark:hover:bg-sky-400 dark:hover:bg-opacity-[0.5] dark:text-white dark:shadow-inner dark:shadow-white rounded-md transition-colors duration-[0.5s] w-[100%] relative'>
            <tr>
                <th className='px-5 py-7'>
                    {
                        favorite?.isFavorite ?
                            <BiSolidHeart className='text-red-500 w-7 h-7' />
                            :
                            <BiHeart className='w-7 h-7' />
                    }
                </th>

                <td className='px-5 py-7'>{description?.length > 25 ? description.slice(0, 26) + '...' : description}
                </td>
                <td className='px-5 py-7'>{created ? created : deleted}
                </td>
                <td className='px-5 py-7'>{title}</td>
                <td className='px-5 py-7'>{category}</td>
                <td ref={ref}>
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
                                    <ul className={`absolute bg-slate-300 text-slate-700 dark:text-slate-400 dark:bg-slate-700 p-5 flex flex-col gap-3 right-12 top-6 rounded-md before:absolute before:bg-slate-300 dark:before:bg-slate-700 before:p-1 before:-right-1 before:top-3 before:rotate-45 z-10`}>
                                        <li className='hover:bg-slate-800 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>
                                            <Link
                                                to={`/note-description/${_id}`}
                                            >
                                                View
                                            </Link>
                                        </li>
                                        <li
                                            onClick={() => deleteOnClick(_id)}
                                            className={`${categoryNote ? 'hidden' : 'flex'} hover:bg-slate-800 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded`}>Delete</li>
                                    </ul>
                                }
                            </div>
                    }
                </td>
            </tr>
        </tbody>
    )
}

export default TableView