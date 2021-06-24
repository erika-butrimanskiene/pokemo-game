import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthenticationContext } from '../App';

//PAGES
import Login from './Login';

function ProtectedRoute({ children, ...rest }) {
  // CONTEXTS
  //-- authentification
  const auth = useContext(AuthenticationContext);

  return (
    <Route
      {...rest}
      render={() => {
        if (auth.authentication) {
          return children;
        } else {
          return <Login />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
