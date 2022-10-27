import React from 'react';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle,} from 'react-firebase-hooks/auth';
import Loading from '../Loading/Loading'
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import './SignUp.css'

const SignUp = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
      const [token]=useToken(googleUser||user)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    if (googleLoading||loading) {
        return <Loading></Loading>
    }

    if (token) {
        navigate('/')
    }
let errorMessage;
    if(googleError||error){
        errorMessage=<p className='fs-4 text-red-600 font-bold'>{googleError?.message}</p>
    }

    const onSubmit = (data) => {
        console.log(data)
        createUserWithEmailAndPassword(data?.email,data?.password)
    };
    return (
        <div className='flex justify-center items-center h-screen my-20'>
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-center text-3xl font-bold uppercase">SIGN UP</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Name</span>
                        </label>
                        <input
                            type="text" placeholder="Your Name" {...register("name", {
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
                            type="email" placeholder="Your Email" {...register("email", {
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
                    <input type="submit" value='Signup' />
                </form>
                <p><small>Al ready have an account? <Link to='/login' className='text-primary'>Please Login</Link> </small></p>
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

export default SignUp;