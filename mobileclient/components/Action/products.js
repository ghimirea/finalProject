import axios from 'axios';
import { GET_PRODUCTS, PRODUCTS_FAIL } from '../Action/types';

//! Get current farmer produts
export const getFarmerProducts = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/products/${id}`);
    console.log('FARMER\'S PRODUCTS BY ID---->', response.data.msg);

    dispatch({
      type: GET_PRODUCTS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      //   payload: { msg: error.response, status: error.response.status },
    });
  }
};

// //! Get particular products
// export const getProduct = (id) => async (dispatch) => {
//   try {
//     const response = await axios.get(`/product/${id}`);
//     console.log('GET SINGLE PRODUCT--->', response.data.msg);

//     dispatch({
//       type: GET_PRODUCT,
//       payload: response.data.msg,
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODUCTS_FAIL,
//       //   payload: { msg: error.response, status: error.response.status },
//     });
//   }
// };

