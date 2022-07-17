import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const AddProfileInformation = () => {
    const [user, loading] = useAuthState(auth);
    if (loading) {
        <Loading></Loading>
    }
    const handleSubmit = event => {
        event.preventDefault();
        const name = user?.displayName;
        const email = user?.email;
        const photoURL = user?.photoURL;
        const number = event.target?.PhoneNumber?.value;
        const address = event.target?.address?.value;
        let education = event.target?.education?.value;
        const information = { name, email, number, address, education, photoURL }
        console.log(information)
        fetch('https://damp-castle-29212.herokuapp.com/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(information),
        })
            .then(response => response.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Added Your profile information successfully');
                } else {
                    alert('Field to added Your profile information ')
                }
                event.target.reset()
            })
    }
    return (
        <div>
            <h1 className='text-center text-3xl text-indigo-800 my-10'>Please Add Your Information</h1>
            <div>
                <div className="card max-w-screen-lg bg-base-100 shadow-xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text font-bold">Name</span>
                                </label>
                                <input type="text" name="name" value={user?.displayName} className="input input-bordered w-full max-w-xs mb-5" disabled />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text font-bold">Email</span>
                                </label>
                                <input type="email" name="email" value={user?.email} className="input input-bordered w-full max-w-xs mb-5" disabled />
                            </div>

                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text font-bold">PhotoUrl</span>
                                </label>
                                <input type="text" name="photoURL" value={user?.photoURL} className="input input-bordered w-full max-w-xs mb-5" disabled />
                            </div>

                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text font-bold">Phone Number</span>
                                </label>
                                <input type="text" name="PhoneNumber" placeholder='Enter your Phone Number' required className="input input-bordered w-full max-w-xs mb-5" />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text font-bold">Address</span>
                                </label>
                                <input type="text" name="address" placeholder='Enter your current address' required className="input input-bordered w-full max-w-xs mb-5" />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text font-bold">Education</span>
                                </label>
                                <input type="text" name="education" placeholder='Enter you Education information' required className="input input-bordered w-full max-w-xs mb-5" />
                            </div>
                            <input style={{ width: '330px' }} type="submit" value="ADD INFORMATION" className='btn btn-accent text-white' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProfileInformation;