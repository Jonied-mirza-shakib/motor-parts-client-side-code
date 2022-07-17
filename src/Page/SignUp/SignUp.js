import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init'
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../Loading/Loading'
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updatingError] = useUpdateProfile(auth);
    const [sendEmailVerification, sending, sendEmailVerificationError] = useSendEmailVerification(
        auth
    );
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [token]=useToken(user || googleUser)
    let errorMessage;
    if (loading || updating || sending || googleLoading) {
        return <Loading></Loading>
    }
    if (error || updatingError || sendEmailVerificationError || googleError) {
        errorMessage = <p className='text-red-800'> {error?.message || updatingError?.message}</p>
    }
    if (token) {
        navigate('/')
    }
    const onSubmit = async (data) => {
        console.log(data)
        await createUserWithEmailAndPassword(data?.email, data?.password)
        await sendEmailVerification()
        alert('sent email')
        await updateProfile({ displayName: data?.name });
        alert('Updated profile');
        reset()
    };
    return (
        <div className='flex flex-row justify-center mt-10'>
            <div className="card md:w-4/5 lg:w-2/5 bg-base-100 shadow-xl">
                <h1 className='text-center text-accent-focus text-3xl font-bold mt-5'>Sign Up</h1>
                <div className="card-body">
                    <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-bold">Name</span>
                            </label>
                            <input
                                type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    }
                                })} />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input
                                type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs"
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
                        <input className='btn w-full max-w-xs text-white' type="submit" value='SignUp' />
                    </form>
                    <div className='flex flex-col items-center'>
                        <button onClick={() => signInWithGoogle()} className='btn btn-accent w-10/12' type='button'><span className='mr-3 text-4xl'><FcGoogle /></span> <span className='text-white font-bold'>Sign Up</span> </button>
                        <p className='capitalize mt-5'>are you sure you have an account?<Link to='/login' className='text-accent-focus underline font-bold'>please login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;