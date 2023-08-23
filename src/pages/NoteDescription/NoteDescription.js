import React, { useEffect, useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line, RiDownload2Line } from 'react-icons/ri';
import { useLoaderData } from 'react-router-dom'

const NoteDescription = () => {
  const note = useLoaderData();
  const { category, title, description, image } = note;
  const [showDownload, setShowDownload] = useState(false);
  const ref = useRef();

  useEffect(() => {
    let closeOnTap = (e) => {
      if (!ref.current.contains(e.target)) {
        setShowDownload(false);
      }
    };
    document.addEventListener('mousedown', closeOnTap);

    return () => {
      document.removeEventListener('mousedown', closeOnTap)
    }
  }, [])

  return (
    <div className='left-24 sm:left-[7rem] top-16 sm:top-8 absolute sm:w-[89.5vw] w-[72vw] space-y-4'>
      <div className='bg-slate-100 dark:bg-slate-800 hover:bg-sky-200 dark:hover:bg-sky-400 dark:hover:bg-opacity-[0.5] dark:text-white dark:shadow-inner dark:shadow-white shadow-md shadow-black p-5 rounded-md space-y-3 transition-colors duration-[0.5s]  after:absolute after:bg-red-400 after:h-1 after:w-full after:rounded-lg after:bottom-0 after:left-0 bar relative'>
        <div className='space-y-5'>
          <ul className=' text-slate-700 dark:text-slate-500 flex flex-row sm:gap-3 gap-1 rounded-md '>
            <li className='hover:bg-slate-700 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>
              <BiEdit className='w-7 h-7' />
            </li>
            <li className='hover:bg-slate-700 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>
              <RiDeleteBin5Line className='w-7 h-7' />
            </li>
            <li ref={ref} className='hover:bg-slate-700 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded relative'>
              <RiDownload2Line
                className='w-7 h-7'
                onClick={() => setShowDownload(!showDownload)}
              />
              {
                showDownload &&
                <div className='absolute bg-slate-300 text-slate-700 dark:text-slate-400 dark:bg-slate-700 p-3 rounded-md'>
                  <ul >
                    <li className='whitespace-nowrap hover:bg-slate-800 hover:text-white transition-colors duration-[0.5s] cursor-pointer px-2 py-1 rounded-md'>As image</li>
                    <li className='whitespace-nowrap hover:bg-slate-800 hover:text-white transition-colors duration-[0.5s] cursor-pointer px-2 py-1 rounded-md'>As pdf</li>
                  </ul>
                </div>
              }
            </li>
          </ul>
          <h1 className='sm:text-2xl text-base font-semibold'><span className='text-slate-500 sm:text-sm text-xs'>Category :</span> {category}</h1>

        </div>
        <h2 className='text-xl font-medium'><span className='text-slate-500 text-sm'>Title :</span> {title}</h2>
        <p className=''><span className='text-slate-500 text-sm'>Description :</span> {description}</p>
        <img
          src={image}
          alt={image === null ? 'No image to show' : { title }}
          className='w-[300px] h-[300px] object-cover'
        />
      </div>
    </div>
  )
}

export default NoteDescription