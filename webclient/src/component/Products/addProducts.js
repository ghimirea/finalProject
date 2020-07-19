// import React from 'react'
// import PropTypes from 'prop-types'

// const AddProducts = props => {
//     console.log("ADD PRODUCT PROPS====>", props)
//     return (
//         <div>
//             Hello Add the Product
//         </div>
//     )
// }

// AddProducts.propTypes = {

// }

// export default AddProducts

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';
import setAlert from '../Action/alert';
import PropTypes from 'prop-types';
import { addProduct } from '../Action/products';

const Styles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddProduct = ({
  auth,
  addProduct,
  history,
  products: { products, isLoading },
}) => {
  const classes = Styles();
  const [newProduct, setnewProduct] = useState({
    type: '',
    product_name: '',
    quantity_in_lb: null,
    price_per_lb: null,
  });

  const { type, product_name, quantity_in_lb, price_per_lb } = newProduct;
  const onChange = (event) =>
    setnewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });

  const createProduct = async (event) => {
    event.preventDefault();
    addProduct({ type, product_name, quantity_in_lb, price_per_lb });
    history.push('/products');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={(classes.paper, 'url')}>
        <div className='overimage'>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Add Product
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => createProduct(event)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='type'
                  name='type'
                  variant='outlined'
                  required={true}
                  fullWidth
                  value={type}
                  onChange={(event) => onChange(event)}
                  id='type'
                  label='Type'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={product_name}
                  onChange={(event) => onChange(event)}
                  id='product_name'
                  label='Product Name'
                  name='product_name'
                  autoComplete='product_name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={quantity_in_lb}
                  onChange={(event) => onChange(event)}
                  name='quantity_in_lb'
                  label='Quantity In LB'
                  type='quantity_in_lb'
                  id='quantity_in_lb'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={price_per_lb}
                  onChange={(event) => onChange(event)}
                  name='price_per_lb'
                  label='Price Per LB'
                  type='price_per_lb'
                  id='price_per_lb'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Add Product
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products,
});

export default connect(mapStateToProps, { addProduct })(AddProduct);
