import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllOrders } from '../Action/orders';
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
import Modal from 'react-modal';
import DateFormat from '../Moment/moment';

const useStyle = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AllOrder = ({ orders: { orders }, getAllOrders }) => {
  const classes = useStyle();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='right'>
                <Typography variant='h6'>Date</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Order ID</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Farmer ID</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Customer ID</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Order Status</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>Products</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((item) => (
              <>
                <TableRow key={item._id}>
                  <TableCell align='right' component='th' scope='row'>
                    <DateFormat date={item.date} />
                  </TableCell>
                  <TableCell align='right'>{item._id}</TableCell>
                  <TableCell align='right'>{item.farmer_id}</TableCell>
                  <TableCell align='right'>{item.user}</TableCell>
                  <TableCell align='right'>{item.status}</TableCell>
                  <TableCell align='right'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(event) => setModalOpen(true)}
                    >
                      Products
                    </Button>
                  </TableCell>
                </TableRow>

                <Modal isOpen={modalOpen}>
                  <Typography variant='h1'>Products</Typography>

                  {item.products.map((product) => {
                    return (
                      <>
                        <Typography variant='h6'>
                          Product ID: {product.prod_id}
                        </Typography>
                        <Typography variant='h6'>
                          Quantity: {product.quantity}
                        </Typography>
                        <Typography variant='h6'>
                          Price Per LB: {product.price_per_lb}
                        </Typography>
                        <Typography variant='h6'>
                          Sub-Total:{' '}
                          {(product.quantity * product.price_per_lb).toFixed(2)}
                        </Typography>

                        <hr />
                      </>
                    );
                  })}

                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setModalOpen(false)}
                  >
                    Close
                  </Button>
                </Modal>
              </>
            ))}
          </TableBody>{' '}
        </Table>{' '}
      </TableContainer>
    </>
  );
};

AllOrder.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, { getAllOrders })(AllOrder);
