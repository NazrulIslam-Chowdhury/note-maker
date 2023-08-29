import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGoogleCircle } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { useTitle } from '../../utils';

const Login = () => {
    const {
        loading,
        setLoading,
        login,
        loginWithGoogle
    } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    // after login locate to desire path
    const from = location.state?.from?.pathname || '/';

    useTitle('Login');

    // user login
    const loginOnClick = (data) => {
        login(data.email, data.password)
            .then(result => {
                // const user = result.user;
                toast.success('Login successfully');

                // navigate to home page after login
                navigate(from, { state: true });

                // reset form
                reset();
            })
            .catch(error => {
                window.alert(error)
                setLoading(false)
            });
    }

    // login with google
    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                const user = result.user;
                // console.log(user)
                toast.success(`${user.displayName} Logged in successfully`)
                navigate(from, { state: true });

            })
            .catch(error => {
                window.alert(error)
                setLoading(false)
            })
    }


    return (
        <div className='bg-white dark:bg-cyan-400 shadow-black shadow-2xl dark:shadow-cyan-400 rounded p-6 left-20 sm:left-[36rem] sm:top-12 top-20 space-y-4 absolute sm:w-[450px] w-auto'>
            <p className='text-xl dark:text-white text-slate-800 font-semibold'>
                Login
            </p>
            <form
                onSubmit={handleSubmit(loginOnClick)}
                className='space-y-2'
            >
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        {...register('email')}
                        className='p-3 outline-slate-400 caret-slate-400 w-auto'
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
                        className='p-3 outline-slate-400 caret-slate-400 w-auto'
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
                    <button>
                        {
                            loading ?
                                <div className='border-4 border-dotted border-slate-600 animate-spin rounded-full'>
                                    <div className='bg-sky-400 hover:bg-sky-600 p-3 bg-opacity-0'>
                                    </div>
                                </div>
                                :
                                'Login'
                        }
                    </button>
                </div>
            </form>
            <p className='text-center text-lg font-medium'>Or</p>
            <div className='w-auto bg-sky-400 hover:bg-sky-600 px-3 py-2 text-slate-200 font-medium text-xl cursor-pointer text-center'
                onClick={handleGoogleLogin}
            >
                <button>
                    <div className='flex gap-3 items-center'>
                        <p>Login with</p>
                        <AiFillGoogleCircle className='w-8 h-8 text-slate-700' />
                    </div>
                </button>
            </div>

            <div className=''>
                <p>
                    Don't have an account ?
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