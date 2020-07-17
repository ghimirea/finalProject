import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrder, changeStatus } from '../Action/orders';
import { matchPath } from 'react-router';
import { axios } from 'axios';

const Order = ({ getOrder, location, orders: { orders }, changeStatus }) => {
  //console.log('GETORDER--->', changeStatus);
  const match = matchPath(location.pathname, {
    path: '/orders/:id',
    exact: true,
    strict: false,
  });
  console.log('ORDERS--->', orders);
  //   let parameter = match.params.param;
  //   console.log('SLICED--->', parameter);
  useEffect(() => {
    const y = getOrder(match.params.id);
    console.log('Inside the useEffect in order-->', y);
    // const g = changeStatus(match.params.id);
    // console.log('ORDER CHANGE---->', g);
  }, [getOrder]);

  const statusChange = (event) => {
    changeStatus(match.params.id);
  };

  return (
    <>
      <h1>
        <strong>Order Details</strong>
      </h1>
      <h3>DATE OF PURCHASE: {orders[0].date}</h3>
      <h3>STATUS: {orders[0].status}</h3>
      {orders[0].products.map((item) => (
        <>
          <h3 key={item._id}>PRICE PER POUND:{item.price_per_lb}</h3>
          <h3>QUANTITY:{item.quantity}</h3>
          <h3>TOTAL PRICE:{item.price_per_lb * item.quantity}</h3>
          <button onClick={(event) => statusChange(event)}>
            Change Status of The Order
          </button>
        </>
      ))}
    </>
  );
};

Order.propTypes = {
  orders: PropTypes.object.isRequired,
  getOrder: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  orders: state.orders,
});
export default connect(mapStateToProps, { getOrder, changeStatus })(Order);
