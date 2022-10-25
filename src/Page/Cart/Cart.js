import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    let total=0;
    for(const product of cart){
        total=total+product.price;
    }
    let shipping= parseInt(total*5/100);
    let grandTotal= total+shipping;
    return (
        <div>
             <h2>ORDER SUMMERY</h2>
             <p>TOTAL ITEM: {cart.length}</p>
             <p>TOTAL PRICE: {total}</p>
             <p>TOTAL SHIPPING PRICE: {shipping}</p>
             <h5>GRAND TOTAL: {grandTotal}</h5>
        </div>
    );
};

export default Cart;