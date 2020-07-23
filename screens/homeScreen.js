import * as React from "react";
import {SafeAreaView, Alert, TouchableHighlight} from 'react-native';
import {Divider, Layout, TopNavigation, Text, Button, Icon} from '@ui-kitten/components';

const FacebookIcon = (props) => (
  <Icon name='home' {...props} />
);

export default function HomeScreen({navigation}) {

  const onPressHandler = () => {
    console.log("updated")
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*<TopNavigation title='MyApp' alignment='center'/>*/}
      <Divider/>
      <Layout style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginBottom: 30}} category='h1'>Home!</Text>
        <Button
          appearance={'outline'}
          accessoryLeft={FacebookIcon}
          onPress={() => navigation.toggleDrawer()}
        >
        </Button>
      </Layout>

      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableHighlight onPress={onPressHandler}>
          <Text>
            Authenticate with Touch ID
          </Text>
        </TouchableHighlight>
      </Layout>

    </SafeAreaView>
  );
}