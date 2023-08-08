import React, { useState } from 'react';
import { logo } from '../../assets';
import { logo2 } from '../../assets';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiHome, BiCategory, BiTrash, BiLogOut, BiLogIn, BiSun, BiMoon } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { Mode } from '../../utils';
import { Link } from 'react-router-dom';


const SideBar = () => {
    const [user, setUser] = useState(false);
    const [close, setClose] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    Mode(theme);

    return (

        <div className={`bg-white dark:bg-slate-900 ${close ? 'w-20' : 'sm:w-64 w-[188px]'} min-h-[100vh] px-3 pt-7 space-y-5 transition-all duration-[0.6s] fixed z-10`}>
            <header className='relative'>
                <img
                    src={close ? logo2 : logo}
                    alt="Logo"
                    className={`${close ? 'w-20' : 'w-40'}`}
                />
                <div className='absolute top-2 -right-8 bg-cyan-500 rounded-full flex items-center justify-center p-2 cursor-pointer'
                    onClick={() => setClose(!close)}
                >
                    {
                        close ?

                            <IoIosArrowForward
                                className='w-6 h-6 text-white'
                            />
                            :
                            <IoIosArrowBack
                                className='w-6 h-6 text-white'
                            />
                    }
                </div>
            </header>

            <div className='overflow-hidden'>
                <ul className='space-y-5'>
                    <li className=' hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                        <Link
                            to='/'
                            className='flex gap-4 items-center'
                        >
                            <BiHome className='w-7 h-6 dark:text-white' />
                            <span className={`text-slate-500 dark:text-slate-400 text-lg font-medium ${close && 'hidden'} `}>My Notes</span>
                        </Link>
                    </li>
                    <li className='flex gap-4 items-center hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                        <BiCategory className='w-7 h-6 dark:text-white' />
                        <span className={`text-slate-500 dark:text-slate-400 text-lg font-medium ${close && 'hidden'}`}>Notebooks</span>
                    </li>
                    <li className='flex gap-4 items-center hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                        <AiOutlineHeart className='w-7 h-6 dark:text-white' />
                        <span className={`text-slate-500 dark:text-slate-400 text-lg font-medium ${close && 'hidden'}`}>
                            Likes</span>
                    </li>
                    <li className='flex gap-4 items-center hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                        <BiTrash className='w-7 h-6 dark:text-white' />
                        <span className={`text-slate-500 dark:text-slate-400 text-lg font-medium ${close && 'hidden'}`}>Bin</span>
                    </li>
                </ul>
            </div>

            <footer className='space-y-5 overflow-hidden'>
                <ul>
                    {
                        user ?
                            <li className=' hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                                <Link
                                    to='/auth-form'
                                    className='flex gap-4 items-center'>
                                    <BiLogOut className='w-7 h-6 dark:text-white' />
                                    <span className={`text-slate-500 dark:text-slate-400 text-lg font-medium ${close && 'hidden'}`}>Logout</span>
                                </Link>
                            </li>
                            :
                            <li className=' hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                                <Link
                                    to='/auth-form'
                                    className='flex gap-4 items-center'>
                                    <BiLogIn className='w-7 h-6 dark:text-white' />
                                    <span className={`text-slate-500 dark:text-slate-400 text-lg font-medium ${close && 'hidden'}`}>Login</span>
                                </Link>
                            </li>
                    }
                </ul>
                <div
                    onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}
                    className='cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 rounded transition-all duration-[0.5s]'>
                    {
                        theme === 'dark' ?
                            <div
                                className='flex items-center gap-4 ml-1'>
                                <BiSun className='w-7 h-6 text-amber-500' />
                                <h5 className={`text-slate-500 dark:text-slate-400 text-lg font-medium ${close && 'hidden'} `}>Light Mode</h5>
                            </div>
                            :
                            <div
                                className='flex items-center gap-4 ml-1'>
                                <BiMoon className='w-7 h-6 text-sky-400' />
                                <h5 className={`text-slate-500 dark:text-slate-400 text-lg font-medium ${close && 'hidden'}`}>Dark Mode</h5>
                            </div>
                    }
                </div>
            </footer>
        </div>

    )
}

export default SideBar