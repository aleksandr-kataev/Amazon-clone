import React, { useEffect, useState } from 'react';
import { Header, Product } from '../index';
import { getDeals } from '../../util';
import './Deals.css';
const Deals = () => {
  const [dealsRender, setDealsRender] = useState(null);

  useEffect(() => {
    const retrieveDeals = async () => {
      const res = await getDeals();
      setDealsRender({
        updated: res.updated,
        products: [
          res.products.slice(0, 3),
          res.products.slice(3, 7),
          res.products.slice(7, 10),
        ],
      });
    };
    retrieveDeals();
  }, []);

  return (
    <>
      <Header />
      <div className='deals'>
        {dealsRender?.products.map((product, i) => (
          <div className='deals__row' key={i}>
            {product.map((item) => (
              <Product
                id={item.id}
                title={item.description}
                rating={item.reviewRating}
                price={item.offerPrice}
                image={item.imageUrl}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Deals;
