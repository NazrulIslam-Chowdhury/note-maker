import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'

const TableView = ({ note, idx }) => {
    const { description, title, category } = note;
    return (
        <tbody className='bg-slate-100 hover:bg-sky-200 dark:bg-slate-800 dark:hover:bg-sky-400 dark:hover:bg-opacity-[0.5] dark:text-white dark:shadow-inner dark:shadow-white shadow-md shadow-black rounded-md transition-colors duration-[0.5s] relative'>
            <tr>
                <th className='px-5 py-7'>{idx + 1}</th>
                <td className='px-5 py-7'>{description}</td>
                <td className='px-5 py-7'>{title}</td>
                <td className='px-5 py-7'>{category}</td>
                <td className='group'>
                    <CiMenuKebab className='h-6 w-6 cursor-pointer' />
                    <ul className='absolute bg-slate-300 text-slate-700 dark:text-slate-500 dark:bg-slate-800 p-5 hidden group-hover:flex flex-col gap-3 right-24 top-6 rounded-md before:absolute before:bg-slate-300 dark:before:bg-slate-800 before:p-1 before:-right-1 before:top-3 before:rotate-45 z-10'>
                        <li className='hover:bg-slate-700 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>Edit</li>
                        <li className='hover:bg-slate-700 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>Delete</li>
                    </ul>
                </td>
            </tr>
        </tbody>
    )
}

export default TableView