import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';



import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ImageBackground,
} from 'react-native';

import FarmerScreen from '../screens/FarmerScreen';
import FarmerProductScreen from '../screens/FarmerProductScreen';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const StackNav = createStackNavigator();

const ProductScreen = ({
  signOut,
  navigation: { navigate },
  auth: { isLoading, isAuth },
}) => {
  if (!isLoading && !isAuth) {
    navigate('STACK_LOGIN');
  } else {
  }
  return (
    <StackNav.Navigator initialRouteName='STACK_FARMER'>
      <StackNav.Screen
        name='STACK_FARMER'
        component={FarmerScreen}
        options={{ title: 'Home' }}
      />
      <StackNav.Screen
        name='STACK_PRODUCT'
        component={FarmerProductScreen}
        options={{ title: 'Products' }}
      />
    </StackNav.Navigator>
  );
};

ProductScreen.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProductScreen);
