import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, editProducts, deleteProduct } from '../Action/products';
import { Button, Typography } from '@material-ui/core';
import AddProducts from './addProducts';
import { matchPath } from 'react-router';

const Products = ({
  getProducts,
  auth,
  location,
  history,
  products: { products, isLoading },
  editProducts,
  deleteProduct,
}) => {
  console.log('HISTORY PRODUCT--->', history);
  // const match = matchPath(location.pathname, {
  //   path: '/products/:id',
  //   exact: true,
  //   strict: false,
  // });
  useEffect(() => {
    const y = getProducts();
    console.log('USEEFFECT PRODUCTS--->', y);
  }, [getProducts, editProducts]);
  if (!isLoading && products !== null) {
    console.log('PRODUCTS--->', products);
  }

  console.log('ISLOADING---->', isLoading);
  const removeProduct = (event, id) => {
    console.log('ID-->', id);
    deleteProduct(id);
    return <Redirect to={{ pathname: '/products' }} />;
  };

  const addProduct = (event) => {
    history.push('/products/add');
  };

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
          {/* <Link to={'/products/add'}> */}
          <Button variant='outlined' onClick={(event) => addProduct(event)}>
            Add Products
          </Button>
          {/* </Link> */}
        </div>
        <hr />
        {isLoading || products === null
          ? 'Loading.....'
          : products.Product.map((item) => (
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

                    <Button
                      type='submit'
                      variant='contained'
                      onClick={(event, item_id) =>
                        removeProduct(event, item._id)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                  <hr />
                </div>
              </>
            ))}
      </>
      {/* // )} */}
    </>
  );
};

Products.propTypes = {
  products: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
  editProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products,
});

export default connect(mapStateToProps, {
  getProducts,
  editProducts,
  deleteProduct,
})(Products);
