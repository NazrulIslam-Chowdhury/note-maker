import React, { useState } from 'react';
import { logo } from '../../assets';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiHome, BiCategory, BiTrash, BiLogOut, BiLogIn, BiSun, BiMoon } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';

const SideBar = () => {
    const [user, setUser] = useState(true);
    const [dark, setDark] = useState(false);
    const [close, setClose] = useState(false);

    return (
        <div className={`bg-white ${close ? 'w-20' : 'w-64 '} min-h-[100vh] px-3 pt-7 space-y-5 transition-all duration-[0.6s]`}>
            <header className='relative'>
                <img
                    src={logo}
                    alt="Logo"
                    className='w-40'
                />
                <div className='absolute top-7 -right-8 bg-cyan-500 rounded-full flex items-center justify-center p-2'
                    onClick={() => setClose(!close)}
                >
                    {
                        close ?

                            <IoIosArrowForward
                                className='w-6 h-6 text-white '
                            />
                            :
                            <IoIosArrowBack
                                className='w-6 h-6 text-white '
                            />
                    }
                </div>
            </header>

            <div>
                <ul className='space-y-5'>
                    <li className='flex gap-4 items-center hover:bg-slate-200 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                        <BiHome className='w-7 h-6' />
                        <span className={`text-slate-500 text-lg font-medium ${close && 'hidden'} `}>My Notes</span>
                    </li>
                    <li className='flex gap-4 items-center hover:bg-slate-200 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                        <BiCategory className='w-7 h-6' />
                        <span className={`text-slate-500 text-lg font-medium ${close && 'hidden'}`}>Notebooks</span>
                    </li>
                    <li className='flex gap-4 items-center hover:bg-slate-200 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                        <AiOutlineHeart className='w-7 h-6' />
                        <span className={`text-slate-500 text-lg font-medium ${close && 'hidden'}`}>
                            Likes</span>
                    </li>
                    <li className='flex gap-4 items-center hover:bg-slate-200 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                        <BiTrash className='w-7 h-6' />
                        <span className={`text-slate-500 text-lg font-medium ${close && 'hidden'}`}>Bin</span>
                    </li>
                </ul>
            </div>

            <footer className='space-y-5 '>
                <ul>
                    {
                        user ?
                            <li className='flex gap-4 items-center hover:bg-slate-200 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                                <BiLogOut className='w-7 h-6' />
                                <span className={`text-slate-500 text-lg font-medium ${close && 'hidden'}`}>Logout</span>
                            </li>
                            :
                            <li className='flex gap-4 items-center hover:bg-slate-200 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                                <BiLogIn className='w-7 h-6' />
                                <span className={`text-slate-500 text-lg font-medium ${close && 'hidden'}`}>Login</span>
                            </li>
                    }
                </ul>
                <div
                    onClick={() => setDark(!dark)}
                    className='cursor-pointer hover:bg-slate-200 px-3 py-2 rounded transition-colors duration-[0.5s]'>
                    {
                        !dark ?
                            <div className='flex items-center gap-4 ml-1'>
                                <BiMoon className='w-7 h-6' />
                                <h5 className={`text-slate-500 text-lg font-medium ${close && 'hidden'}`}>Dark Mood</h5>
                            </div>
                            :
                            <div className='flex items-center gap-4 ml-1'>
                                <BiSun className='w-7 h-6' />
                                <h5 className={`text-slate-500 text-lg font-medium ${close && 'hidden'} `}>Light Mood</h5>
                            </div>
                    }
                </div>
            </footer>
        </div>
    )
}

export default SideBar