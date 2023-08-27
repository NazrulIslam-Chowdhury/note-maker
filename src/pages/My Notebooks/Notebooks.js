import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { AiFillFolderOpen } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useTitle } from '../../utils';

const Notebooks = () => {
    const { user } = useContext(AuthContext);
    const [notebooks, setNotebooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useTitle('Notebooks')

    const myNotebooks = useCallback(
        async () => {
            const req = await fetch(`http://localhost:5000/categories?email=${user?.email}`);
            const res = await req.json();
            setNotebooks(res);
        }, [user?.email]
    )

    useEffect(() => {
        myNotebooks()
        setIsLoading(false)
    }, [myNotebooks])

    const uniqueCategories = [...new Set(notebooks.map((notebook) => notebook.category))];

    if (isLoading) return <h1 className='absolute left-[52rem] top-[20rem] z-10'>Loading...</h1>

    return (
        <div className='left-24 sm:left-[7rem] top-16 sm:top-8 absolute sm:w-[89.5vw] w-[72vw] space-y-4'>
            <div className='flex items-center justify-evenly flex-wrap sm:gap-5 gap-0' >
                {
                    uniqueCategories.map((uniqueCategory, idx) => (
                        <Link
                            to={`/category-notebooks/${uniqueCategory}/${user?.email}`}
                            key={idx}
                        >
                            <div>
                                <AiFillFolderOpen className='w-10 h-10 dark:text-white' />
                                <p className='dark:text-white'>{uniqueCategory}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Notebooks