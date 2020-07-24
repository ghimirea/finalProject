import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const CartScreen = () => {
  const fetchData = async () => {
    const res = await axios.get('/users/farmers');
    console.log('FARMER SCREEN GET FARMERS----->', res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      <Text>Add to Cart Here</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
