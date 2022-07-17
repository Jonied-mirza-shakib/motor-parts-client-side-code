import React, { useEffect, useState } from 'react';
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';
const CheckoutForm = ({pay}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError,setCardError]=useState('');
    const [success,setSuccess]=useState('');
    const [proccessing,setProccessing]=useState(false);
    const [tranjactionId,setTranjactionId]=useState('');
    const [clientSecret, setClientSecret] = useState("");
    const {_id,order,name}=pay;

    useEffect(()=>{
      fetch('https://damp-castle-29212.herokuapp.com/create-payment-intent', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({order}),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  if(data?.clientSecret){
    setClientSecret(data.clientSecret)
}
})
    },[order])

    const handleSubmit=async (event)=>{
        event.preventDefault();
        if (!stripe || !elements) {
            return;
          }
          const card = elements.getElement(CardElement);

          if (card === null) {
            return;
          }
          const {paymentMethodError, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          setCardError(paymentMethodError?.message)
          setProccessing(true)
        //   confirm card payment method
        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: name,
                },
              },
            },
          );

          if(intentError){
            setCardError(intentError?.message)
            success('')
            setProccessing(false)
          }else{
            setCardError('')
            console.log(paymentIntent)
            setTranjactionId(paymentIntent.id)
            setSuccess('Congrats! Your payment is success')

            const payment={
              pay: _id,
              tranjactionId: paymentIntent.id
            }

            fetch(`https://damp-castle-29212.herokuapp.com/orders/${_id}`,{
              method:'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payment),
            }).then(res=>res.json())
            .then(data=>{
              setProccessing(false)
              console.log(data)
            })

          }


    }
    return (
  <>
        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-success btn-xs font-bold' type="submit" disabled={!stripe||!clientSecret}>
          Pay
        </button>
      </form>
      {
        cardError&&<p className='text-red-700 font-bold'>{cardError}</p>
      }
      {
        success&&<div className='text-green-700 font-bold'>
          <p>{success}</p>
          <p>Your TranjactionId is <span className='text-orange-700 font-bold'>{tranjactionId}</span> </p>
          </div>
      }
  </>
    );
};

export default CheckoutForm;