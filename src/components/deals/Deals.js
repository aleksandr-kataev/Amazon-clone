import React, { useEffect, useState, createRef } from 'react';
import NotificationSystem from 'react-notification-system';
import { Header, Product } from '../index';
import { getDeals } from '../../util';
import './Deals.css';
const Deals = () => {
  const [dealsRender, setDealsRender] = useState(null);
  const notificationSystem = createRef();

  const addItemNotification = (e) => {
    e.preventDefault();
    const notification = notificationSystem.current;
    notification.addNotification({
      message: 'Item had been added',
      level: 'success',
      position: 'br',
    });
  };

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
      <NotificationSystem ref={notificationSystem} />
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
                addItemNotification={addItemNotification}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Deals;
