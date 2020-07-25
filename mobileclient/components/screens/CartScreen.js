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

const CartScreen = ({ getCart, cart: { cart } }) => {
  useEffect(() => {
    getCart();
    if (cart) {
      setstate({ ...state, data: cart });
    }
  }, []);
  const [state, setstate] = useState({ data: [] });
  const [sum, setsum] = useState(0);
  const [modal, setModal] = useState({ show: false });

  console.log('GET CART STATE--->', state.data);
  console.log('CART___>', cart);

  const getPaid = (visible) => {
    setModal({ show: visible });
  };

  return (
    <View>
      {!cart.length <= 0 ? (
        <Text>Currently There are no items in your cart</Text>
      ) : (
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
                      <Text style={styles.msgTxt}>
                        Quantity:{item.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />

          <Text style={styles.nameTxt}>Total: {sum.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.checkout}
            onPress={() => getPaid(false)}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={false}>
            <View style={styles.popupOverlay}>
              <View style={styles.popup}>
                <View style={styles.popupContent}>
                  <ScrollView contentContainerStyle={styles.modalInfo}>
                    <Text style={styles.about}>Total:{sum.toFixed(2)}</Text>
                  </ScrollView>
                </View>
                <View style={styles.popupButtons}>
                  <TouchableOpacity
                    style={styles.checkout}
                    onPress={() => getPaid(false)}
                  >
                    <Text style={styles.modalText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { getCart })(CartScreen);

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
  modalText: {
    flex: 1,
    fontSize: 40,
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#eeeeee',
  },
  header: {
    backgroundColor: '#00CED1',
    height: 200,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    flex: 1,
  },
  detailContent: {
    top: 80,
    height: 500,
    width: Dimensions.get('screen').width - 90,
    marginHorizontal: 30,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  userList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row',
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#008080',
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
  about: {
    marginHorizontal: 10,
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: '#00000057',
    flex: 1,
    marginTop: 30,
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 250,
  },
  popupHeader: {
    marginBottom: 45,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  btnClose: {
    height: 20,
    backgroundColor: '#20b2aa',
    padding: 20,
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
