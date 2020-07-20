import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//let jwtDecode = require('jwt-decode');

const AdminRoute = ({
  auth: { user, isLoading, isAuth },
  component: Component,
  getUser,
}) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Route
      //   path={props.path}
      render={(data) =>
        isAuth && !isLoading && user.role === 'Admin' ? (
          <Component {...data} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
