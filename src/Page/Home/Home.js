import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Banner from '../Banner/Banner'
import BusinessSummary from '../BusinessSummary/BusinessSummary';

const Home = () => {
    const navigate = useNavigate();
    const [tools, setTools] = useState([])
    const [review, setReview] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/parts',{
            method: 'GET',
            headers: {
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
              },
        })
            .then(res => res.json())
            .then(data => setTools(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/review',{
            method: 'GET',
            headers: {
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
              },
        })
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])

    const navigateDetails = id => {
        console.log(id)
        navigate(`/purchase/${id}`)
    }

    return (
        <div>
            <div>
                <Banner></Banner>
                <BusinessSummary></BusinessSummary>
            </div>
            <h2 className='text-center font-bold text-3xl my-10 text-indigo-500'>Our Popular Parts</h2>
            <div className="divider" style={{ maxWidth: '250px', margin: 'auto' }}></div>
            <div className='mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    tools?.slice(0,6).map(toolses => <div key={toolses._id} className="card lg:w-mx-lg bg-base-100 shadow-xl" >
                        <div className="card-body bg-primary text-white">

                            <img className='w-3/4 text-center m-auto' src={toolses.img} alt="" />
                            <h2 className='capitalize'>name:{toolses.name}</h2>
                            <p className='capitalize'>description:{toolses.description}</p>
                            <p className='capitalize'>price:{toolses.price}</p>
                            <p className='capitalize'>quantity:{toolses.quantity}</p>
                            <p className='capitalize'>minimum order quantity: {toolses.minimum_order_quantity}</p>
                            <button onClick={() => navigateDetails(toolses._id)} className='btn btn-accent' type='button'>purchase</button>
                        </div>
                    </div>
                    )
                }
            </div>
            <div className='flex justify-center mt-10'>
                <Link to='/parts'>
                    <button className='btn btn-accent text-white w-full text-2xl font-bold font-serif' type='button'>All Item</button>
                </Link>
            </div>
            <h2 className='text-center font-bold text-3xl my-10 text-indigo-500'>Our Customer Review</h2>
            <div className="divider" style={{ maxWidth: '300px', margin: 'auto' }}></div>
            <div className='mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    review?.slice(0,6).map(reviews => <div key={reviews._id} className="card lg:w-mx-lg bg-base-100 shadow-xl" >
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
            <div className='flex justify-center mt-10'>
                <Link to='/reviews'>
                    <button className='btn btn-accent text-white w-full text-2xl font-bold font-serif' type='button'>All Review</button>
                </Link>
            </div>
        </div >
    );
};

export default Home;