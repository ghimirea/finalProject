import React from 'react';
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
  Icon
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

const LoginScreen = ({navigation:{navigate}}) => {
  return (
    // <SafeAreaView>
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
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
        <Button full iconLeft onPress={()=>navigate }>
        <Icon type="MaterialCommunityIcons" name="login" />
          <Text>Login</Text>
        </Button>
      </Content>
    </Container>
    // </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
