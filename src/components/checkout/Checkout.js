import React from 'react';
import './Checkout.css';
import { Header, SubNav } from '../index';
import Subtotal from './subtotal/Subtotal';
import { useStateValue } from '../../contextAPI/StateProvider';
import CheckoutProduct from './checkoutProduct/CheckoutProduct';

const Checkout = () => {
  const [{ basket, user }] = useStateValue();
  return (
    <>
      <Header />
      <SubNav />
      <div className='checkout'>
        <div className='checkout__left'>
          <img
            className='checkout__ad'
            src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
            alt='ad'
          />

          <div>
            {user && <h3>Hello, {user?.email}</h3>}
            <h2 className='checkout__title'>Your shopping Basket</h2>
            {basket.map((item, i) => (
              <CheckoutProduct
                key={i}
                item={item}
                hideRemove={false}
              />
            ))}
          </div>
        </div>
        <div className='checkout__right'>
          <Subtotal />
        </div>
      </div>
    </>
  );
};

export default Checkout;
