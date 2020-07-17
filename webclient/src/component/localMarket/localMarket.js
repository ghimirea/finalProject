import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../Action/orders';

const LocalMarket = ({ getOrders, auth, orders: { orders, isLoading } }) => {
  console.log('LOCALMARKET--->', orders);

  useEffect(() => {
    const y = getOrders();
    console.log('GETORDERS===>', y);
  }, [getOrders]);

  // const order_farmer =
  //   orders.length > 0 ? (
  //     orders.map((order) => {
  //       const { date, products, status, user, _id } = order;
  //       return (
  //         <ul key={_id}>
  //           <li>
  //             <span>
  //               <strong>Order ID:</strong>
  //             </span>
  //             <Link to={`/orders/${_id}`}>
  //               <span>
  //                 <strong>{_id}</strong>
  //               </span>
  //             </Link>
  //             <h4>Status: {status}</h4>
  //           </li>
  //           <hr />
  //         </ul>
  //       );
  //     })
  //   ) : (
  //     <h2>No Orders were found.....</h2>
  //   );

  const [state, setState] = useState('');
  // searchSpace = (event) => {
  //   let keyword = event.target.value;
  //   this.setState({ search: keyword });
  // };

  let order_filter = orders.filter((order) => {
    return order.status.toLowerCase().includes(state.toLowerCase())
      ? order
      : '';
  });
  console.log('FILTER--->', order_filter);

  return (
    <>
      {' '}
      {isLoading && orders === null ? (
        'Loading.......'
      ) : (
        <>
          <h1>
            Welcome to your online Farm. You have the following orders you need
            to satisfy.
          </h1>

          <input
            value={state}
            onChange={(event) => setState(event.target.value)}
            placeholder = "Search Order....."
          />

          <div>
            {orders.length > 0 ? (
              order_filter.map((order) => {
                const { date, products, status, user, _id } = order;
                return (
                  <ul key={_id}>
                    <li>
                      <span>
                        <strong>Order ID:</strong>
                      </span>
                      <Link to={`/orders/${_id}`}>
                        <span>
                          <strong>{_id}</strong>
                        </span>
                      </Link>
                      <h4>Status: {status}</h4>
                    </li>
                    <hr />
                  </ul>
                );
              })
            ) : (
              <h2>No Orders were found.....</h2>
            )}
          </div>
        </>
      )}
    </>
  );
};

LocalMarket.propTypes = {
  getOrders: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  orders: state.orders,
});

export default connect(mapStateToProps, { getOrders })(LocalMarket);
