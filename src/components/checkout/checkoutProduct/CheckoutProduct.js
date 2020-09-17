import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from '../../../contextAPI/StateProvider';
import { recurringStar } from '../../../util';
import FullStar from '../../../artifacts/svg/FullStar.svg';

const CheckoutProduct = ({ item, hideRemove }) => {
  const { id, title, price, image, rating } = item;
  const [{}, dispatch] = useStateValue();

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
        <p className='checkoutProduct__title'>
          {title.substring(0, 130)}
        </p>
        <div className='product__price'>
          <div className='product__priceContainer'>
            <span className='product__recurringPrice'>£</span>
          </div>
          <div className='product__priceContainer'>
            <span className='product__wholePrice'>
              {price.toString().split('.')[0]}
            </span>
          </div>
          <div className='product__priceContainer'>
            <span className='product__recurringPrice'>
              {'.'}
              {price.toString().split('.')[1] === undefined
                ? 0
                : price.toString().split('.')[1]}
            </span>
          </div>
        </div>
        <div className='product__rating'>
          {Array(Math.trunc(rating))
            .fill()
            .map((_, i) => (
              <div className='product__svgContainer'>
                <img src={FullStar} alt='rating' />
              </div>
            ))}
          {recurringStar(rating) && (
            <div className='product__svgContainer'>
              <img src={recurringStar(rating)} alt='rating' />
            </div>
          )}
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
