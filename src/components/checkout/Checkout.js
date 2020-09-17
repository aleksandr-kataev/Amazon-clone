import React, { createRef } from 'react';
import NotificationSystem from 'react-notification-system';
import { useSpring, animated as a } from 'react-spring';

import './Checkout.css';
import { Header } from '../index';
import Subtotal from './subtotal/Subtotal';
import { emptyBasketNotification } from '../../util';
import { useStateValue } from '../../contextAPI/StateProvider';
import CheckoutProduct from './checkoutProduct/CheckoutProduct';

const Checkout = () => {
  const [{ basket, user }] = useStateValue();
  const fadeProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const notificationSystem = createRef();

  const handlNotification = (e) => {
    emptyBasketNotification(e, notificationSystem);
  };

  return (
    <>
      <Header />
      <a.div style={fadeProps}>
        <NotificationSystem ref={notificationSystem} />
        <div className='checkout'>
          <div className='checkout__left'>
            <img
              className='checkout__ad'
              src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
              alt='ad'
            />

            <div>
              {user && <h3>Hello, {user?.email}</h3>}
              <h2 className='checkout__title'>
                Your shopping Basket
              </h2>
              {basket.map((item, i) => {
                const itemPrice = item.offerPrice
                  ? item.offerPrice
                  : item.price;
                return (
                  <CheckoutProduct
                    key={i}
                    item={{ ...item, price: itemPrice }}
                    hideRemove={false}
                  />
                );
              })}
            </div>
          </div>
          <div className='checkout__right'>
            <Subtotal emptyBasketNotification={handlNotification} />
          </div>
        </div>
      </a.div>
    </>
  );
};

export default Checkout;
