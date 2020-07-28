import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getProducts, editProducts, deleteProduct } from '../Action/products';
import { Button, Typography } from '@material-ui/core';

const Products = ({
  // getProducts,
  auth,
  location,
  history,
  farmer_products: { products, isLoading },
  editProducts,
  deleteProduct,
}) => {
  const dispatch = useDispatch();
  console.log('Products--->', products);
  useEffect(() => {
    (() => {
      const y = dispatch(getProducts());
      console.log('Inside useEffect--->', y);

      setstate({ ...state, data: products });
    })();
  }, []);

  console.log('AFTER useEffect');

  const [state, setstate] = useState({ data: [] });

  const removeProduct = (event, id) => {
    dispatch(deleteProduct(id));
    return <Redirect to={{ pathname: '/products' }} />;
  };

  const addProduct = (event) => {
    history.push('/products/add');
  };

  return (
    <>
      {' '}
      <>
        <div>
          <Typography variant='h1'>
            All your products are listed below
          </Typography>

          <Button variant='outlined' onClick={(event) => addProduct(event)}>
            Add Products
          </Button>
        </div>
        <hr />
        {isLoading && state.data === []
          ? 'No Products Found, Please Add Some'
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
  farmer_products: state.farmer_products,
});

export default connect(mapStateToProps, {
  getProducts,
  editProducts,
  deleteProduct,
})(Products);
