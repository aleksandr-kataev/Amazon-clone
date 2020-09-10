import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import './Subtotal.css';
import { useStateValue } from '../../../contextAPI/StateProvider';
import { getBasketTotal } from '../../../contextAPI/reducer';

const Subtotal = () => {
  const history = useHistory();
  const [{ basket }] = useStateValue();

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
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'£'}
      />

      <button onClick={(e) => history.push('/payment')}>
        Proceed to Checkout
      </button>
    </div>
  );
};
export default Subtotal;
