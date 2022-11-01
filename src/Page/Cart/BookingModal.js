import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { deleteShoppingCart } from '../../utilities/fakedb';
import './BookingModal.css'

const BookingModal = ({ allParts,setAllParts }) => {
    const [user] = useAuthState(auth);

    const handleOrder = event => {
        event.preventDefault()
        const name = event.target.name.value;
        const email = event.target.email.value;
        const number = event.target.number.value;
        const total = parseInt(event.target.total.value);
        const data = { name, email, number, total };
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setAllParts(null)
                deleteShoppingCart()            
            })
    }





    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleOrder} className='booking-form-validation'>
                        <div>
                            <label for="name">NAME</label>
                            <input type="text" name="name" placeholder='Your Name' />
                        </div>
                        <div>
                            <label for="email">EMAIL</label>
                            <input type="email" name="email" value={user?.email} readOnly />
                        </div>
                        <div>
                            <label for="number">NUMBER</label>
                            <input type="text" name="number" placeholder='Your Number' />
                        </div>
                        <div>
                            <label for="number">TOTAL</label>
                            <input type="text" name="total" value={allParts} readOnly />
                        </div>
                        <input type="submit" className='btn btn-success mt-10 w-full text-white text-xl' value="ORDER" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;