import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllUsers, activeStatus, resetPassword } from '../Action/admin';
import { connect } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyle = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AllUsers = ({
  admin: { users, isLoading },
  getAllUsers,
  activeStatus,
  resetPassword,
  auth,
  history,
}) => {

  const classes = useStyle();

  useEffect(() => {
    const y = getAllUsers();
    
  }, [getAllUsers]);

  // const statusChange = (event, id) => {
  //   const g = activeStatus(id);
  // };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='right'>
                <Typography variant='h6'>ID</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Name</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Email</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Role</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Status</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Change Status</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Reset Password</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <>
                <TableRow key={item._id}>
                  <TableCell align='right' component='th' scope='row'>
                    {item._id}
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='h6'>{item.name}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='h6'>{item.email}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='h6'>{item.role}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='h6'>{item.Active}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      onClick={(event) => {
                        event.preventDefault();
                        activeStatus(item._id);
                        history.push('/localMarket');
                      }}
                    >
                      Change Status
                    </Button>
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(event) => {
                        resetPassword(item._id);
                        history.push('/localMarket');
                      }}
                    >
                      Reset Password
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>{' '}
        </Table>{' '}
      </TableContainer>
    </>
  );
};

AllUsers.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  activeStatus: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllUsers,
  activeStatus,
  resetPassword,
})(AllUsers);
