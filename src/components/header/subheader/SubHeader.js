import React from 'react';
import { useHistory } from 'react-router-dom';
import './SubHeader.css';

const SubHeader = () => {
  const history = useHistory();
  return (
    <div className='subheader'>
      <div className='subheader__delivery'>
        <span className='subheader__optionOne'>Deliver to</span>
        <span className='subheader__optionTwo'>London, UK</span>
      </div>
      <div className='subheader__items'>
        <button
          id='subheader__deals'
          className='subheader__link'
          onClick={() => {
            history.push('/deals');
          }}
        >
          Latest Deals
        </button>
        <div className='subheader__item'>
          <button
            className='subheader__link'
            onClick={() => {
              history.push(`/products/books`);
            }}
          >
            Books
          </button>
        </div>
        <div className='subheader__item'>
          <button
            className='subheader__link'
            onClick={() => {
              history.push(`/products/computer_electronics`);
            }}
          >
            Computer & Electronics
          </button>
        </div>
        <div className='subheader__item'>
          <button
            className='subheader__link'
            onClick={() => {
              history.push(`/products/sports_outdoors`);
            }}
          >
            Sports & Outdoors
          </button>
        </div>
        <div className='subheader__item'>
          <button
            className='subheader__link'
            onClick={() => {
              history.push(`/products/health_beauty`);
            }}
          >
            Health & Beauty
          </button>
        </div>
        <div className='subheader__item'>
          <button
            className='subheader__link'
            onClick={() => {
              history.push(`/products/children_baby`);
            }}
          >
            Children & Baby
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
