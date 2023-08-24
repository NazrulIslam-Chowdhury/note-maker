import React, { useEffect, useRef } from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Modal = ({ note, setModalOpen }) => {
    const { category, title, description, image } = note;
    const { register, handleSubmit } = useForm();
    const ref = useRef();

    // close the modal after clicking outside
    useEffect(() => {
        let closeOnTap = (e) => {
            if (!ref.current.contains(e.target)) {
                setModalOpen(false);
            }
        };
        document.addEventListener('mousedown', closeOnTap);

        return () => {
            document.removeEventListener('mousedown', closeOnTap)
        }
    }, [setModalOpen]);

    const updateOnClick = async (data) => {
        const req = await fetch(`http://localhost:5000/notesAll/${note._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const res = await req.json();
        if (res.acknowledged) {
            toast.success('Note Updated');
            setModalOpen(false)
        }
    }

    return (
        <div ref={ref} className='bg-slate-300 dark:bg-slate-500 p-5 top-20 sm:left-[38rem] left-[3.5rem] w-auto sm:w-[32rem] h-auto sm:h-[37rem] absolute space-y-5 rounded-md z-[1000] shadow-xl shadow-black'>
            <div className='float-right'>
                <AiOutlineCloseSquare
                    onClick={() => setModalOpen(false)}
                    className='w-7 h-7 dark:text-slate-300 cursor-pointer' title='close' />
            </div>
            <form onSubmit={handleSubmit(updateOnClick)} className='space-y-4'>
                <div className='flex flex-col'>
                    <label htmlFor="category" className='text-xl font-medium dark:text-slate-200'>Category</label>
                    <input
                        {...register('category')}
                        type="text"
                        defaultValue={category}
                        className='px-5 py-2 rounded-md outline-slate-400 text-slate-700'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="title" className='text-xl font-medium dark:text-slate-200'>Title</label>
                    <input
                        {...register('title')}
                        type="text"
                        className='px-5 py-2 rounded-md outline-slate-400 text-slate-700'
                        defaultValue={title}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="description" className='text-xl font-medium dark:text-slate-200'>Description</label>
                    <textarea
                        {...register('description')}
                        cols="20"
                        rows="7"
                        className='px-5 py-2 rounded-md outline-slate-400 text-slate-600'
                        defaultValue={description}></textarea>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="image" className='text-xl font-medium dark:text-slate-200'>Image URL</label>
                    <input
                        {...register('image')}
                        type='text'
                        className='px-5 py-2 rounded-md outline-slate-400 text-slate-600'
                        defaultValue={image}
                    />

                </div>
                <div>
                    <button className='bg-slate-800 hover:bg-slate-950 text-center text-slate-300 text-lg font-medium py-3 w-full rounded-md'>Save</button>
                </div>
            </form>

        </div>
    )
}

export default Modal