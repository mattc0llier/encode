import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (props.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to='/'/>
      ))
      }
    />
  );
}

export default PrivateRoute;
