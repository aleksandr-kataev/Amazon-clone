import React, { useEffect, useState } from 'react';
import { Header } from '../index';
import { Product } from '../index';
import { getDeals } from '../../util';
import './Deals.css';
const Deals = () => {
  const [deals, setDeals] = useState(null);

  useEffect(() => {
    const retrieveDeals = async () => {
      const res = await getDeals();
      setDeals({
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
        {deals ? (
          <div className='deals__products'>
            {deals?.products.map((product, i) => (
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
        ) : null}
      </div>
    </>
  );
};

export default Deals;
