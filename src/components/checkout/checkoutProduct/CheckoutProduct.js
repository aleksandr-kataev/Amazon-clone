import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from '../../../contextAPI/StateProvider';

const CheckoutProduct = ({ item, hideRemove }) => {
  const { id, title, price, image, rating } = item;
  const [state, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_ITEM',
      id,
    });
  };

  return (
    <div className='checkoutProduct'>
      <img
        className='checkoutProduct__image'
        alt='product'
        src={image}
      />

      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
          <small>£</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        {!hideRemove && (
          <button onClick={removeFromBasket}>
            Remove from basket
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
