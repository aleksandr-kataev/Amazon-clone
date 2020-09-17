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
  const [, dispatch] = useStateValue();

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
  }, [dispatch]);

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route path='/products/:label' component={Products} />
          <Route exact path='/deals' component={Deals} />
          <Route exact path='/checkout' component={Checkout} />
          <PrivateRoute exact path='/payment' component={Stripe} />
          <PrivateRoute exact path='/orders' component={Orders} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
