import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../contextAPI/StateProvider';

import './SubNav.css';

const SubNav = () => {
  const [{ products }] = useStateValue();
  console.log(products);
  return (
    <div className='subnav'>
      {products.map((category) => {
        return (
          <div className='subnav_item'>
            <Link
              to={`/products/${category.category_label}`}
              className='subnav_button'
            >
              {category.category_label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SubNav;
