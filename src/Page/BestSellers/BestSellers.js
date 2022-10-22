import React, { useEffect, useState } from 'react';
import './BestSellers.css'

const BestSellers = () => {
    const [parts, setParts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/bestSeller')
            .then(res => res.json())
            .then(data => setParts(data))
    }, [])
    return (
        <div className='best-seller-main'>
            <p className='best-seller-single-title'>TOP SALE ON THIS MONTH</p>
            <h1 className='best-seller-entry-title'>BEST SELLERS</h1>

            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
            {
                parts.map(part => <div key={part._id}>
                    <div className="card w-mx-w bg-base-100 shadow-xl">
                        <figure><img src={part.img} alt="" className='w-100' /></figure>
                        <div className="card-body">
                        <h1 className='best-seller-title'>NAME: {part.name}</h1>
                        <p className='best-seller-price'>PRICE: {part.price}</p>
                        <button type="button" className='btn btn-outline btn-primary'>ADD TO CART</button>
                        </div>
                    </div>
                </div>)
            }
            </div>
        </div>
    );
};

export default BestSellers;