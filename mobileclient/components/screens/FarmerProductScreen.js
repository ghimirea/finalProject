import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  TextInput,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { getFarmerProducts } from '../Action/products';
import { add_to_cart } from '../Action/cart';
import { Label, Item, Input } from 'native-base';

const FarmerProductScreen = ({
  route: { params },
  product: { products },
  cart:{cart},
  getFarmerProducts,
  add_to_cart,
}) => {
  const [product, setProduct] = useState({ data: [] });
  const [state, setState] = useState({ quanity: 0 });
  console.log('FARMER ID--->', params.id);
  console.log('STATE IN CART-->', state.quantity);

  useEffect(() => {
    getFarmerProducts(params.id);
    if (products) {
      setProduct({ ...product, data: products });
    }
  }, []);
  console.log('FARMER PRODUCT SCREEN----->', product.data);

  return (
    <View style={styles.container}>
      {!products ? (
        <Text>Currently there are no products listed</Text>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={product.data.Product}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item._id;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.text}>
                    <Text style={styles.price}>Type:{item.type}</Text>
                    <Text style={styles.price}>Name:{item.product_name}</Text>
                    <Text style={styles.price}>QTY:{item.quantity_in_lb}</Text>
                    <Text style={styles.price}>
                      Unit Price:{item.price_per_lb}
                    </Text>
                  </View>
                </View>

                <Image
                  style={styles.cardImage}
                  source={require('../assets/farmerMarket.jpg')}
                />

                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity
                        style={styles.socialBarButton}
                        onPress={() => {
                          console.log('Inside onPress add To cart');
                          add_to_cart(
                            params.id,
                            item._id,
                            item.product_name,
                            state.quantity,
                            item.price_per_lb
                          );
                        }}
                      >
                        <Image
                          style={styles.icon}
                          source={require('../assets/shopping_cart.png')}
                        />
                        <Text style={[styles.socialBarLabel, styles.buyNow]}>
                          ADD TO CART
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <Item>
                        <Input
                          placeholder='QTY'
                          onChangeText={(text) =>
                            setState({ ...state, quantity: text })
                          }
                          // value={email}
                          name='quantity'
                          id='quantity'
                          autoCapitalize='none'
                        />
                      </Item>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton}>
                        <Image
                          style={styles.icon}
                          source={require('../assets/Heart.png')}
                        />
                        <Text style={styles.socialBarLabel}>25</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  cart: state.cart,
});

export default connect(mapStateToProps, { getFarmerProducts, add_to_cart })(
  FarmerProductScreen
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  buyNow: {
    color: 'purple',
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //   text: {
  //     flex: 1,
  //     paddingTop: '100%',
  //     width: '100%',
  //     justifyContent: 'flex-end',
  //   },
});
