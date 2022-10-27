import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';

const UpdateProfile = () => {
    const { id } = useParams();
    const [update, setUpdate] = useState({});
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        fetch(`http://localhost:5000/profile/${id}`)
            .then(res => res.json())
            .then(data => setUpdate(data))
    }, [id])


    const handleSubmit = event => {
        event.preventDefault();
        const number = event.target?.PhoneNumber?.value;
        const address = event.target?.address?.value;
        let education = event.target?.education?.value;
        const information = { number, address, education }
        const url = `http://localhost:5000/profile/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(information),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data) {
                    alert('Your Information updated successfully')
                } else {
                    alert('Your Information updated field')
                }
            });
        event.target.reset();
    }

    return (
        <div>
            <h1 className='text-center text-3xl text-indigo-800 my-10'>Please Update Your Information</h1>
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
                            <input style={{ width: '330px' }} type="submit" value="UPDATED INFORMATION" className='btn btn-accent text-white' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;