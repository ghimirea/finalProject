import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
} from 'native-base';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import FarmerScreen from './FarmerScreen';
import AuthenticatedScreen from '../auth/authenticatedScreen';
import { login, getUser } from '../Action/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

const LoginScreen = ({
  login,
  getUser,
  auth: { user, isAuth, isLoading },
  navigation: { navigate },
}) => {
  console.log('ISAUTH LOGIN--->', isAuth, user);
  useEffect(() => {
    const y = getUser();
    console.log('GET USER--->', y);
  }, [getUser]);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'Customer',
    Active: 'true',
  });

  const { email, password, role, Active } = loginData;

  const signIn = async (event) => {
    event.preventDefault();
    login(email, password, role, Active);
  };

  if (isAuth) {
    navigate('MATERIAL_HOME');
  }

  return (
    // <SafeAreaView>
    <Container>
      <Header />
      {/* <Left />
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header> */}
      <Content>
        <Form onSubmit={(event) => signIn(event)}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              onChangeText={(text) =>
                setLoginData({ ...loginData, email: text })
              }
              // value={email}
              name='email'
              id='email'
              autoCapitalize='none'
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={(text) =>
                setLoginData({ ...loginData, password: text })
              }
              value={password}
              name='password'
              id='password'
              autoCapitalize='none'
            />
          </Item>
          <Item floatingLabel>
            <Input disabled placeholder='Customer' />
          </Item>
        </Form>
        <Button
          type='submit'
          full
          iconLeft
          onPress={async () => {
            login({ email, password, role, Active });

            //   const header = {
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //   };

            //   const body = JSON.stringify({ email, password, role, Active });
            //   console.log('LOGIN BODY--->', body);

            //   console.log('Before AXIOS');
            //   const response = await axios.post('http://10.10.14.11:5000/auth', body, header);
            //   console.log('SIGNIN RES--->', response.data.msg);
          }}
        >
          <Icon type='MaterialCommunityIcons' name='login' />
          <Text>Login</Text>
        </Button>
        <TouchableOpacity
          style={styles.toRegister}
          onPress={() => navigate('MATERIAL_REGISTER')}
        >
          <Text style={{ color: 'orange' }}>
            Don't have an account...Click Here
          </Text>
        </TouchableOpacity>
      </Content>
    </Container>
    // </SafeAreaView>
  );
};
LoginScreen.prototypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, getUser })(LoginScreen);

const styles = StyleSheet.create({
  toRegister: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});
