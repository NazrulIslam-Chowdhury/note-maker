import React, { useContext, useEffect, useState } from 'react';
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from 'react-icons/fc';
import { TfiViewGrid, TfiViewList } from 'react-icons/tfi';
import { BsSearch } from 'react-icons/bs';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import GridView from './GridView';
import TableView from './TableView';
import { sortData } from '../../utils';

const MyNotes = () => {
    const { user } = useContext(AuthContext);
    const [viewGrid, setViewGrid] = useState(true);
    const [isAsc, setIsAsc] = useState(true);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/notesAll?&email=${user?.email}`)
            .then(res => res.json())
            .then(data => setNotes(data))
        setIsLoading(false);
    }, [user?.email])

    const sortOnClick = () => {
        sortData(notes, setNotes, isAsc, setIsAsc)
    }

    if (isLoading) return <h1 className='absolute left-[52rem] top-[20rem] z-10'>Loading...</h1>

    return (
        <div className='left-24 sm:left-[7rem] sm:top-12 top-20 absolute sm:w-[89.5vw] w-[72vw] space-y-4 sm:overflow-visible overflow-x-auto'>
            <div className='flex sm:grid sm:grid-cols-4 gap-2'>
                <div className='flex sm:col-span-3'>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder='Search by title or category'
                        className='w-full px-3 py-2 sm:px-5 sm:py-3 bg-slate-200 text-slate-600 dark:text-slate-200 dark:bg-slate-800 transition-colors duration-[0.5s] rounded-md rounded-tr-none rounded-br-none sm:text-xl border-2 border-solid border-slate-400 border-r-0 outline-none caret-slate-400'
                    />
                    <button className='bg-sky-400 text-white sm:text-lg font-medium p-4 rounded-tr-md rounded-br-md'><BsSearch /></button>
                </div>
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

            {
                notes.length > 0 ?
                    <>
                        {
                            !viewGrid ?
                                <div className='flex flex-col sm:flex-row flex-wrap gap-5'>
                                    {
                                        notes.map((note) => <GridView note={note} key={note._id} />)
                                    }
                                </div>
                                :
                                <table className='w-full'>
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
                                        notes.map((note, idx) => <TableView note={note} key={note._id} idx={idx} />)
                                    }
                                </table>
                        }
                    </>
                    :
                    <Link to='/add-note'>
                        <p className='text-center text-4xl font-semibold dark:text-slate-200 mt-10'>Add a note</p>
                    </Link>
            }

        </div>
    )
}

export default MyNotes