import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import Loading from '../Loading/Loading'


const stripePromise = loadStripe('pk_test_51L4fLCD15eCVhrzNkkD1sfSX6fDlCTxWEEHGvfPTnbV6eKH0iQ1Gqq5wkIlZNSHDSDmEb8ncfMRzfsIK7qyKFYKB0074WtiDi1');

const Payment = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/orders/${id}`
  const { data: pay, isLoading, refetch } = useQuery(['orders', id], () =>
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
  )

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <h2 className='text-success text-2xl'>Hello,{pay.name}</h2>
          <h2 className='text-success text-2xl'>Please Pay for ${pay.total}</h2>
        </div>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 my-12">
        <div class="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm pay={pay}></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;