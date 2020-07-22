import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import WelcomeScreen from '../screens/WelcomeScreen';
import CartScreen from '../screens/CartScreen'

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ImageBackground,
} from 'react-native';

import FarmerScreen from '../screens/FarmerScreen';

const DrawerNav = createDrawerNavigator();

export default function AuthenticatedScreen() {
  return (
    <DrawerNav.Navigator initialRouteName='DRAWER_HOME'>
      <DrawerNav.Screen
        name='DRAWER_HOME'
        component={WelcomeScreen}
        options={{ title: 'Home' }}
      />
      <DrawerNav.Screen
        name='DRAWER_CART'
        component={CartScreen}
        options={{ title: 'Your Cart' }}
      />
    </DrawerNav.Navigator>
  );
}
