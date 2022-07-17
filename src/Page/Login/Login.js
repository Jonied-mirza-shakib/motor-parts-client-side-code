import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import Loading from '../Loading/Loading';
import { FcGoogle } from 'react-icons/fc';
import useToken from '../../hooks/useToken';


const Login = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    let errorMessage;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [token]=useToken(user || googleUser)
    if (googleLoading || loading) {
        return <Loading></Loading>
    }

    if (googleError || error) {
        errorMessage = <p> {error?.message}</p>
    }
    if (token) {
        navigate(from, { replace: true });
    }
    const onSubmit = async (data) => {
        console.log(data)
        signInWithEmailAndPassword(data.email, data.password)
        reset()
    };
    return (
        <div>
            <div className='flex flex-row justify-center mt-10'>
                <div className="card md:w-4/5 lg:w-2/5 bg-base-100 shadow-xl">
                    <h1 className='text-center text-accent-focus text-3xl font-bold mt-5'>Login</h1>
                    <div className="card-body">
                        <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input
                                    type="password" placeholder="Your Password" className="input input-bordered w-full max-w-xs"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>
                            {errorMessage}
                            <input className='btn w-10/12 max-w-xs text-white' type="submit" value='Login' />
                        </form>
                        <div className='flex flex-col items-center' >
                            <button onClick={() => signInWithGoogle()} className='btn btn-accent w-10/12' type='button'><span className='mr-3 text-4xl'><FcGoogle /></span> <span className='text-white font-bold'>Login</span> </button>
                            <p className='capitalize mt-5'>are you a new user?  <Link to='/signUp' className='text-accent-focus underline font-bold'>please sign up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;