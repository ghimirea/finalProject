import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, editProducts } from '../Action/products';
import { Button, Typography } from '@material-ui/core';
import Modal from 'react-modal';

const Products = ({
  getProducts,
  auth,
  products: { products, isLoading },
  editProducts,
}) => {
  useEffect(() => {
    const y = getProducts();
    console.log('USEEFFECT PRODUCTS--->', y);
    
  }, [getProducts, editProducts]);
  if (!isLoading && products !== null) {
    console.log('PRODUCTS--->', products);
  }

  console.log('ISLOADING---->', isLoading);
  // const updateProduct = (event) => {
  //   return <Link to={`products/${products._id}`} />;
  // };

  return (
    <>
      {' '}
      {/* {isLoading || products === null ?
       (
        'Loading.......'
      ) : ( */}
      <>
        <div>
          <Typography variant='h1'>
            All your products are listed below
          </Typography>
        </div>
        <hr />
        {isLoading  || products === null ?  'Loading.....' :(
          products.Product.map((item) => (
            <>
              <div key={item._id}>
                <Typography variant='h6'> ID: {item._id}</Typography>
                <Typography variant='h6'> Type: {item.type}</Typography>
                <Typography variant='h6'>
                  Product: {item.product_name}
                </Typography>
                <Typography variant='h6'>
                  Quantity: {item.quantity_in_lb}
                </Typography>
                <Typography variant='h6'>
                  Price Per Pound: {item.price_per_lb}
                </Typography>
                <div>
                  <Link to={`products/${item._id}`}>
                    <Button variant='outlined'>Edit</Button>
                  </Link>
                  <Button variant='outlined'>Delete</Button>
                </div>
                <hr />
              </div>
            </>
          ))
        ) }
      </>
      {/* // )} */}
    </>
  );
};

Products.propTypes = {
  products: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
  editProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products,
});

export default connect(mapStateToProps, { getProducts, editProducts })(
  Products
);
