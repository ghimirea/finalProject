import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { userLogs } from '../Action/logs';
import { Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import './styles.css';

const Logs = ({ auth, logs: { logs, isLoading } }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(userLogs());
    })();
  }, []);
  return (
    <div className='logs'>
      <Typography> {logs}</Typography>
    </div>
  );
};

Logs.propTypes = {
  userLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  logs: state.logs,
});

export default connect(mapStateToProps, { userLogs })(Logs);
