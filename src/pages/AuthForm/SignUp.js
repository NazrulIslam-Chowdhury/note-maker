import React, { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useTitle } from '../../utils';
import { toast } from 'react-hot-toast';


const SignUp = () => {
    const {
        createUserWithEmailAndPass,
        updateUser,
        loading
    } = useContext(AuthContext);

    useTitle('Sign-up');

    const [showPass, setShowPass] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            return alert('Password did not match');
        }

        // create user 
        createUserWithEmailAndPass(data.email, data.password)
            .then(result => {
                // console.log(result);
                const user = result.user;
                toast.success(`User is created`);
                const userInfo = {
                    displayName: (data.firstName + ' ' + data.lastName),
                    photoURL: data.avatarURL
                }

                // update user info
                updateUser(userInfo)
                    .then(() => { })
                    .catch(err => console.error(err))
            })

            .catch(error => alert(error))

        // navigate the route to home page
        navigate('/');

        // reset the form
        reset();
    }
    // console.log(errors)

    return (
        <div className='bg-white dark:bg-cyan-400 shadow-black shadow-2xl dark:shadow-cyan-400 rounded p-6 absolute left-24 sm:left-[34rem] sm:top-12 top-20'>
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
                                className='p-3 outline-slate-400 caret-slate-400 w-auto '
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="fullName">Last Name</label>
                            <input
                                type="text"
                                placeholder='Last Name'
                                {...register('lastName')}
                                className='p-3 outline-slate-400 caret-slate-400 w-auto '
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
                            className='p-3 outline-slate-400 caret-slate-400 min-w-full '
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="avatarURL">AvatarURL</label>
                        <input
                            type="text"
                            {...register('avatarURL')}
                            placeholder='Avatar URL'
                            className='p-3 outline-slate-400 caret-slate-400 w-auto'
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPass ? 'text' : 'password'}
                            placeholder='Password'
                            {...register('password', { minLength: 10 })}
                            className='p-3 outline-slate-400 caret-slate-400 min-w-full'
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
                            className='p-3 outline-slate-400 caret-slate-400 w-auto '
                            required
                        />
                        {errors.confirmPassword && <span className='text-slate-600'>Password must be at least 10 digit</span>}
                    </div>
                    <div className='w-auto bg-sky-400 hover:bg-sky-600 p-3 text-slate-200 font-medium text-xl cursor-pointer text-center'>
                        <button>{
                            loading ?
                                <div className='border-4 border-dotted border-slate-600 animate-spin rounded-full'>
                                    <div className='bg-sky-400 hover:bg-sky-600 p-3 bg-opacity-0'>
                                    </div>
                                </div>
                                :
                                'Sign up'
                        }</button>
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