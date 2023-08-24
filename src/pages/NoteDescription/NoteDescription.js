import React, { useEffect, useRef, useState } from 'react'
import { BiEdit, BiHeart, BiSolidHeart } from 'react-icons/bi';
import { RiDownload2Line } from 'react-icons/ri';
import { useLoaderData } from 'react-router-dom'
import Modal from './Modal';
import { toast } from 'react-hot-toast';

const NoteDescription = () => {
  const note = useLoaderData();
  const { category, title, description, image, favorite } = note;
  const [isFavorite, setIsFavorite] = useState(favorite?.isFavorite ? false : true);
  const [showDownload, setShowDownload] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef();
  console.log(note)


  // close the menu after clicking outside
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

  const addToFavoriteOnClick = async () => {
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
    const req = await fetch(`http://localhost:5000/notesAll/favorite/${note._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ isFavorite })
    })
    const res = await req.json();
    if (res.acknowledged && isFavorite !== true) {
      const req = await fetch(`http://localhost:5000/favorite`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(note)
      });
      const res = await req.json();
      if (res.acknowledged) {
        toast.success('Added to favorite')
      }
    }
    if (res.acknowledged && isFavorite !== false) {
      const req = await fetch(`http://localhost:5000/favorite/${note._id}`, {
        method: 'DELETE',
      });
      const res = await req.json();
      if (res.acknowledged) {
        toast.success('Removed from favorite')
      }
    }
  }

  return (
    <div className={`${modalOpen && 'bg-slate-950/70 absolute top-0 right-0 bottom-0 left-0 z-10'}`}>
      <div className={`left-24 sm:left-[7rem] top-16 sm:top-8 absolute sm:w-[89.5vw] w-[72vw] space-y-4 ${modalOpen && 'hidden'}`}>
        <div className='bg-slate-100 dark:bg-slate-800 hover:bg-sky-200 dark:hover:bg-sky-400 dark:hover:bg-opacity-[0.5] dark:text-white dark:shadow-inner dark:shadow-white shadow-md shadow-black p-5 rounded-md space-y-3 transition-colors duration-[0.5s]  after:absolute after:bg-red-400 after:h-1 after:w-full after:rounded-lg after:bottom-0 after:left-0 bar relative'>
          <div className='space-y-5'>
            <ul className=' text-slate-700 dark:text-slate-500 flex flex-row sm:gap-3 gap-1 rounded-md '>
              <li className='hover:bg-slate-700 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>
                <BiEdit className='w-7 h-7' onClick={() => setModalOpen(true)} />
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
              <li
                onClick={addToFavoriteOnClick}
                className='hover:bg-slate-700 hover:text-white px-3 py-2 transition-colors duration-[0.5s] cursor-pointer rounded'>
                {
                  isFavorite === true ?
                    <BiSolidHeart className='text-red-500 w-7 h-7' />
                    :
                    <BiHeart className='w-7 h-7' />
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
      {/*modal */}
      {
        modalOpen &&
        <Modal note={note} setModalOpen={setModalOpen} />
      }
    </div>
  )
}

export default NoteDescription