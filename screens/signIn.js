import React, {useState, useContext} from 'react'
import {TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, Dimensions} from 'react-native'
import {AuthContext} from "../contexts/userContext";
import {Layout, Button, TopNavigationAction, Divider, TopNavigation} from "@ui-kitten/components";
import axios from 'axios';
import GlobalStyles from "../globals/styles";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SignInScreen({navigation}) {
  const {toggleAuth, userName} = React.useContext(AuthContext);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={{flex: 1}}>
        {/*<TopNavigation style={GlobalStyles.header} title='SIGN IN' alignment='center'/>*/}
        {/*<Divider/>*/}
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
            onPress={(e) => {
              e.preventDefault();
              axios.post("http://10.11.53.136:8000/api-token-auth/", {
                username: username,
                password: password
              })
                .then((response) => {
                  toggleAuth({
                    userName: username,
                    title: 'tester',
                    token: response.data.token,
                    isAuthenicated: true
                  });
                }, (error) => {
                  console.log("login fail");
                  alert("Wrong Password")
                });
            }}>Sign in</Button>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: windowHeight * 0.035,
  },
  button: {},
  container: {
    flex: 3,
    padding: windowWidth * 0.1,
  },
  buttonContainer: {
    flex: 6,
    paddingHorizontal: windowWidth * 0.25,
  },
})