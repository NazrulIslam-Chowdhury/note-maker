import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const [form, setForm] = useState();
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            return alert('Password did not match');
        }
        console.log(data);
        setForm(data);
        reset();
    }
    console.log(errors)

    return (
        <div className='bg-white dark:bg-cyan-400 shadow-black shadow-2xl dark:shadow-cyan-400 rounded p-6 absolute left-24 sm:left-[34rem] top-6'>
            <div className='space-y-4'>
                <p className='text-xl dark:text-white text-slate-800 font-semibold'>
                    Sign Up
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-2'
                >
                    <div className='flex sm:flex-row flex-col gap-3'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                placeholder='First Name'
                                {...register('firstName')}
                                className='p-3 border-none outline-none caret-slate-500 w-auto '
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="fullName">Last Name</label>
                            <input
                                type="text"
                                placeholder='Last Name'
                                {...register('lastName')}
                                className='p-3 border-none outline-none caret-slate-500 w-auto '
                                required
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder='Email'
                            {...register('email')}
                            className='p-3 border-none outline-none caret-slate-500 min-w-full '
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="avatarURL">AvatarURL</label>
                        <input
                            type="text"
                            {...register('avatarURL')}
                            placeholder='Avatar URL'
                            className='p-3 border-none outline-none caret-slate-500 w-auto'
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPass ? 'text' : 'password'}
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
                        {errors.password && <span className='text-slate-600'>Password must be at least 10 digit</span>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            {...register('confirmPassword', { minLength: 10 })}
                            className='p-3 border-none outline-none caret-slate-500 w-auto '
                            required
                        />
                        {errors.confirmPassword && <span className='text-slate-600'>Password must be at least 10 digit</span>}
                    </div>
                    {/* <img src={form.avatarURL[0]} alt="" /> */}
                    <div className='w-auto bg-sky-400 hover:bg-sky-600 p-3 text-slate-200 font-medium text-xl cursor-pointer text-center'>
                        <button className=''>Sign Up</button>
                    </div>
                </form>
                <div className=''>
                    <p>
                        Already have an account?
                        <Link
                            to='/login'
                            className='dark:text-slate-200 text-slate-600 font-medium text-lg cursor-pointer'
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;