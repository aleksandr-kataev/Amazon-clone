import React from 'react';
import './Product.css';
import { useStateValue } from '../../contextAPI/StateProvider';

const Product = ({ id, title, image, price, rating }) => {
  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
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
  };
  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
          <small>£</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt='product' />

      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
};

export default Product;
