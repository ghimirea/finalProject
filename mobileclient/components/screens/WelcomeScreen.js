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

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const MaterialBottomNav = createMaterialBottomTabNavigator();

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require('../assets/farmerMarket.jpg')}
      >
        <View style={styles.textContainer}>
          <Text style={styles.logoText}>Local Online</Text>
          <Text style={styles.logoText}>
            Organic goodness from your Computer
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
