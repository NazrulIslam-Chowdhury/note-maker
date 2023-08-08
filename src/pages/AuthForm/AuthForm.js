import React, { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsLogin((previousIsSignup) => !previousIsSignup)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }

    return (
        <div className='bg-white dark:bg-cyan-400 shadow-black shadow-2xl dark:shadow-cyan-400 rounded p-6 absolute left-24 sm:left-[34rem] top-6'>
            <div className='space-y-4'>
                <p className='text-xl text-white dark:text-slate-800 font-semibold'>{
                    isLogin ? 'Login' : 'Sign Up'
                }</p>
                <form
                    onSubmit={handleSubmit}
                    className='space-y-2'
                >
                    {!isLogin && (
                        <div className='flex sm:flex-row flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    name='firstName'
                                    placeholder='First Name'
                                    onChange={handleChange}
                                    className='p-3 border-none outline-none caret-slate-500 w-auto '
                                    required
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="fullName">Last Name</label>
                                <input
                                    type="text"
                                    name='lastName'
                                    placeholder='Last Name'
                                    onChange={handleChange}
                                    className='p-3 border-none outline-none caret-slate-500 w-auto '
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name='email'
                            placeholder='Email'
                            onChange={handleChange}
                            className='p-3 border-none outline-none caret-slate-500 w-auto '
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className='border-2 border-dotted py-10 px-5'>
                            <div className='relative sm:-top-7 -top-11'>
                                <input
                                    type="file"
                                    name='avatarURL'
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                    className='p-3 border-none outline-none caret-slate-500 sm:w-auto w-[70%] absolute opacity-0 z-10 cursor-pointer'
                                    required
                                />
                                <div className='absolute bg-aky-400 p-4 flex gap-5 items-center w-full justify-center'>
                                    <BiImageAdd className='h-6 w-6 text-slate-600' />
                                    <button className='text-lg text-slate-600 font-medium'>Add a photo</button>
                                </div>
                            </div>

                        </div>
                    )}

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Password'
                            onChange={handleChange}
                            className='p-3 border-none outline-none caret-slate-500 w-auto'
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name='confirmPassword'
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                className='p-3 border-none outline-none caret-slate-500 w-auto '
                                required
                            />
                        </div>
                    )}
                    <div className='w-auto bg-sky-400 hover:bg-sky-600 p-3 text-slate-200 font-medium text-xl cursor-pointer text-center'>
                        <button className=''>{isLogin ? 'Login' : 'Sign Up'}</button>
                    </div>
                </form>
                <div className=''>
                    <p>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <span
                            onClick={switchMode}
                            className='dark:text-slate-200 text-slate-600 font-medium text-lg cursor-pointer'
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthForm;