import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_KEY } from '../../config';
import Payment from './Payment';

const Stripe = () => {
  const promise = loadStripe(STRIPE_KEY);
  return (
    <Elements stripe={promise}>
      <Payment />
    </Elements>
  );
};

export default Stripe;
