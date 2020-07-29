import React, {useState, useContext} from 'react'
import {
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
  Alert,
  ImageBackground,
  SafeAreaView
} from 'react-native'
import {AuthContext} from "../contexts/userContext";
import {Layout, Button, TopNavigationAction, Text, TopNavigation} from "@ui-kitten/components";
import axios from 'axios';
import * as eva from '@eva-design/eva';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SignInScreen({navigation}) {
  const {toggleAuth, userName} = React.useContext(AuthContext);

  const [username, setUsername] = React.useState(userName);
  const [password, setPassword] = React.useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/*<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>*/}
        <Layout style={{flex: 1}}>
          <ImageBackground source={require('../assets/bg_login.jpg')} style={styles.headerImage} resizeMode='cover'/>
          <Layout style={styles.container} level={"2"}>
            {/*<TopNavigation style={GlobalStyles.header} title='SIGN IN' alignment='center'/>*/}
            {/*<Divider/>*/}
            {/*<Layout style={styles.container}>*/}
            <Text style={{marginTop: 50, textAlign: "center", marginBottom: 20}} category={"h2"}>Cerebro Ltd.</Text>
            <Text style={styles.text}>Email: </Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.text}>Password: </Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {/*</Layout>*/}
            {/*<Layout style={styles.buttonContainer}>*/}
            <Button
              status={'info'}
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
                    Alert.alert("Somthing Wrong", "Wrong Password")
                  });
              }}>Sign in</Button>
            {/*</Layout>*/}

          </Layout>
        </Layout>
        {/*</KeyboardAvoidingView>*/}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: windowHeight * 0.005,
    // borderRadius: 15,
    borderBottomWidth: 1,
    marginVertical: windowHeight * 0.005,
    marginHorizontal: windowWidth * 0.1,
    textAlign: 'center',
    borderColor: '#333',
    color: "gray"
  },
  button: {
    marginTop: windowHeight * 0.1,
    marginBottom: windowHeight * 0.08,
    width: windowWidth * 0.45,
    alignSelf: 'center',
    borderRadius: 4
  },
  container: {
    marginHorizontal: windowWidth * 0.15,
    marginVertical: windowHeight * 0.22,
    borderRadius: 24,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    marginTop: 12,
    marginHorizontal: windowWidth * 0.1,
  },
  headerImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    opacity: 0.6,
  },
})