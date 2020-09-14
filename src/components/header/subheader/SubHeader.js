import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../../contextAPI/StateProvider';

import './SubHeader.css';

const SubHeader = () => {
  const [{ products }] = useStateValue();
  return (
    <div className='subheader'>
      <div className='subheader__delivery'>
        <span className='subheader__optionOne'>Deliver to</span>
        <span className='subheader__optionTwo'>London, UK</span>
      </div>
      <div className='subheader__items'>
        <button id='subheader__deals' className='subheader__link'>
          Latest Deals
        </button>

        {products.map((category) => {
          return (
            <div className='subheader__item'>
              <button className='subheader__link'>
                {category.category_label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubHeader;
