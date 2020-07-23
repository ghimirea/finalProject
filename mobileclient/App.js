import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './components/Store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ImageBackground,
} from 'react-native';

import axios from 'axios';

import WelcomeScreen from './components/screens/WelcomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import AuthenticatedScreen from './components/auth/authenticatedScreen';
import { getUser } from './components/Action/auth';
import { AsyncStorage } from 'react-native';
import authToken from './components/utils/authToken';

const StackNav = createStackNavigator();
const MaterialBottomNav = createMaterialBottomTabNavigator();

axios.defaults.baseURL = 'http://localhost:5000';

// const token = async () => {
//   const y = await AsyncStorage.token;
//   console.log(y);
// };

// if (AsyncStorage.token) {
//   authToken(AsyncStorage.token);
// }
// const y = store.dispatch(getUser());
// console.log('GETUSER 43---->', y);
 const App = () => {
  // useEffect(() => {
  //   const y = store.dispatch(getUser());
  //   console.log('APP.JS USEEFFECT====>', y);
  // }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNav.Navigator
          initialRouteName='MATERIAL_LOGIN'
          screenOptions={{
            headerLeft: null,
          }}
        >
          <StackNav.Screen
            name='STACK_LOGIN'
            component={LoginScreen}
            options={{
              title: 'Login',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name='login' color={color} size={26} />
              ),
            }}
          />
          <StackNav.Screen
            name='STACK_HOME'
            component={AuthenticatedScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name='home' color={color} size={26} />
              ),
            }}
          />
          <StackNav.Screen
            name='STACK_REGISTER'
            component={RegisterScreen}
            options={{
              title: 'Register',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name='face-recognition'
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </StackNav.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
