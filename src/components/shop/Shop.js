import React from 'react';
import { useStateValue } from '../../contextAPI/StateProvider';
import { Header, SubNav } from '../index';
import { Product } from '../index';
import './Shop.css';
const Shop = ({ match }) => {
  const [{ products }] = useStateValue();

  // if match included deals render deals otherise render products

  const category = products.find((cat) => {
    return cat.category_label === match.params.label;
  });

  return (
    <>
      <Header />
      <SubNav />
      <div className='shop'>
        {category?.products.map((product, i) => (
          <div className='shop__row' key={i}>
            {product.map((item) => (
              <Product
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;
