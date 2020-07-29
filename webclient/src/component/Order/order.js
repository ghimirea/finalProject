import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrder, changeStatus } from '../Action/orders';
import { matchPath } from 'react-router';

const Order = ({ getOrder, location, orders: { orders }, changeStatus }) => {
  const match = matchPath(location.pathname, {
    path: '/orders/:id',
    exact: true,
    strict: false,
  });

  useEffect(() => {
    getOrder(match.params.id);
  }, [getOrder, match.params.id]); //! added that in place of []

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
          <hr />
          <h3 key={item._id}>PRICE PER POUND:{item.price_per_lb}</h3>
          <h3>QUANTITY:{item.quantity}</h3>
          <h3>TOTAL PRICE:{item.price_per_lb * item.quantity}</h3>
          <hr />
        </>
      ))}
      <button onClick={(event) => statusChange(event)}>
        Change Status of The Order
      </button>
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
