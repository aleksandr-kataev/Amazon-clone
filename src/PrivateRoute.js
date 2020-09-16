import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from './contextAPI/StateProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ user }] = useStateValue();
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
