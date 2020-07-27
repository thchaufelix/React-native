import React, {useState, useContext} from 'react'
import {TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native'
import {AuthContext} from "../contexts/userContext";
import {Layout, Button, TopNavigationAction, Divider, TopNavigation} from "@ui-kitten/components";


export default function SignInScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {toggleAuth} = React.useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={{flex: 1}}>
        <TopNavigation style={{marginTop: 10}} title='SIGN IN' alignment='center'/>
        <Divider/>
        <Layout style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Layout>
        <Layout style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => {
              toggleAuth({userName: username, title: 'tester', isAuthenicated: true})
              // navigation.navigate('Home')
            }}>Sign in</Button>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 20,
  },
  button: {},
  container: {
    flex: 3,
    padding: 50,
  },
  buttonContainer:{
    flex: 6,
    paddingHorizontal: 90,
  },
})