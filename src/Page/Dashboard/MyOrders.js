import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const MyOrders = () => {
    const [order, setOrder] = useState()
    const [user] = useAuthState(auth);
    useEffect(() => {
        if(user){
            fetch(`http://localhost:5000/orders?email=${user?.email}`,{
                method: 'GET',
                headers: {
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                  },
            })
                .then(res => res.json())
                .then(data => setOrder(data))
        }
      
    }, [user])

    const handleDelete=id=>{
        fetch(`http://localhost:5000/orders/${id}`, {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => {
    if(data?.deletedCount>0){
        const remaining=order.filter(orders=> orders._id !== id);
        setOrder(remaining)
    }
  })
    }

    return (
        <div>
            <h1 className='text-center text-3xl text-indigo-800 my-10'>Order Page</h1>
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            order?.map((orders, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{orders.name}</td>
                                    <td>{orders.number}</td>
                                    <td>${orders.total}</td>
                                    <td>
                                        {(orders.total && !orders.paid) && <Link to={`/dashboard/payment/${orders._id}`}> <button type="button" className='btn btn-success btn-xs'>pay</button> </Link>}
                                    </td>
                                    <td>
                                        {(orders.total && orders.paid) && <div>
                                            <span className='text-success'>paid</span>
                                            <br/>
                                            <span className='text-success'>Transaction Id:{orders.tranjactionId}</span>
                                        </div> }
                                    </td>
                                    <td> 
                                        {
                                            orders.tranjactionId ? <button disabled onClick={()=>handleDelete(orders._id)} type="button" className='btn btn-success btn-xs'>Delete</button>:<button onClick={()=>handleDelete(orders._id)} type="button" className='btn btn-success btn-xs'>Delete</button>
                                        } 
                                </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;