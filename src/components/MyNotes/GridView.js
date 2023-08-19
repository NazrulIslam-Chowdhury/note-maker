import React, { useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci';

const GridView = ({ note }) => {
    const { category, title, description } = note;
    const [open, setOpen] = useState(false);
    return (
        <div className='w-auto sm:w-[30rem] h-[20rem] bg-slate-100 hover:bg-sky-200 dark:bg-slate-800 dark:hover:bg-sky-400 dark:hover:bg-opacity-[0.5] dark:text-white dark:shadow-inner dark:shadow-white shadow-md shadow-black p-5 rounded-md space-y-3 transition-colors duration-[0.5s]  after:absolute after:bg-red-400 after:h-1 after:w-full after:rounded-lg after:bottom-0 after:left-0 bar relative'>
            <div className='flex justify-between items-center relative group'>
                <h1 className='text-2xl font-semibold'><span className='text-slate-500 text-sm'>Category :</span> {category}</h1>
                <CiMenuKebab className='h-6 w-6 cursor-pointer' onClick={() => open ? setOpen(!open) : setOpen(!open)} />
                {
                    open &&
                    <ul className='absolute bg-slate-300 text-slate-700 dark:text-slate-500 dark:bg-slate-800 p-5 hidden group-hover:flex flex-col gap-3 right-5 top-1 rounded-md before:absolute before:bg-slate-300 dark:before:bg-slate-800 before:p-1 before:-right-1 before:top-3 before:rotate-45'>
                        <li className='hover:bg-slate-700 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>Edit</li>
                        <li className='hover:bg-slate-700 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>Delete</li>
                    </ul>
                }
            </div>
            <h2 className='text-xl font-medium'><span className='text-slate-500 text-sm'>Title :</span> {title}</h2>
            <p><span className='text-slate-500 text-sm'>Description :</span> {description.length > 100 ? description.split(0, 101) : description}</p>
        </div>
    )
}

export default GridView