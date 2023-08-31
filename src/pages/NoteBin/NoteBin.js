import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { emptyBin, sortData, useTitle } from '../../utils';
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from 'react-icons/fc';
import { TfiViewGrid, TfiViewList } from 'react-icons/tfi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import GridView from '../../components/MyNotes/GridView';
import TableView from '../../components/MyNotes/TableView';
import { Link } from 'react-router-dom';

const NoteBin = () => {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAsc, setIsAsc] = useState(true);
    const [viewGrid, setViewGrid] = useState(false);
    const [restore, setRestore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useTitle('Bin')

    // load bin data
    const getBinNotes = useCallback(() => {
        fetch(`https://note-server-alpha.vercel.app/binNotes?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setNotes(data))
    }, [user?.email]);

    useEffect(() => {
        getBinNotes();
        setIsLoading(false);
    }, [getBinNotes]);

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

    const deleteAll = () => {
        emptyBin(user, getBinNotes, notes);
    }

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

                <div>
                    <MdOutlineDeleteForever className='w-10 h-10 dark:text-slate-200 cursor-pointer' title='Delete All' onClick={deleteAll} />
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
                                        records.map((note) => <GridView note={note} key={note._id} getBinNotes={getBinNotes} restore={restore} />
                                        )
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
                                        records.map((note, idx) => <TableView note={note} key={note._id} idx={idx} getBinNotes={getBinNotes} restore={restore} />)
                                    }
                                </table>
                        }
                    </div>
                    :
                    <p className='text-center text-4xl font-semibold dark:text-slate-200 mt-10'>Bin is empty</p>
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

export default NoteBin