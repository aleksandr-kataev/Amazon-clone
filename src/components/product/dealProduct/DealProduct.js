import React from 'react';
import './DealProduct.css';
import { useStateValue } from '../../../contextAPI/StateProvider';
import { recurringStar } from '../../../util';
import FullStar from '../../svg/FullStar.svg';

const DealProduct = ({
  id,
  title,
  image,
  offerPrice,
  normalPrice,
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
        price: offerPrice,
        rating,
        image,
      },
    });
    addItemNotification(e);
  };

  return (
    <div className='dealProduct'>
      <div className='dealProduct__info'>
        <p>{title.substring(0, 130)}</p>
        <div className='dealProduct__price'>
          <div className='dealProduct__offeredPrice'>
            <div className='product__priceContainer'>
              <p className='dealProduct__recurringPrice'>£</p>
            </div>
          </div>
          <div className='dealProduct__priceContainer'>
            <span className='dealProduct__wholePrice'>
              {offerPrice.toString().split('.')[0]}
            </span>
          </div>
          <div className='dealProduct__priceContainer'>
            <span className='dealProduct__recurringPrice'>
              {'.'}
              {offerPrice.toString().split('.')[1] === undefined
                ? 0
                : offerPrice.toString().split('.')[1]}
            </span>
          </div>
          <div className='product__normalPrice'>
            <span>{normalPrice}</span>
          </div>
        </div>
        <div className='dealProduct__rating'>
          {Array(Math.trunc(rating))
            .fill()
            .map((_, i) => (
              <div className='dealProduct__svgContainer'>
                <img src={FullStar} alt='rating' />
              </div>
            ))}
          {recurringStar(rating) && (
            <div className='dealProduct__svgContainer'>
              <img src={recurringStar(rating)} alt='rating' />
            </div>
          )}
        </div>
      </div>
      <img src={image} alt='dealProduct' />

      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
};

export default DealProduct;
