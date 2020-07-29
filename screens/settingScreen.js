import {Keyboard, TextInput, SafeAreaView, TouchableWithoutFeedback, StyleSheet} from "react-native";
import * as React from "react";
import {Divider, Layout, TopNavigation, Text, Button, Icon, TopNavigationAction} from '@ui-kitten/components';

const DrawerIcon = (props) => (
  <Icon name='menu-outline' {...props} />
);

export default function SettingsScreen({navigation}) {

  const [text, setText] = React.useState('')

  React.useEffect(() => {
    console.log(text)
  }, [text])

  const DrawerAction = () => (
    <TopNavigationAction icon={DrawerIcon} onPress={() => navigation.toggleDrawer()}/>
  )

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*<TopNavigation style={GlobalStyles.header2} title='Detail' alignment='center' accessoryLeft={DrawerAction}/>*/}
      {/*<Divider/>*/}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={{flex: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text appearance={"hint"} style={{marginBottom: 30}} category={"p1"}>{text}</Text>
          <TextInput style={styles.text} multiline onChangeText={setText} value={text}
                     placeholder={"Type Something Here"}/>
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