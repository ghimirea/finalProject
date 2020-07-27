import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getOrder } from '../Action/order';
import { Container, Header, Item, Input, Icon, Button } from 'native-base';

const OrderScreen = ({ getOrder, order: { orders } }) => {
  const [orderState, setOrder] = useState({ data: [] });
  const [sum, setSum] = useState(0);
  const [state, setState] = useState({ search: '' });

  useEffect(() => {
    getOrder();

    setOrder({ ...orderState, data: orders });
    console.log('Inside Order History use effect-->', orderState.data);
  }, []);

  const handleSearch = (text) => {
    const filteredList = orderState.data.filter((list) => {
      let stateStatus = list.status.toLowerCase();
      let searchStatus = text.toLowerCase();
      return stateStatus.includes(searchStatus);
    });
    

    setState({ ...state, search: filteredList });
    console.log("Filtered list-->", state.search)
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Order History</Text>

        <Header searchBar rounded>
          <Item>
            <Icon name='ios-search' />
            <Input
              placeholder='Search'
              value={state.search}
              //! removed Text
              onChangeText={(text) => {
                handleSearch(text);
              }}
            />
            <Icon name='ios-people' />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </View>

      <FlatList
        data={state.search}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text>Order ID:{item._id}</Text>
                <Text>Date of Purchase: {item.date}</Text>
                <Text>Status of Order:{item.status}</Text>
                <Text>Total:{sum.toFixed(2)}</Text>
              </View>
              <FlatList
                data={item.products}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => {
                  return <View style={styles.separator} />;
                }}
                renderItem={({ item }) => {
                  let total = 0;
                  total += item.quantity * item.price_per_lb;
                  setSum(total);
                  return (
                    <View>
                      <Text style={styles.prod}>
                        Product Name:{item.product_name}
                      </Text>
                      <Text style={styles.prod}>Quantity:{item.quantity}</Text>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, { getOrder })(OrderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'green',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  list: {
    paddingHorizontal: 17,
    backgroundColor: '#E6E6E6',
  },
  prod: {
    fontFamily: 'Courier New',
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 10,
  },
  text: {
    fontFamily: 'Courier New',
    fontStyle: 'italic',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
