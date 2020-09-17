import React, { useEffect, useState, createRef } from 'react';
import NotificationSystem from 'react-notification-system';
import { useSpring, animated as a } from 'react-spring';

import './Products.css';
import { useStateValue } from '../../contextAPI/StateProvider';
import { Header } from '../index';
import Product from '../product/Product';
import { getProducts, addItemNotification } from '../../util';

const Products = ({ match }) => {
  const [{ products }, dispatch] = useStateValue();
  const [categoryRender, setCategoryRender] = useState(null);

  const notificationSystem = createRef();
  const fadeProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const handleNotification = (e) => {
    addItemNotification(e, notificationSystem);
  };

  useEffect(() => {
    if (!products) {
      const retrieveProducts = async () => {
        const res = await getProducts();
        dispatch({
          type: 'GET_PRODUCTS',
          products: res,
        });
      };

      retrieveProducts();
    }
    const category = products.filter(
      (product) => product.category_label === match.params.label,
    );
    setCategoryRender([
      category.slice(0, 3),
      category.slice(3, 7),
      category.slice(7, 10),
    ]);
  }, [match, dispatch, products]);

  return (
    <>
      <Header />
      <a.div style={fadeProps}>
        <NotificationSystem ref={notificationSystem} />
        <div className='products'>
          {categoryRender ? (
            <>
              {categoryRender?.map((product, i) => (
                <div className='products__row' key={i}>
                  {product.map((item) => (
                    <Product
                      id={item.id}
                      title={item.title}
                      rating={item.rating}
                      price={item.price}
                      image={item.image}
                      addItemNotification={handleNotification}
                      deal={false}
                    />
                  ))}
                </div>
              ))}
            </>
          ) : null}
        </div>
      </a.div>
    </>
  );
};

export default Products;
