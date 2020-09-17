import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import './Subtotal.css';
import { useStateValue } from '../../../contextAPI/StateProvider';
import { getBasketTotal } from '../../../contextAPI/reducer';

const Subtotal = ({ emptyBasketNotification }) => {
  const history = useHistory();
  const [{ basket }] = useStateValue();

  const handleCheckout = (e) => {
    if (basket.length < 1) {
      emptyBasketNotification(e);
      return;
    }
    history.push('/payment');
  };

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {basket.length > 0
                ? `Subtotal ${
                    basket.length < 2 ? 'item: ' : 'items: '
                  }`
                : `Empty Basket `}
              <strong>{value}</strong>
            </p>
            <div className='subtotal__gift'>
              <input type='checkbox' />{' '}
              <p>This order contains gift</p>
            </div>
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
