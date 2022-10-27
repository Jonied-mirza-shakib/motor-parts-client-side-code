import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import Loading from '../Loading/Loading';
import { FcGoogle } from 'react-icons/fc';
import useToken from '../../hooks/useToken';
import './Login.css'


const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState('');
    const [sendPasswordResetEmail, sending, sendPasswordResetEmailError] = useSendPasswordResetEmail(
        auth
    );

    const [token]=useToken(googleUser || user)

    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    let location=useLocation();
    let from = location.state?.from?.pathname || "/";
    if (googleLoading || loading || sending) {
        return <Loading></Loading>
    }

    if (token) {
        navigate(from, { replace: true });
    }
    
    let errorMessage;
    if (googleError || error || sendPasswordResetEmailError) {
        errorMessage = <p className='fs-4 text-red-600 font-bold'>{googleError?.message}</p>
    }


    const onSubmit = async (data) => {
        signInWithEmailAndPassword(data?.email, data?.password)
        setEmail(data?.email)
    };
    return (
        // <div>
        //     <div className='flex flex-row justify-center mt-10'>
        //         <div className="card md:w-4/5 lg:w-2/5 bg-base-100 shadow-xl">
        //             <h1 className='text-center text-accent-focus text-3xl font-bold mt-5'>Login</h1>
        //             <div className="card-body">
        //                 <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
        //                     <div className="form-control w-full max-w-xs">
        //                         <label className="label">
        //                             <span className="label-text font-bold">Email</span>
        //                         </label>
        //                         <input type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs"
        //                             {...register("email", {
        //                                 required: {
        //                                     value: true,
        //                                     message: 'Email is Required'
        //                                 },
        //                                 pattern: {
        //                                     value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        //                                     message: 'Provide a valid Email'
        //                                 }
        //                             })} />
        //                         <label className="label">
        //                             {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
        //                             {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
        //                         </label>
        //                     </div>
        //                     <div className="form-control w-full max-w-xs">
        //                         <label className="label">
        //                             <span className="label-text font-bold">Password</span>
        //                         </label>
        //                         <input
        //                             type="password" placeholder="Your Password" className="input input-bordered w-full max-w-xs"
        //                             {...register("password", {
        //                                 required: {
        //                                     value: true,
        //                                     message: 'Password is Required'
        //                                 },
        //                                 minLength: {
        //                                     value: 6,
        //                                     message: 'Must be 6 characters or longer'
        //                                 }
        //                             })} />
        //                         <label className="label">
        //                             {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
        //                             {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
        //                         </label>
        //                     </div>
        //                     {errorMessage}
        //                     <input className='btn w-10/12 max-w-xs text-white' type="submit" value='Login' />
        //                 </form>
        //                 <div className='flex flex-col items-center' >
        //                     <button onClick={() => signInWithGoogle()} className='btn btn-accent w-10/12' type='button'><span className='mr-3 text-4xl'><FcGoogle /></span> <span className='text-white font-bold'>Login</span> </button>
        //                     <p className='capitalize mt-5'>are you a new user?  <Link to='/signUp' className='text-accent-focus underline font-bold'>please sign up</Link></p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='flex justify-center items-center h-screen'>
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-center text-3xl font-bold uppercase">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input type="email" placeholder="Your Email" {...register("email", {
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
                            type="password" placeholder="Your Password" {...register("password", {
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
                    <input type="submit" value='Login' />
                </form>
                <p><small>New To Venia Cosmetic? <Link to='/signUp' className='text-primary'>Creat An New Account</Link> </small></p>
                <div className="divider">OR</div>
                <div className="card-actions justify-end">
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline btn-accent font-bold w-full max-w-xs text-white">Continue With Google</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;