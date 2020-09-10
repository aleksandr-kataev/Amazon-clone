import React from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from '../../checkout/checkoutProduct/CheckoutProduct';
import './Order.css';

const Order = ({ order }) => {
  return (
    <div className='order'>
      <div className='order__title'>
        <h2>Order</h2>
        <p>
          {moment
            .unix(order.data.created)
            .format('MMMM Do YYYY, h:mma')}
        </p>
      </div>

      <div className='order__items'>
        {order.data.basket?.map((item) => (
          <CheckoutProduct item={item} hideRemove={true} />
        ))}
      </div>
      <CurrencyFormat
        renderText={(value) => (
          <h3 className='order__total'>Order Total : {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'£'}
      />
    </div>
  );
};

export default Order;
