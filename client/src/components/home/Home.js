import React from 'react';
import './Home.css';
import Product from '../product/Product';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__container'>
        <img
          className='home__image'
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
          alt=''
        />
      </div>

      <div className='home__row'>
        <Product
          title='Apple iPhone 11 (128GB) - Purple'
          price={729.0}
          image='https://images-na.ssl-images-amazon.com/images/I/71xn9bCRfhL._AC_SL1500_.jpg'
          rating={5}
        />
        <Product
          title='Fitbit Inspire Health & Fitness Tracker with Auto-Exercise Recognition'
          price={49.99}
          rating={2}
          image='https://images-na.ssl-images-amazon.com/images/I/61-Jst785NL._AC_SL1500_.jpg'
        />
        <Product
          title='Apple AirPods with Charging Case (wired)'
          price={129}
          image='https://images-na.ssl-images-amazon.com/images/I/71NTi82uBEL._AC_SL1500_.jpg'
          rating={4}
        />
        <Product
          title='
          Samsung Galaxy S10 Lite Mobile Phone; Sim Free Smartphone - Prism Black (UK version)'
          price={490.59}
          image='https://images-na.ssl-images-amazon.com/images/I/71LPPpQkoBL._AC_SL1500_.jpg'
          rating={5}
        />
      </div>

      <div className='home__row'>
        <Product
          title='Philips 346P1CRH Curved Monitor 83 cm (34 Inches)'
          price={653.29}
          rating={5}
          image='https://images-na.ssl-images-amazon.com/images/I/71YNJaywtQL._AC_SL1500_.jpg'
        />
        <Product
          title='Echo Dot - Smart speaker with Alexa - Sandstone Fabric'
          price={29.99}
          rating={4}
          image='https://images-na.ssl-images-amazon.com/images/I/61Ca1bFuAhL._AC_SL1000_.jpg'
        />
      </div>

      <div className='home__row'>
        <Product
          title='Microsoft Surface Laptop 3 Ultra-Thin 13.5” Touchscreen Laptop'
          price={878.99}
          rating={4}
          image='https://images-na.ssl-images-amazon.com/images/I/61h2bz5B3hL._AC_SL1500_.jpg'
        />
        <Product
          title='Sony PlayStation DualShock 4 Controller - Black'
          price={44.99}
          rating={5}
          image='https://images-na.ssl-images-amazon.com/images/I/71PYDxGDUiL._AC_SL1500_.jpg'
        />
        <Product
          title='
          New Apple MacBook Air 13-inch, 1.1GHz dual-core 10th-generation Intel Core i3 processor, 8GB RAM, 256GB '
          price={948.99}
          image='https://images-na.ssl-images-amazon.com/images/I/81vKT2GiQKL._AC_SL1500_.jpg'
          rating={4}
        />
      </div>
    </div>
  );
};

export default Home;
