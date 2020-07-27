import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { getCart } from '../Action/cart';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'native-base';
import { makeOrder } from '../Action/order';
// import authenticatedScreen from '../auth/authenticatedScreen';

const CartScreen = ({
  getCart,
  makeOrder,
  cart: { cart },
  order: { orders },
  navigation: { navigate },
}) => {
  const [state, setstate] = useState({ data: [] });
  const [sum, setsum] = useState(0);
  const [modal, setModal] = useState({ show: false });
  useEffect(() => {
    getCart();
    console.log('CART IN CARTSCREEN', cart);
    if (cart) {
      setstate({ ...state, data: cart });
    }
  }, [getCart]);

  console.log('GET CART STATE--->', state.data);
  console.log('CART___>', cart);

  const placeOrder = () => {
    makeOrder();
    setModal({ show: false });
    navigate('DRAWER_HOME');
  };

  return (
    <View>
      {/* {state.data.items.length === 0 ? (
        <Text>Currently There are no items in your cart</Text>
      ) : ( */}
      <>
        <FlatList
          data={state.data.items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            console.log('ITEMS___>', item.quantity, item.price_per_lb);
            let total = 0;
            total += item.quantity * item.price_per_lb;
            setsum(total);
            console.log('SUM-2--->', sum);
            return (
              <View style={styles.row}>
                <Image
                  source={require('../assets/farmerMarket.jpg')}
                  style={styles.pic}
                />
                <View>
                  <View style={styles.nameContainer}>
                    <Text
                      style={styles.nameTxt}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {item.product_name}
                    </Text>
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name='delete'
                        color='red'
                        size={26}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.msgContainer}>
                    <Text style={styles.msgTxt}>Quantity:{item.quantity}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />

        <Text style={styles.nameTxt}>
          Total: {state.data.items !== 0 ? sum.toFixed(2) : 0}
        </Text>
        <TouchableOpacity
          style={styles.checkout}
          onPress={() => {
            setModal({ show: true });
          }}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={modal.show}>
          <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                margin: 50,
                padding: 40,
                borderRadius: 20,
                flex: 1,
              }}
            >
              <Text
                style={{
                  marginLeft: 15,
                  fontWeight: '600',
                  color: '#222',
                  fontSize: 25,
                  width: 170,
                }}
              >
                Total:{sum.toFixed(2)}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  height: 50,
                  width: '100%',
                }}
                onPress={() => {
                  placeOrder();
                }}
              >
                <Text style={{ paddingLeft: '30%', fontSize: 40 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
      {/* )} */}
    </View>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  order: state.order,
});

export default connect(mapStateToProps, { getCart, makeOrder })(CartScreen);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
  checkout: {
    backgroundColor: 'green',
    height: 50,
  },
  checkoutText: {
    flex: 1,
    paddingLeft: '30%',
    fontSize: 40,
  },
});
