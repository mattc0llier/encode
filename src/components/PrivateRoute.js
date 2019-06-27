import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ loggedIn, component: Component, path, render, ...rest }) {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        console.log('props', props);
        console.log('Component', Component);
        console.log('loggedIn', loggedIn);
        console.log('render', render);
        return (loggedIn ? (
          render ? render(props) : <Component {...props} />
        ) : (
          <Redirect to='/login'/>
        ))
      }
      }
    />
  );
}

export default PrivateRoute;
