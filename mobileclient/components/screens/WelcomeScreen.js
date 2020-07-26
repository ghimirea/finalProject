import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ImageBackground,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { AsyncStorage } from 'react-native';

const WelcomeScreen = ({ navigation: { navigate } }) => {
  

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          style={styles.background}
          source={require('../assets/farmerMarket.jpg')}
        >
          <View style={styles.textContainer}>
            <Text style={styles.logoText}>Welcome to Local Online</Text>
            <Text style={styles.logoText}>
              Organic goodness from your Computer
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 20,
  },
  loginButton: {
    width: '100%',
    height: 70,
    backgroundColor: 'tomato',
  },
  logoText: {
    fontFamily: 'Georgia-BoldItalic',
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  logout: {
    flexDirection: 'row',
    color: 'blue',

    position: 'relative',
    height: 30,
    fontSize: 20,
  },
  logoutTouch: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },

  registerButton: {
    width: '100%',
    height: 70,
    backgroundColor: 'green',
  },
  text: {
    fontFamily: 'Georgia-BoldItalic',
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    left: '50%',
  },

  textContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
});

export default WelcomeScreen;
