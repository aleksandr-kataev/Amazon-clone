import React from 'react';

import './Product.css';
import { useStateValue } from '../../contextAPI/StateProvider';
import { recurringStar } from '../../util';
import FullStar from '../svg/FullStar.svg';

const Product = ({
  id,
  title,
  image,
  price,
  rating,
  addItemNotification,
}) => {
  const [{}, dispatch] = useStateValue();

  const addToBasket = (e) => {
    dispatch({
      type: 'ADD_ITEM',
      item: {
        id,
        title,
        price,
        rating,
        image,
      },
    });
    addItemNotification(e);
  };
  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title.substring(0, 130)}</p>
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
      </div>
      <img src={image} alt='product' />

      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
};

export default Product;
