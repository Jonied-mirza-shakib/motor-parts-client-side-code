import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import auth from '../../firebase.init'
import { useAuthState } from 'react-firebase-hooks/auth';

const Purchase = () => {
    const { id } = useParams();
    const [user, userLoading, userError] = useAuthState(auth);
    const [order, setOrder] = useState();
    const { data: toolsId, isLoading } = useQuery(['part',], () =>
        fetch(`https://motor-parts-server-side-code-production.up.railway.app/parts/${id}`)
            .then(res => res.json())
    )
    if (isLoading || userLoading) {
        return <Loading></Loading>
    }
    const handleSubmit = event => {
        event.preventDefault();
        const name = user?.displayName;
        const email = user?.email;
        const number = event.target?.PhoneNumber?.value;
        const address = event.target?.address?.value;
        const order = event.target?.order?.value * parseInt(toolsId.price);
        let orderInformation = { name, email, number, address, order };
        // console.log(orderInformation)
        setOrder(order)
        const url = `https://motor-parts-server-side-code-production.up.railway.app/orders`;
        console.log(url)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(orderInformation),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.success) {
                    alert('Added order successfully');
                } else {
                    alert('Field to field Parts')
                }
            })
        event.target.reset();
    }


    return (
        <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-10'>
            <div className="card max-w-screen-lg bg-base-100 shadow-xl">
                <div className="card-body bg-primary text-white">
                    <img className='w-3/4 text-center m-auto mb-5' src={toolsId.img} alt="" />
                    <p className='capitalize'><span className='font-bold'>name: </span>{toolsId.name}</p>
                    <p className='capitalize'><span className='font-bold'>description: </span>{toolsId.description}</p>
                    <p className='capitalize'><span className='font-bold'>price: </span>{toolsId.price} (per pieces)</p>
                    <p className='capitalize'><span className='font-bold'>quantity: </span>{toolsId.quantity}</p>
                    <p className='capitalize'><span className='font-bold'>minimum order quantity: </span>{toolsId.minimum_order_quantity}</p>
                </div>
            </div>
            <div className="card max-w-screen-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input type="text" name="name" value={user?.displayName} className="input input-bordered w-full max-w-xs mb-5" disabled />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" name="email" value={user?.email} className="input input-bordered w-full max-w-xs mb-5" disabled />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Phone Number</span>
                            </label>
                            <input type="text" name="PhoneNumber" placeholder='Enter your Phone Number' required className="input input-bordered w-full max-w-xs mb-5" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Address</span>
                            </label>
                            <input type="text" name="address" placeholder='Enter your current address' required className="input input-bordered w-full max-w-xs mb-5" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Order</span>
                            </label>
                            <input type="text" name="order" placeholder='Enter your order quantity' required className="input input-bordered w-full max-w-xs mb-5" />
                            <p>total:{order}</p>
                        </div>
                        <input
                            type="submit" value="Order Now" className='btn btn-accent w-3/4 text-white' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Purchase;