import {Keyboard, TextInput, SafeAreaView, TouchableWithoutFeedback, StyleSheet} from "react-native";
import * as React from "react";
import {Divider, Layout, TopNavigation, Text, Button, Icon} from '@ui-kitten/components';

export default function SettingsScreen({navigation}) {
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    console.log(text)
  }, [text])

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title='Detail' alignment='center'/>
      <Divider/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text appearance={"hint"} style={{marginBottom: 30}} category={"p1"}>{text}</Text>
          <TextInput style={styles.text}multiline onChangeText={setText} value={text} placeholder={"Type Something Here"}/>
          <Button
            onPress={() => navigation.toggleDrawer()}
            appearance={'outline'}
          >
            Toggle Drawer !!
          </Button>
        </Layout>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    borderBottomWidth: 3,
  }
});