import React, { useEffect, useState } from 'react';

const Reviews = () => {
    const [review, setReview] = useState([])
    useEffect(() => {
        fetch('https://damp-castle-29212.herokuapp.com/review',{
            method: 'GET',
            headers: {
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
              },
        })
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])
    return (
        <div>
            <h2 className='text-center font-bold text-3xl my-10 text-indigo-500'>Our Customer Review</h2>
            <div className="divider" style={{ maxWidth: '300px', margin: 'auto' }}></div>
            <div className='mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    review?.slice(0, 6).map(reviews => <div key={reviews._id} className="card lg:w-mx-lg bg-base-100 shadow-xl" >
                        <div className="card-body bg-primary text-white">
                            <img src={reviews.img} alt="" />
                            <h2><span className='capitalize font-bold'>name: </span>{reviews.name}</h2>
                            <p><span className='capitalize font-bold'>description: </span>{reviews.description}</p>
                            <p className='flex flex-row items-center'><span className='capitalize font-bold'>rating: </span> <span className='text-3xl text-white ml-2 mt-2'>{reviews.rating}</span> </p>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default Reviews;