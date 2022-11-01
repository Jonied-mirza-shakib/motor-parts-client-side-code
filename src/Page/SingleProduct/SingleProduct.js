import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addToDb, getStoredCart, removeFromDb } from '../../utilities/fakedb';
import BookingModal from '../Cart/BookingModal';
import Cart from '../Cart/Cart';
import './SingleProduct.css'

const SingleProduct = () => {
    const { id } = useParams()
    const [part, setParts] = useState([]);
    const [cart, setCart] = useState([]);
    const [allParts,setAllParts]=useState(null);
    useEffect(() => {
        fetch('http://localhost:5000/bestSeller')
            .then(res => res.json())
            .then(data => setParts(data))
    }, [])
    const singleParts = part?.find(parts => parts._id === id);

    useEffect(() => {
        const storedCart = getStoredCart();
        console.log(storedCart)
        const saveCart = [];
        for (const id in storedCart) {
            const addedProduct = part.find(products => products._id === id)
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct)
            }
        }
        setCart(saveCart)
    }, [part])



    const handleIncreaseBtn = selectedProduct => {
        let newCart = [];
        const exits = cart.find(allProduct => allProduct._id === selectedProduct._id)
        if (!exits) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        } else {
            const rest = cart.filter(allProduct => allProduct._id !== selectedProduct._id)
            exits.quantity = exits.quantity + 1;
            newCart = [...rest, exits]
        }
        setCart(newCart)
        addToDb(selectedProduct._id)
    }
    const handleDecreaseBtn = selectedProduct => {
        let newCart = [];
        const exits = cart.find(allProduct => allProduct._id === selectedProduct._id)
        if (!exits) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        } else {
            const rest = cart.filter(allProduct => allProduct._id !== selectedProduct._id)
            exits.quantity = exits.quantity - 1;
            newCart = [...rest, exits]
        }
        setCart(newCart)
        removeFromDb(selectedProduct._id)
    }

    return (
        <div className='single-product-main'>
            <div className='cart-main grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20 mt-20'>
                <div>
                    <div className="card w-mx-w bg-base-100 shadow-xl">
                        <figure><img src={singleParts?.img} alt="" className='w-100' /></figure>
                        <div className="card-body text-center">
                            <h1 className='best-seller-title'>NAME: {singleParts?.name}</h1>
                            <p className='best-seller-price'>PRICE: ${singleParts?.price}</p>
                            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
                            <button onClick={() => handleDecreaseBtn(singleParts)} type='button' className='btn btn-outline btn-primary text-xl decrease-button'>-</button>
                                <button onClick={() => handleIncreaseBtn(singleParts)} type='button' className='btn btn-outline btn-primary text-xl'>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card w-mx-w shadow-xl" style={{backgroundColor:"#F9FAFC"}}>
                        <div className='card-body'>
                            <Cart cart={cart} setAllParts={setAllParts}></Cart>
                        </div>
                    </div>
                </div>
            </div>
            {
            allParts&&<BookingModal allParts={allParts} setAllParts={setAllParts}></BookingModal>
           }
        </div>
    );
};

export default SingleProduct;