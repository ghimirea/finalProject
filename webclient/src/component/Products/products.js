import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../Action/products';
import { Button, Typography } from '@material-ui/core';

const Products = ({ getProducts, auth, products: { products, isLoading } }) => {
  useEffect(() => {
    const y = getProducts();
    console.log('USEEFFECT PRODUCTS--->', y);
  }, [getProducts]);

  console.log('PRODUCTS--->', products);
  let table;
  let count = 1;

  //   response.forEach(element => {
  //     table +=
  //         ` <tr>
  // <td scope="col">${count++}</td>
  // <td scope="col" id="code">${element.isbn}</td>
  // <td scope="col" id="header">${element.title}</td>
  // <td scope="col" id="overdue">${element.overdueFee}</td>
  // <td scope="col" id="store">${element.publisher}</td>
  // <td scope="col" id="onDate">${element.datePublished}</td>
  // <td scope="col" id="edit"><a href="#" data-bookid="${element.bookId}" onclick="changeBook(${element.bookId})">Edit</a></td>
  // <td scope="col"><a data-toggle="modal" data-bookid="${element.bookId}" data-bookisbn="${element.isbn}" data-booktitle="${element.title}" href="#deleteBookModal">Delete</a></td>
  // </tr>

  return (
    <>
      {' '}
      {isLoading || products === null ? (
        'Loading.......'
      ) : (
        <>
          <div>
            <Typography variant='h1'>All your products are listed below</Typography>
          </div>
          {products.Product.map((item) => (
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
                  <Button variant='outlined'>Edit</Button>
                  <Button variant='outlined'>Delete</Button>
                </div>
                <hr />
              </div>
            </>
          ))}
          <div>
            <h1>{}</h1>
          </div>
        </>
      )}
    </>
  );
};

Products.propTypes = {
  products: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products,
});

export default connect(mapStateToProps, { getProducts })(Products);
