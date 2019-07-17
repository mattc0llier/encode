import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ loggedIn, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        console.log('props', props);
        console.log('Component', Component);
        console.log('loggedIn', loggedIn);
        console.log('render', render);
        return (rest.isLoggedIn ? (
          render ? render(props) : <Component {...props} {...rest} />
        ) : (
          <Redirect to='/login'/>
        ))
      }
      }
    />
  );
}

export default PrivateRoute;
