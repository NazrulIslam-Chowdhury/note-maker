import React from 'react'
import { useTitle } from '../../utils'
import { useForm } from 'react-hook-form'

const AddNote = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useTitle('Add-Note')

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className='left-24 sm:left-[7rem] top-2 absolute sm:w-[89.5vw] w-[72vw] space-y-4'>
            <div className='bg-white dark:bg-slate-900 px-5 py-3 rounded-md '>
                <p className='text-xl font-medium dark:text-white'>New Note</p>
            </div>
            <div className='bg-white dark:bg-slate-900 p-5 rounded-md flex flex-col sm:flex-row  gap-8'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-3'>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="category" className='text-xl font-medium dark:text-white'>Give a category name</label>
                        <input
                            type="text"
                            {...register('category')}
                            placeholder='Category'
                            className='px-5 py-3 bg-slate-200 dark:text-slate-200 dark:bg-slate-800 rounded-md text-xl outline-slate-400 caret-slate-400'
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-5'>
                        <label htmlFor="title" className='text-xl font-medium dark:text-white'>Title</label>
                        <input
                            type="text"
                            {...register('title')}
                            placeholder='Title'
                            className='px-5 py-3 bg-slate-200 dark:text-slate-200 dark:bg-slate-800 rounded-md text-xl outline-slate-400 caret-slate-400'
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-5'>
                        <label htmlFor="description" className='text-xl font-medium dark:text-white'>Description</label>
                        <textarea
                            {...register('description')}
                            cols="30"
                            rows="6"
                            placeholder='Description'
                            className='px-5 py-3 rounded-md text-xl outline-slate-400 caret-slate-400 bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                            required
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-5'>
                        <div className='flex flex-col gap-5'>
                            <label htmlFor="photo" className='text-xl font-medium dark:text-white'>Add Photo</label>
                            <input
                                type="file"
                                {...register('photo')}
                                className=' dark:text-white rounded-md text-xl outline-slate-400 caret-slate-400 file:px-8 file:py-3 file:rounded-md file:bg-slate-200 file:cursor-pointer file:border-none w-[100%] sm:w-auto'
                                multiple
                            />
                        </div>
                        <div className='sm:w-[20%] w-full bg-sky-400 hover:bg-sky-600 p-3 text-slate-200 font-medium text-xl cursor-pointer text-center rounded-md'>
                            <button>Add</button>
                        </div>
                    </div>
                </form>
                <div className='bg-slate-100 dark:bg-slate-800 dark:hover:bg-sky-400 dark:hover:bg-opacity-[0.5]  dark:text-white p-5 rounded-md space-y-3 transition-colors duration-[0.5s]'>
                    <h1 className='text-2xl font-semibold'>Example Note</h1>
                    <h2 className='text-xl font-medium'>Demo</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur accusamus excepturi, corporis eos provident magni cumque quisquam esse, alias voluptatum? Facilis, totam commodi, minus dignissimos quasi laudantium veniam possimus odio laboriosam voluptatem cupiditate culpa sit provident qui ipsa labore saepe? Suscipit, obcaecati quaerat enim magni dolorum quibusdam amet quod?</p>
                </div>
            </div>
        </div>
    )
}

export default AddNote