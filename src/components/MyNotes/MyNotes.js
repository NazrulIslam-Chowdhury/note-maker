import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from 'react-icons/fc';
import { TfiViewGrid, TfiViewList } from 'react-icons/tfi';
import { BsSearch } from 'react-icons/bs';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import GridView from './GridView';
import TableView from './TableView';
import { sortData, useTitle } from '../../utils';

const MyNotes = () => {
    const { user } = useContext(AuthContext);
    const [viewGrid, setViewGrid] = useState(false);
    const [isAsc, setIsAsc] = useState(true);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    useTitle('My-notes')

    // pagination
    const recordsPerPage = 6;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = notes.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(notes.length / recordsPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);

    // search notes
    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            return note.title.toLowerCase().includes(search?.toLowerCase())
        })
    }, [notes, search]);

    // load data
    const getNotes = useCallback(() => {
        fetch(`https://note-maker-server.vercel.app/notesAll?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setNotes(data))
    }, [user?.email]);

    useEffect(() => {
        getNotes();
        setIsLoading(false);
    }, [getNotes]);


    // sort notes
    const sortOnClick = () => {
        sortData(notes, setNotes, isAsc, setIsAsc)
    };

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

    if (isLoading) return <h1 className='absolute left-[52rem] top-[20rem] z-10'>Loading...</h1>

    return (
        <div className='left-24 sm:left-[7rem] top-2 sm:top-8 absolute sm:w-[89.5vw] w-[72vw] space-y-4 '>
            <div className='flex sm:grid sm:grid-cols-4 gap-2'>
                <div className='flex sm:col-span-3 relative'>
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder='Search by title'
                        className='w-full px-3 py-2 sm:px-5 sm:py-3 bg-slate-100 text-slate-600 dark:text-slate-200 dark:bg-slate-800 transition-colors duration-[0.5s] rounded-md sm:text-xl border-2 border-solid border-slate-400 outline-slate-400 caret-slate-400'
                    />
                    <BsSearch className='absolute sm:w-7 w-5 sm:h-7 h-5 right-2 sm:top-4 top-3 dark:text-white' />
                </div>

                {/* sorting */}
                <div className='flex items-center sm:col-span-1 gap-2 sm:gap-6 justify-center'>
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
                                        (search ? filteredNotes : records).map((note) => <GridView note={note} key={note._id} getNotes={getNotes} />)
                                    }
                                </div>
                                :
                                <table className='w-full shadow-md shadow-black'>
                                    <thead className=' bg-white dark:bg-slate-900 transition-colors duration-[0.5s]'>
                                        <tr>
                                            <th className='text-xl font-medium dark:text-white py-5'>Favorite</th>
                                            <th className='text-xl font-medium dark:text-white py-5'>Description</th>
                                            <th className='text-xl font-medium dark:text-white py-5'>Created/Deleted</th>
                                            <th className='text-xl font-medium dark:text-white py-5'>Title</th>
                                            <th className='text-xl font-medium dark:text-white py-5'>Category</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        (search ? filteredNotes : records).map((note) => <TableView note={note} key={note._id} getNotes={getNotes} />)
                                    }
                                </table>
                        }
                    </div>
                    :
                    <Link to='/add-note'>
                        <p className='text-center text-4xl font-semibold dark:text-slate-200 mt-10'>Add a note</p>
                    </Link>
            }


            {/* pagination */}
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
                                    className={`${currentPage === num ? 'border-b-4 border-white' : ''} bg-white hover:bg-sky-200 dark:hover:bg-sky-400 dark:bg-slate-800 dark:text-white px-3 sm:px-5 py-2 transition-colors duration-[0.5s] shadow-md`}
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
        </div>
    )
}


export default MyNotes;