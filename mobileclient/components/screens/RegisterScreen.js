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

const RegisterScreen = () => {
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
        <Icon type="MaterialCommunityIcons" name="face-recognition" />
          <Text>Register</Text>
        </Button>
      </Content>
    </Container>
    // </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
