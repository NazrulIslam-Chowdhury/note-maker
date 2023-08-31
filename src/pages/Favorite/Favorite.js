import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { sortData, useTitle } from '../../utils';
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from 'react-icons/fc';
import { TfiViewGrid, TfiViewList } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { BiSolidHeart } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';

const Favorite = () => {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAsc, setIsAsc] = useState(true);
    const [viewGrid, setViewGrid] = useState(false);

    useTitle('Favorite');

    // get all the notes that has favorite true
    const getFavoriteNotes = useCallback(async () => {
        const res = await fetch(`https://note-server-alpha.vercel.app/favorite-notes?email=${user?.email}`);
        const data = await res.json();
        setNotes(data);
    }, [user?.email]);

    useEffect(() => {
        getFavoriteNotes();
        setIsLoading(false);
    }, [getFavoriteNotes])


    // pagination
    const recordsPerPage = 6;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = notes.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(notes.length / recordsPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);

    //pagination previous button 
    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    // pagination next button
    const nextPage = () => {
        if (currentPage !== nPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    // sort notes
    const sortOnClick = () => {
        sortData(notes, setNotes, isAsc, setIsAsc)
    };


    if (isLoading) return <h1 className='absolute left-[52rem] top-[20rem] z-10'>Loading...</h1>

    return (
        <div className='left-24 sm:left-[7rem] top-2 sm:top-8 absolute sm:w-[89.5vw] w-[72vw] space-y-4'>
            <div className='flex justify-between items-center sm:mx-10 mx-5'>
                <div className='flex items-center sm:col-span-1 gap-2 sm:gap-6 justify-center'>
                    {/* sorting */}
                    <div
                        className='cursor-pointer flex gap-2'
                        onClick={sortOnClick}
                    >
                        {isAsc ?
                            <FcAlphabeticalSortingAz className='w-8 h-6' title='Ascending' />
                            :
                            <FcAlphabeticalSortingZa className='w-8 h-6' title='Descending' />
                        }
                    </div>

                    {/* view icon*/}
                    <div
                        onClick={() => viewGrid ? setViewGrid(!viewGrid) : setViewGrid(!viewGrid)}
                        className='cursor-pointer'
                    >
                        {
                            viewGrid ?
                                <TfiViewGrid className='w-6 h-6 dark:text-slate-200' />
                                :
                                <TfiViewList className='w-6 h-6 dark:text-slate-200' />
                        }
                    </div>
                </div>

            </div>

            {/* view data*/}
            {
                notes.length > 0 ?
                    <div className='sm:overflow-visible overflow-x-auto'>
                        {
                            !viewGrid ?
                                <div className='flex flex-col sm:flex-row flex-wrap gap-5'>
                                    {
                                        records.map((note, idx) => <div key={note._id} className='w-auto sm:w-[30rem] h-[20rem] bg-slate-100 hover:bg-sky-200 dark:bg-slate-800 dark:hover:bg-sky-400 dark:hover:bg-opacity-[0.5] dark:text-white dark:shadow-inner dark:shadow-white shadow-md shadow-black p-5 rounded-md space-y-3 transition-colors duration-[0.5s]  after:absolute after:bg-red-400 after:h-1 after:w-full after:rounded-lg after:bottom-0 after:left-0 bar relative'>
                                            <div className='flex justify-between items-center relative group'>
                                                <h1 className='text-2xl font-semibold'><span className='text-slate-500 text-sm'>Category :</span> {note.category}</h1>
                                                <Link
                                                    className='bg-black shadow-inner shadow-white rounded-full p-3'
                                                    to={`/note-description/${note._id}`}
                                                >
                                                    <AiOutlineEye className='h-6 w-6 text-white' />
                                                </Link>

                                            </div>
                                            <h2 className='text-xl font-medium'><span className='text-slate-500 text-sm'>Title :</span> {note.title}</h2>
                                            <p><span className='text-slate-500 text-sm'>Description :</span> {note.description?.length > 100 ? note.description.slice(0, 100) + '...' : note.description}</p>
                                            <div className='absolute bottom-3 right-3'>
                                                <BiSolidHeart className='text-red-500 w-7 h-7' />
                                            </div>
                                        </div>)
                                    }
                                </div>
                                :
                                <table className='w-full shadow-md shadow-black'>
                                    <thead className=' bg-white dark:bg-slate-900 transition-colors duration-[0.5s]'>
                                        <tr>
                                            <th></th>
                                            <th className='text-xl font-medium dark:text-white py-5'>Description</th>
                                            <th className='text-xl font-medium dark:text-white py-5'>Title</th>
                                            <th className='text-xl font-medium dark:text-white py-5'>Category</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        records.map((note) => <tbody key={note._id} className='bg-slate-100 hover:bg-sky-200 dark:bg-slate-800 dark:hover:bg-sky-400 dark:hover:bg-opacity-[0.5] dark:text-white dark:shadow-inner dark:shadow-white rounded-md transition-colors duration-[0.5s] w-[100%] relative'>
                                            <tr>
                                                <th className='px-5 py-7'>
                                                    <BiSolidHeart className='text-red-500 w-7 h-7' />
                                                </th>
                                                <td className='px-5 py-7'>{note.description?.length > 50 ? note.description.slice(0, 51) + '...' : note.description}
                                                </td>
                                                <td className='px-5 py-7'>{note.title}</td>
                                                <td className='px-5 py-7'>{note.category}</td>
                                                <td>
                                                    <Link
                                                        to={`/note-description/${note._id}`}
                                                    >
                                                        <AiOutlineEye className='h-6 w-6' />
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>)
                                    }
                                </table>
                        }
                    </div>
                    :
                    <p className='text-center text-4xl font-semibold dark:text-slate-200 mt-10'>There are No favorite notes</p>
            }


            {/* pagination */}
            {
                records.length > 0 &&
                <nav>
                    <ul className='flex gap-2 sm:gap-5 items-center justify-center mt-5 sm:mt-10'>
                        <li>
                            <Link
                                className='bg-white hover:bg-sky-200 dark:hover:bg-sky-400 dark:bg-slate-800 dark:text-white px-3 sm:px-5 py-2 transition-colors duration-[0.5s] shadow-md'
                                onClick={prevPage}>Prev</Link>
                        </li>
                        {
                            numbers.map((num, idx) => (
                                <li key={idx}>
                                    <Link
                                        className={`${currentPage === num ? 'border-b-4 border-slate-600' : ''} bg-white hover:bg-sky-200 dark:hover:bg-sky-400 dark:bg-slate-800 dark:text-white px-3 sm:px-5 py-2 transition-colors duration-[0.5s] shadow-md`}
                                        onClick={() => setCurrentPage(num)}
                                    >
                                        {num}
                                    </Link>
                                </li>
                            ))
                        }
                        <li>
                            <Link
                                onClick={nextPage} className='bg-white hover:bg-sky-200 dark:hover:bg-sky-400 dark:bg-slate-800 dark:text-white px-3 sm:px-5 py-2 transition-colors duration-[0.5s] shadow-md'>Next</Link>
                        </li>
                    </ul>
                </nav>
            }
        </div>
    )
}

export default Favorite