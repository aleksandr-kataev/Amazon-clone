import React, { useEffect, useState } from 'react';
import { useTransition, animated as a } from 'react-spring';
import './Home.css';
import Product from '../product/index';
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
  const transitions = useTransition(index, (p) => p, {
    from: {
      opacity: 0,
      position: 'absolute',
      transform: 'translate3d(100%,0,0)',
    },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
  });

  useEffect(() => {
    const check = setInterval(() => {
      setIndex((state) => (state + 1) % 3);
    }, 5000);
    return () => clearInterval(check);
  });

  return (
    <>
      <Header />
      <div className='home'>
        <div className='home__slideShow'>
          {transitions.map(({ item, props, key }) => {
            const Image = animatedImage[item];
            return <Image key={key} style={props} />;
          })}
        </div>

        <div className='home__container'>
          <div className='home__row'>
            <Product
              id='dg43fd'
              title='Apple iPhone 11 (128GB) - Purple'
              price={729.0}
              image='https://images-na.ssl-images-amazon.com/images/I/71xn9bCRfhL._AC_SL1500_.jpg'
              rating={5}
            />
            <Product
              id='f5ghq2'
              title='Fitbit Inspire Health & Fitness Tracker with Auto-Exercise Recognition'
              price={49.99}
              rating={2}
              image='https://images-na.ssl-images-amazon.com/images/I/61-Jst785NL._AC_SL1500_.jpg'
            />
            <Product
              id='oirb36'
              title='Apple AirPods with Charging Case (wired)'
              price={129}
              image='https://images-na.ssl-images-amazon.com/images/I/71NTi82uBEL._AC_SL1500_.jpg'
              rating={4}
            />
            <Product
              id='a6bsd5'
              title='
          Samsung Galaxy S10 Lite Mobile Phone; Sim Free Smartphone - Prism Black (UK version)'
              price={490.59}
              image='https://images-na.ssl-images-amazon.com/images/I/71LPPpQkoBL._AC_SL1500_.jpg'
              rating={3}
            />
          </div>

          <div className='home__row'>
            <Product
              id='8va21g'
              title='Philips 346P1CRH Curved Monitor 83 cm (34 Inches)'
              price={653.29}
              rating={5}
              image='https://images-na.ssl-images-amazon.com/images/I/71YNJaywtQL._AC_SL1500_.jpg'
            />
            <Product
              id='f6aqv3'
              title='Echo Dot - Smart speaker with Alexa - Sandstone Fabric'
              price={29.99}
              rating={4}
              image='https://images-na.ssl-images-amazon.com/images/I/61Ca1bFuAhL._AC_SL1000_.jpg'
            />
          </div>

          <div className='home__row'>
            <Product
              id='9m3vfd'
              title='Microsoft Surface Laptop 3 Ultra-Thin 13.5” Touchscreen Laptop'
              price={878.99}
              rating={4}
              image='https://images-na.ssl-images-amazon.com/images/I/61h2bz5B3hL._AC_SL1500_.jpg'
            />
            <Product
              id='af5bqu'
              title='Sony PlayStation DualShock 4 Controller - Black'
              price={44.99}
              rating={5}
              image='https://images-na.ssl-images-amazon.com/images/I/71PYDxGDUiL._AC_SL1500_.jpg'
            />
            <Product
              id='g6seqw'
              title='
          New Apple MacBook Air 13-inch, 1.1GHz dual-core 10th-generation Intel Core i3 processor, 8GB RAM, 256GB '
              price={948.99}
              image='https://images-na.ssl-images-amazon.com/images/I/81vKT2GiQKL._AC_SL1500_.jpg'
              rating={4}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
