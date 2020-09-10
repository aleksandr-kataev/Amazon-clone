import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import axios from '../../axios';
import { useStateValue } from '../../contextAPI/StateProvider';
import './Payment.css';
import CheckoutProduct from '../checkout/checkoutProduct/CheckoutProduct';
import { getBasketTotal } from '../../contextAPI/reducer';

const Payment = () => {
  const [{ user, basket }] = useStateValue();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const res = await axios({
          method: 'post',
          // * 100 as Stripe expects (cents, pens, ...)
          url: `/payments/create?total=${
            getBasketTotal(basket) * 100
          }`,
        });
        if (!res) throw Error();
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.warn(err);
      }
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // getting the payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        history.replace('/orders');
      })
      .catch((e) => {
        setError(e);
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>
          )
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 React drive</p>
            <p>London, UK</p>
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map((item) => (
              <CheckoutProduct item={item} />
            ))}
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment methods</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'£'}
                />
                <button
                  disabled={processing || disabled || succeeded}
                >
                  <span>
                    {processing ? <p>Processing</p> : 'Buy Now'}
                  </span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
