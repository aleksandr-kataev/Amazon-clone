import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../contextAPI/StateProvider';
import { Header, Product } from '../index';
import { getProducts } from '../../util';
import './Products.css';
const Products = ({ match }) => {
  const [{ products }, dispatch] = useStateValue();
  const [categoryRender, setCategoryRender] = useState(null);

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
  }, [match]);

  return (
    <>
      <Header />
      <div className='products'>
        {categoryRender ? (
          <div className='products__products'>
            {console.log(categoryRender)}
            {categoryRender?.map((product, i) => (
              <div className='products__row' key={i}>
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
        ) : null}
      </div>
    </>
  );
};

export default Products;
