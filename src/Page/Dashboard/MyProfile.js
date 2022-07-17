import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const [profile, setProfile] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://damp-castle-29212.herokuapp.com/profile')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProfile(data)
            })
    }, [])

    const updateProfile = id => {
        console.log(id)
        navigate(`/dashboard/updateProfile/${id}`)
    }

    return (
        <div>
            <h1 className='text-center text-3xl text-indigo-800 my-10'>Well Come To Your Profile</h1>

            {
                profile?.map(profiles =>
                    <div key={profiles._id} className="card max-w-screen-lg bg-base-100 shadow-xl">
                        <div className='card-body text-center'>
                            <img style={{ width: '50%', margin: 'auto' }} src={profiles?.photoURL} alt="" />
                            <h2><span className='text-natural font-bold text-xl'>Name: </span> <span>{profiles?.name}</span></h2>
                            <h2><span className='text-natural font-bold text-xl'>Email: </span> <span>{profiles?.email}</span></h2>
                            <h2><span className='text-natural font-bold text-xl'>Number: </span> <span>{profiles?.number}</span></h2>
                            <h2><span className='text-natural font-bold text-xl'>Address: </span> <span>{profiles?.address}</span></h2>
                            <h2><span className='text-natural font-bold text-xl'>Education: </span> <span>{profiles?.education}</span></h2>
                            <button style={{ width: '300px', margin: 'auto' }} onClick={() => updateProfile(profiles._id)} className='btn btn-accent-focus' type='button'>Update Profile</button>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default MyProfile;