import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
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

const RegisterScreen = ({navigation:{navigate}}) => {
  return (
    // <SafeAreaView>
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
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Input disabled placeholder='Customer' />
          </Item>
        </Form>
        <Button full iconLeft>
          <Icon type='MaterialCommunityIcons' name='face-recognition' />
          <Text>Register</Text>
        </Button>
        <TouchableOpacity
          style={styles.toLogin}
          onPress={() => navigate('MATERIAL_LOGIN')}
        >
          <Text style={{ color: 'orange' }}>Have an account...Click Here</Text>
        </TouchableOpacity>
      </Content>
    </Container>
    // </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  toLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});
