import React, { useContext, useState } from 'react';
import { logo } from '../../assets';
import { logo2 } from '../../assets';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiHome, BiCategory, BiTrash, BiLogOut, BiLogIn, BiSun, BiMoon, BiChevronDown, BiPlus } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { Mode } from '../../utils';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';



const SideBar = () => {
    const { user, logout } = useContext(AuthContext)
    const [close, setClose] = useState(true);
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
                    user?.emailVerified && user?.uid &&
                    <div className='group overflow-hidden'>
                        <div className='flex gap-4 items-center cursor-pointer'>
                            <img
                                src={user?.photoURL}
                                alt={user?.displayName}
                                className='flex items-center w-26 h-12 px-3 py-2 object-fit rounded-full'
                            />
                            <p className={`text-sm ${close && 'hidden'} dark:text-white`}>{user?.displayName}</p>
                            <BiChevronDown className='h-8 w-8 dark:text-white' />
                        </div>
                        <div className={`bg-slate-300 px-3 py-2 hidden  group-hover:flex hover:flex-col transition-transform duration-[0.5s] absolute rounded before:absolute before:bg-slate-300 before:p-1 before:-top-1 ${close ? 'before:left-6' : 'before:left-12'} before:rotate-45`}>
                            <ul className='space-y-4'>
                                <li className='text-sm'>{user?.email}</li>
                                <li className='hover:bg-slate-400 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                                    <Link className={` text-slate-600 hover:text-slate-200 text-lg font-medium`}>Edit Profile</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                }
            </header>

            <nav className='overflow-hidden'>
                <ul className='space-y-5'>
                    <li>
                        <NavLink
                            to='/add-note'
                            className={`${({ isActive }) => isActive ? '' : ''} flex gap-4 items-center hover:bg-slate-800 bg-slate-950 px-3 py-2 rounded transition-colors duration-[0.5s]`}
                            title={close ? 'Add a note' : ''}
                        >
                            <BiPlus className='w-7 h-6 text-white' />
                            <span className={`text-slate-300 dark:text-slate-400 text-base sm:text-lg font-medium ${close && 'hidden'} `}>Add a note</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to='/'
                            className={`flex gap-4 items-center ${({ isActive }) => isActive ? '' : ''}  hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 rounded transition-colors duration-[0.5s]`}
                            title={close ? 'My notes' : ''}
                        >
                            <BiHome className='w-7 h-6 dark:text-white' />
                            <span className={`text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium ${close && 'hidden'} `}>My Notes</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/notebooks'
                            className='flex gap-4 items-center hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 rounded transition-colors duration-[0.5s] cursor-pointer'
                            title={close ? 'Notebooks' : ''}
                        >
                            <BiCategory className='w-7 h-6 dark:text-white' />
                            <span className={`text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium ${close && 'hidden'}`}>Notebooks</span>
                        </NavLink>

                    </li>
                    <li>
                        <NavLink
                            to='/favorite-notes'
                            className='flex gap-4 items-center hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'
                            title={close ? 'Favorite' : ''}
                        >
                            <AiOutlineHeart className='w-7 h-6 dark:text-white' />
                            <span className={`text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium ${close && 'hidden'}`}>
                                Favorite
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/note-bin'
                            className={`${({ isActive }) => isActive ? '' : ''} flex gap-4 items-center hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]`}
                            title={close ? 'Bin' : ''}
                        >
                            <BiTrash className='w-7 h-6 dark:text-white' />
                            <span className={`text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium ${close && 'hidden'}`}>Bin</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <footer className='space-y-5 overflow-hidden'>
                <ul>
                    {
                        user?.uid ?
                            <li className='flex gap-4 items-center hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'
                                onClick={logoutOnClick}
                            >
                                <BiLogOut className='w-7 h-6 dark:text-white' />
                                <span className={`text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium ${close && 'hidden'}`}>Logout</span>
                            </li>
                            :
                            <li className=' hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer rounded transition-colors duration-[0.5s]'>
                                <Link
                                    to='/login'
                                    className='flex gap-4 items-center'>
                                    <BiLogIn className='w-7 h-6 dark:text-white' />
                                    <span className={`text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium ${close && 'hidden'}`}>Login</span>
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
                                <h5 className={`text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium ${close && 'hidden'} `}>Light Mode</h5>
                            </div>
                            :
                            <div
                                className='flex items-center gap-4 ml-1'>
                                <BiMoon className='w-7 h-6 text-sky-400' />
                                <h5 className={`text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium ${close && 'hidden'}`}>Dark Mode</h5>
                            </div>
                    }
                </div>
            </footer>
        </div>

    )
}

export default SideBar