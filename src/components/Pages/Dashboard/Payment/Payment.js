import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Jw5T5E4flQuO7rVYCzIlSbOteN1iRb2yuOo8FufKEqb2gqyR2kB7nQBqynjdw7ijRUgNEybPxFyK1ibm8C0B6Zk00O9W9ifGv');

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data))
    }, [appointmentId])
    return (
        <div>
            <h3>Hello { appointment.patientName}, Please pay for {appointment.serviceName}</h3>
            <h4>Pay: {appointment.price}$</h4>
            {
                appointment?.price && <Elements stripe={stripePromise}>
                    <CheckoutForm
                        appointment={appointment}
                    />
                </Elements> 
           }
        </div>
    );
};

export default Payment;