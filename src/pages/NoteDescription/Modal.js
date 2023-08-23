import React from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';

const Modal = ({ note, setModalOpen }) => {
    return (
        <div className='bg-slate-300 dark:bg-slate-500 p-5 top-12 sm:left-[32rem] left-0 w-auto sm:w-[32rem] h-auto sm:h-[37rem] absolute space-y-5 rounded-md'>
            <div className='float-right'>
                <AiOutlineCloseSquare
                    onClick={() => setModalOpen(false)}
                    className='w-7 h-7 dark:text-slate-300 cursor-pointer' title='close' />
            </div>
            <div className='space-y-4'>
                <div className='flex flex-col'>
                    <label htmlFor="category" className='text-xl font-medium dark:text-slate-200'>Category</label>
                    <input
                        type="text"
                        defaultValue={note.category}
                        className='px-5 py-2 rounded-md text-slate-700'
                        disabled />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="title" className='text-xl font-medium dark:text-slate-200'>Title</label>
                    <input
                        type="text"
                        className='px-5 py-2 rounded-md text-slate-700'
                        defaultValue={note.title}
                        disabled />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="description" className='text-xl font-medium dark:text-slate-200'>Description</label>
                    <textarea
                        name="description"
                        id=""
                        cols="20"
                        rows="10"
                        className='px-5 py-2 rounded-md outline-slate-400 text-slate-600'
                        defaultValue={note.description}></textarea>
                </div>
            </div>
            <div>
                <button className='bg-slate-800 hover:bg-slate-950 text-center text-slate-300 text-lg font-medium py-3 w-full rounded-md'>Save</button>
            </div>
        </div>
    )
}

export default Modal