import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cart from '../Cart/Cart';
import './SingleProduct.css'

const SingleProduct = () => {
    const { id } = useParams()
    const [part, setParts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/bestSeller/${id}`)
            .then(res => res.json())
            .then(data => setParts(data))
    }, [id])

    const handleAddToCart=product=>{
        console.log(product)
        const newCart=[...cart,product];
        setCart(newCart)
    }

    return (
        <div className='single-product-main'>
            <div className='cart-main grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20 mt-20'>
                <div>
                    <div className="card w-mx-w bg-base-100 shadow-xl">
                        <figure><img src={part.img} alt="" className='w-100' /></figure>
                        <div className="card-body text-center">
                            <h1 className='best-seller-title'>NAME: {part.name}</h1>
                            <p className='best-seller-price'>PRICE: ${part.price}</p>
                            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
                                <button type='button' className='btn btn-outline btn-primary text-xl'>-</button>
                                <button onClick={()=>handleAddToCart(part)} type='button' className='btn btn-outline btn-primary text-xl'>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card w-mx-w bg-base-100 shadow-xl">
                        <div className='card-body'>
                           <Cart cart={cart}></Cart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;