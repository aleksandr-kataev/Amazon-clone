import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSpring, animated as a } from 'react-spring';
import {
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';

import { db } from '../../firebase';
import axios from '../../axios';
import { useStateValue } from '../../contextAPI/StateProvider';
import './Payment.css';
import { Header } from '../index';
import CheckoutProduct from '../checkout/checkoutProduct/CheckoutProduct';
import { getBasketTotal } from '../../contextAPI/reducer';

const Payment = () => {
  const [{ user, basket }, dispatch] = useStateValue();

  const history = useHistory();

  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState(true);
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const fadeProps = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
  });

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
        setError(err.message);
      }
    };
    getClientSecret();
  }, [basket]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // eslint-disable-next-line no-unused-vars
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // getting the payment confirmation

        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: 'EMPTY_BASKET',
        });
        history.replace('/orders');
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <>
      <a.div style={fadeProps}>
        <Header />
        {user ? (
          <div className='payment'>
            <div className='payment__container'>
              <h1>
                Checkout (
                <Link to='/checkout'>
                  {basket?.length}{' '}
                  {basket.length < 2 ? 'item' : 'items'}
                </Link>
                )
              </h1>
              <div className='payment__section'>
                <div className='payment__title'>
                  <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                  <p>{user?.email}</p>
                  <p>123 React street</p>
                  <p>London, UK</p>
                </div>
              </div>
              <div className='payment__section'>
                <div className='payment__title'>
                  <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                  {basket.map((item) => {
                    const itemPrice = item.offerPrice
                      ? item.offerPrice
                      : item.price;
                    return (
                      <CheckoutProduct
                        item={{
                          ...item,
                          price: itemPrice,
                        }}
                        hideRemove
                      />
                    );
                  })}
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
                        displayType='text'
                        thousandSeparator
                        prefix='£'
                      />
                      <button
                        type='submit'
                        disabled={
                          processing || disabled || succeeded || error
                        }
                        className='payment__button'
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
        ) : (
          history.push('/login')
        )}
      </a.div>
    </>
  );
};

export default Payment;
