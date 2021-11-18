import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CircularProgress } from '@mui/material';
const CheckoutForm = ({ appointment }) => {
    const { price, patientName, _id } = appointment;
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [price])

    const handleSubmit = async e => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        setProcessing(true);
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        //payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: user.email
                    },
                },
            },
        );
        if (intentError) {
            setSuccess('')
            setError(intentError.message);
        }
        else {
            setError('');
            setSuccess('Your payment processed succesfully')
            console.log(paymentIntent);
            setProcessing(false);

            //save to database

            const payment = {
                amount: paymentIntent.amount,
                transaction: paymentIntent.client_secret.slice('_secret')[0],
                last4: paymentMethod.card.last4,
                created: paymentIntent.created
            }
            const url = `http://localhost:5000/appointments/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(payment),
            })
                .then(res => res.json())
            .then(data=>console.log(data))
        }


    }
    return (
        <div>
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
                {
                    processing  ? <CircularProgress /> : <button type="submit" disabled={!stripe || success}>
                        Pay ${price}
                    </button>
                }
            </form>
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
            {
                success && <p style={{ color: 'green' }}>{success}</p>
            }
        </div>
    );
};

export default CheckoutForm;