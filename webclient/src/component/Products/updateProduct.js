import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { editProducts, getProduct } from '../Action/products';
import { matchPath } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UpdateProducts = ({
  //editProducts,
  location,
  farmer_products: { products, isLoading },
}) => {
  const dispatch = useDispatch();
  const classes = Styles();
  const match = matchPath(location.pathname, {
    path: '/products/:id',
    exact: true,
    strict: false,
  });

  useEffect(() => {
    (() => {
      const y = dispatch(getProduct(match.params.id));
      console.log('Dispatch--->', y, products.Product[0]);
    })();
  }, []);

  let prod = [];
  if (products.Product !== undefined) {
    prod = products.Product.filter(
      (item) => item._id.toString() === match.params.id
    );
  }
  console.log('PROD--->', prod);

  const [update, setUpdate] = useState({ data: products.Product });

  console.log('UPDATE STATE===>', update.data);

  const { type, product_name, quantity_in_lb, price_per_lb } = update.data[0];
  console.log(
    'UPDATE STATE ITEMS--->',
    type,
    product_name,
    quantity_in_lb,
    price_per_lb
  );

  const onChange = (event) => {
    console.log('EVENT====>', event)
    setUpdate(() => {
      return {
        ...update,
        [event.target.name]: event.target.value,
      };
    });
  };

  console.log('Outside onChange--->', update);

  const updateProduct = (event) => {
    event.preventDefault();

    (() => {
      dispatch(
        editProducts(match.params.id, {
          type,
          product_name,
          quantity_in_lb,
          price_per_lb,
        })
      );
    })();
  };

  return (
    <>
      {isLoading && products.Product.length > 1 ? (
        'Loading....'
      ) : (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={(classes.paper, 'url')}>
            <div className='overimage'>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Update Products
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={(event) => updateProduct(event)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      value={type}
                      onChange={(event) => onChange(event)}
                      id='type'
                      label='Type'
                      name='type'
                      autoComplete='type'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      value={product_name}
                      onChange={(event) => onChange(event)}
                      name='product_name'
                      label='Product Name'
                      type='product_name'
                      id='product_name'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='quantity_in_lb'
                      label='Quantity in LB'
                      name='quantity_in_lb'
                      contentEditable='true'
                      defaultValue={quantity_in_lb}
                      onChange={(event) => onChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='price_per_lb'
                      label='Price per LB'
                      name='price_per_lb'
                      defaultValue={price_per_lb}
                      contentEditable='true'
                      onChange={(event) => onChange(event)}
                    />
                  </Grid>
                </Grid>
                <Link to={'/products'}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    onClick={(event) => updateProduct(event)}
                  >
                    Edit
                  </Button>
                </Link>
              </form>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

UpdateProducts.propTypes = {
  editProducts: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  farmer_products: state.farmer_products,
});

export default connect(mapStateToProps, { editProducts, getProduct })(
  UpdateProducts
);
