import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { auth } from './firebase';

import './App.css';
import {
  Home,
  Checkout,
  Login,
  Register,
  Stripe,
  Orders,
  Deals,
  Products,
} from './components';

import { useStateValue } from './contextAPI/StateProvider';
import { getProducts } from './util';

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const setProducts = async () => {
      const res = await getProducts();
      dispatch({
        type: 'GET_PRODUCTS',
        products: res,
      });
    };

    setProducts();

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
          <Route path='/products/:label' component={Products} />
          <Route path='/deals' component={Deals} />
          <Route path='/checkout' component={Checkout} />
          <PrivateRoute path='/payment' component={Stripe} />
          <PrivateRoute path='/orders' component={Orders} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
