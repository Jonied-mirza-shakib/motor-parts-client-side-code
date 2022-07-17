import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageParts = () => {
    const [parts, setParts] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:5000/parts',{
            method: 'GET',
            headers: {
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
              },
        })
            .then(res => res.json())
            .then(data => setParts(data))
    }, [])

    const navigateDetails = id => {
        console.log(id)
        navigate(`/dashboard/updateParts/${id}`)
    }
    const handledDelete = id => {
        console.log(id)
        const proceed = window.confirm('Are You Sure you want to delete')
        if (proceed) {
            const url = `http://localhost:5000/parts/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = parts.filter(part => part._id !== id)
                        setParts(remaining)
                    }
                })
        }
    }
    return (
        <div>
            <div className='mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    parts?.map(part => <div key={part._id} className="card lg:w-mx-lg bg-base-100 shadow-xl" >
                        <div className="card-body bg-primary text-white">

                            <img className='w-3/4 text-center m-auto' src={part.img} alt="" />
                            <h2 className='capitalize'>name:{part.name}</h2>
                            <p className='capitalize'>description:{part.description}</p>
                            <p className='capitalize'>price:{part.price}</p>
                            <p className='capitalize'>quantity:{part.quantity}</p>
                            <p className='capitalize'>minimum order quantity: {part.minimum_order_quantity}</p>
                            <button onClick={() => navigateDetails(part._id)} className='btn btn-accent' type='button'>Update</button>
                            <button onClick={() => handledDelete(part._id)} className='btn btn-accent' type='button'>DELETE</button>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default ManageParts;