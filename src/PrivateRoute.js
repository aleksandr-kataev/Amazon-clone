/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useStateValue } from './contextAPI/StateProvider';
import { PrivateRoutePropTypes } from './types';

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
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = PrivateRoutePropTypes;

export default PrivateRoute;
