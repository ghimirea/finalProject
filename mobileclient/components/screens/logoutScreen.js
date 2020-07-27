import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../Action/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const clearToken = async () => {
  await AsyncStorage.clear();
};

const logoutScreen = ({ signOut, navigation: { navigate } }) => {
  const logout = () => {
    signOut();
    clearToken();
    navigate('STACK_LOGIN');
  };
  return (
    <View>
      <Text>Are you sure you want to logout from the Farm</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text>Click Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut })(logoutScreen);

const styles = StyleSheet.create({});
