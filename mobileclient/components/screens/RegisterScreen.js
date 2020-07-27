import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
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
import { authenticate } from '../Action/auth';
import setAlert from '../Action/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RegisterScreen = ({
  setAlert,
  authenticate,
  auth: { isAuth },
  navigation: { navigate },
}) => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Customer',
    Active: 'True',
  });

  const { name, email, password, confirmPassword, role, Active } = registerData;

  const onChange = (event) =>
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });

  // const signUp = async (event) => {
  //   event.preventDefault();
  //   if (password !== confirmPassword) {
  //   } else {
  //     authenticate({ name, email, password, role, Active });
  //   }
  // };
  if (isAuth) {
    navigate('STACK_HOME');
  }
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Register</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              autoCapitalize='none'
              onChangeText={(text) =>
                setRegisterData({ ...registerData, name: text })
              }
            />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize='none'
              onChangeText={(text) =>
                setRegisterData({ ...registerData, email: text })
              }
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              autoCapitalize='none'
              secureTextEntry
              onChangeText={(text) =>
                setRegisterData({ ...registerData, password: text })
              }
            />
          </Item>
          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input
              autoCapitalize='none'
              secureTextEntry
              onChangeText={(text) =>
                setRegisterData({ ...registerData, confirmPassword: text })
              }
            />
          </Item>
          <Item floatingLabel>
            <Input disabled placeholder='Customer' />
          </Item>
        </Form>
        <Button full iconLeft>
          <Icon
            type='MaterialCommunityIcons'
            name='face-recognition'
            onPress={(event) => {
              if (password !== confirmPassword) {
                Alert.alert('Passwords do not match');
              } else {
                authenticate({ name, email, password, role, Active });
                navigate('STACK_HOME');
              }
            }}
          />
          <Text>Register</Text>
        </Button>
        <TouchableOpacity
          style={styles.toLogin}
          onPress={() => navigate('STACK_LOGIN')}
        >
          <Text style={{ color: 'orange' }}>Have an account...Click Here</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

RegisterScreen.propTypes = {
  setAlert: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, authenticate })(
  RegisterScreen
);

const styles = StyleSheet.create({
  toLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});
