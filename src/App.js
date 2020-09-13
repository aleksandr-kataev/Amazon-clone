import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './App.css';
import {
  Home,
  Checkout,
  Login,
  Register,
  Payment,
  Orders,
  Shop,
} from './components';
import { STRIPE_KEY } from './config';
import { useStateValue } from './contextAPI/StateProvider';
import { getProducts, getDeals } from './util';

const promise = loadStripe(STRIPE_KEY);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    getDeals();
    const setProducts = async () => {
      const res = await getProducts();
      dispatch({
        type: 'GET_PRODUCTS',
        products: res,
      });
    };

    setProducts();
    // // Get Products
    // const products = db
    //   .collection('users')
    //   .doc('iQAkRAE9p9UejTQugfKGd665tBC2')
    //   .get();
    // console.log(products);

    // //Get deals
    // db.collection('deals')
    //   .doc('dealsDoc')
    //   .onSnapshot((snapshot) =>
    //     dispatch({
    //       type: 'GET_DEALS',
    //       deals: snapshot,
    //     }),
    //   );

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/products/:label' component={Shop} />
          <Route path='/deals/:label' component={Shop} />
          <Route path='/checkout' component={Checkout} />

          <Route path='/payment'>
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path='/orders' component={Orders} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
