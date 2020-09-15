import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import './Subtotal.css';
import { useStateValue } from '../../../contextAPI/StateProvider';
import { getBasketTotal } from '../../../contextAPI/reducer';

const Subtotal = () => {
  const history = useHistory();
  const [{ basket }] = useStateValue();
  const [error, setError] = useState(null);

  const handleCheckout = () => {
    if (basket.length < 1) {
      setError('Empty basket');
    }
  };

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):{' '}
              <strong>{value}</strong>
            </p>
            <div className='subtotal__gift'>
              <input type='checkbox' />{' '}
              <p>This order contains gift</p>
            </div>
            <span className='subtotal__error'>{error}</span>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'£'}
      />

      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};
export default Subtotal;
