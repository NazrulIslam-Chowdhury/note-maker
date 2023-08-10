import React, { useContext, useState } from 'react';
import { logo } from '../../assets';
import { logo2 } from '../../assets';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiHome, BiCategory, BiTrash, BiLogOut, BiLogIn, BiSun, BiMoon } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { Mode } from '../../utils';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';


const SideBar = () => {
    const { user, logout } = useContext(AuthContext)
    const [close, setClose] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    Mode(theme);

    const logoutOnClick = () => {
        logout()
            .then(() => { toast.success('Logged out successfully') })
            .catch((error) => console.log(error))
    }

    return (

        <div className={`bg-white dark:bg-slate-900 ${close ? 'w-20' : 'sm:w-64 w-[188px]'} min-h-[100vh] px-3 pt-7 space-y-5 transition-all duration-[0.6s] fixed z-10`}>
            <header className='relative'>
                <img
                    src={close ? logo2 : logo}
                    alt="Logo"
                    className={`${close ? 'w-20' : 'w-40'}flex items-center px-3 py-2 `}
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

                {
                    user?.uid &&
                    <div className='group'>
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className='flex items-center px-3 py-2 w-auto h-auto cursor-pointer'
                        />
                        <div className={`bg-slate-300 px-3 py-2 hidden group-hover:flex group-hover:flex-col transition-transform duration-[0.5s] absolute rounded before:absolute before:bg-slate-300 before:p-1 before:-top-1 ${close ? 'before:left-6' : 'before:left-12'} before:rotate-45`}>
                            <ul className='space-y-4'>
                                <div className='space-y-2'>
                                    {/* <div className='bg-slate-300 rotate-45 text-slate-300 absolute -top-1 left-11'>
                                    <p className='opacity-0'>af</p>
                                </div> */}
                                    <li className='text-sm'>{user?.displayName}</li>
                                    <li className='text-sm'>{user?.email}</li>
                                </div>
                                <li className='hover:bg-slate-400 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                                    <Link className='text-slate-600 hover:text-slate-200 text-lg font-medium'>Edit Profile</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                }
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
                        user?.uid ?
                            <li className='flex gap-4 items-center hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'
                                onClick={logoutOnClick}
                            >
                                <BiLogOut className='w-7 h-6 dark:text-white' />
                                <span className={`text-slate-500 dark:text-slate-400 text-lg font-medium ${close && 'hidden'}`}>Logout</span>
                            </li>
                            :
                            <li className=' hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                                <Link
                                    to='/login'
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