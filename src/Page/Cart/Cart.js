import React from 'react';
import './Cart.css'

const Cart = ({ cart,setAllParts }) => {
    let total = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity = quantity + product?.quantity;
        total = total + product.price * product?.quantity;
    }
    let shipping = parseInt(total * 5 / 100);
    let grandTotal = total + shipping;
    return (
        <div className='order-summery'>
            <h2>ORDER SUMMERY</h2>
            <p>TOTAL ITEM: {quantity}</p>
            <p>SUBTOTAL: ${total}</p>
            <p>SHIPPING ESTIMATE: ${shipping}</p>
            <h5>ORDER TOTAL: ${grandTotal}</h5>
            <label 
            htmlFor="my-modal-6" 
            className="btn btn-outline btn-secondary mt-20 w-full"
            onClick={()=>setAllParts(grandTotal)}
            >CONFIRM ORDER</label>           
        </div>
    );
};

export default Cart;