import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const securedRoute = (props) => {
  console.log('Props securedRoute===>', props.auth.isLoading);
  return (
    <Route
    //   path={props.path}
      render={(data) =>
        props.auth.isAuth && !props.auth.isLoading ? (
          <props.component {...data} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

securedRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(securedRoute);
