import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import WelcomeScreen from '../screens/WelcomeScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';

// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Button,
//   ImageBackground,
// } from 'react-native';

import ProductScreen from './productsScreen';
import logoutScreen from '../screens/logoutScreen';
import { signOut } from '../Action/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DrawerNav = createDrawerNavigator();

const AuthenticatedScreen = ({
  signOut,
  navigation: { navigate },
  auth: { isLoading, isAuth },
}) => {
  // if (!isLoading && !isAuth) {
  //   navigate('MATERIAL_LOGIN');
  // }
  return (
    <DrawerNav.Navigator initialRouteName='DRAWER_HOME'>
      <DrawerNav.Screen
        name='DRAWER_HOME'
        component={WelcomeScreen}
        options={{ title: 'Home' }}
      />
      <DrawerNav.Screen
        name='DRAWER_FARMER'
        component={ProductScreen}
        options={{ title: 'Farmers', headers: 'Farmers' }}
      />
      <DrawerNav.Screen
        name='DRAWER_CART'
        component={CartScreen}
        options={{ title: 'Your Cart' }}
      />
      <DrawerNav.Screen
        name='DRAWER_ORDER'
        component={OrderScreen}
        options={{ title: 'Order History' }}
      />
      <DrawerNav.Screen
        name='DRAWER_LOGOUT'
        component={logoutScreen}
        options={{ title: 'Logout' }}
      />
    </DrawerNav.Navigator>
  );
};

AuthenticatedScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut })(AuthenticatedScreen);
