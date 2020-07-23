import React, {useState} from 'react'
import {
  Button, View, TouchableOpacity, TextInput
} from 'react-native'


export default function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/*<Button title="Sign in" onPress={() => signIn({ username, password })} />*/}
    </View>
  );
}
