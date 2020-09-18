import React, { useEffect, useState, createRef } from 'react';
import {
  useTransition,
  useSpring,
  animated as a,
} from 'react-spring';
import NotificationSystem from 'react-notification-system';

import './Home.css';
import { getFeatured, addItemNotification } from '../../util';
import Product from '../product/Product';
import { Header } from '../index';

const Home = () => {
  const images = [
    'https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/gateway/placement/launch/All_Or_Nothing_Tottenham_Hotspur_S1/AONT_S1_GWBleedingHero_ENG_COVIDUPDATE_XSite_3000x1200_PV_en-GB._CB406302419_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/02/AmazonMusic/2020/Marketing/012020_AMHD_Q1/UK-EN_012020_AMUHD_Q1promo_OS_GW_Hero_D_3000x1200_2X_CV2A._CB426601587_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/02/kindle/journeys/N2IxYThmYzAt/N2IxYThmYzAt-MjVlNmIyZTUt-w3000._CB407941419_.jpg',
  ];

  const animatedImage = [
    ({ style }) => (
      <a.img className='home__image' src={images[0]} style={style} />
    ),
    ({ style }) => (
      <a.img className='home__image' src={images[1]} style={style} />
    ),
    ({ style }) => (
      <a.img className='home__image' src={images[2]} style={style} />
    ),
  ];

  const [index, setIndex] = useState(0);
  const fadeProps = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
  });
  const transitions = useTransition(index, (p) => p, {
    from: {
      opacity: 0,
      position: 'absolute',
      transform: 'translate3d(100%,0,0)',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(-100%,0,0)',
    },
  });

  const [featuredRender, setFeaturedRender] = useState(null);
  const notificationSystem = createRef();

  const handleNotification = (e) => {
    addItemNotification(e, notificationSystem);
  };

  useEffect(() => {
    const retrieveFeatured = async () => {
      const res = await getFeatured();
      setFeaturedRender([
        res.slice(0, 3),
        res.slice(3, 7),
        res.slice(7, 10),
      ]);
    };
    retrieveFeatured();
  }, []);

  useEffect(() => {
    const check = setInterval(() => {
      setIndex((state) => (state + 1) % 3);
    }, 5000);
    return () => clearInterval(check);
  });

  return (
    <>
      <Header />
      <a.div style={fadeProps}>
        {featuredRender && (
          <div className='home'>
            <NotificationSystem ref={notificationSystem} />
            <div className='home__slideShow'>
              {transitions.map(({ item, props, key }) => {
                const Image = animatedImage[item];
                return <Image key={key} style={props} />;
              })}
            </div>
            <div className='home__container'>
              {featuredRender?.map((product, i) => (
                <div className='deals__row' key={i}>
                  {product.map((item) => (
                    <Product
                      key={item.id}
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
            </div>
          </div>
        )}
      </a.div>
    </>
  );
};

export default Home;
