import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Parts = () => {
    const navigate = useNavigate();
    const [tools, setTools] = useState([])

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

    const navigateDetails = id => {
        console.log(id)
        navigate(`/purchase/${id}`)
    }

    return (
        <div>
            <h2 className='text-center font-bold text-3xl my-10 text-indigo-500'>Our Popular Parts</h2>
            <div className="divider" style={{ maxWidth: '250px', margin: 'auto' }}></div>
            <div className='mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    tools?.map(toolses => <div key={toolses._id} className="card lg:w-mx-lg bg-base-100 shadow-xl" >
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
        </div>
    );
};

export default Parts;