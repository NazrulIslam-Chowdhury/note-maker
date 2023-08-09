import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState();
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(form);
    }

    return (
        <div className='bg-white dark:bg-cyan-400 shadow-black shadow-2xl dark:shadow-cyan-400 rounded p-6 left-24 sm:left-[34rem] top-20 space-y-4 absolute sm:w-[450px] w-auto'>
            <p className='text-xl dark:text-white text-slate-800 font-semibold'>
                Login
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-2'
            >
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        {...register('email')}
                        className='p-3 border-none outline-none caret-slate-500 min-w-full '
                        required
                    />
                </div>

                <div className='flex flex-col gap-2 relative'>
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPass ? 'text' : "password"}
                        name='password'
                        placeholder='Password'
                        {...register('password', { minLength: 10 })}
                        className='p-3 border-none outline-none caret-slate-500 min-w-full'
                        required
                    />
                    <div
                        className='absolute right-3 top-12 cursor-pointer'
                        onClick={() => setShowPass(!showPass)}>
                        {
                            showPass ?
                                <AiOutlineEyeInvisible />
                                :
                                <AiOutlineEye />
                        }
                    </div>
                </div>

                <div className='w-auto bg-sky-400 hover:bg-sky-600 p-3 text-slate-200 font-medium text-xl cursor-pointer text-center'>
                    <button className=''>Login</button>
                </div>
            </form>
            <div className=''>
                <p>
                    Don't have an account?
                    <Link
                        to='/sign-up'
                        className='dark:text-slate-200 text-slate-600 font-medium text-lg cursor-pointer'
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login;