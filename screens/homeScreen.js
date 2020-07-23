import * as React from "react";
import {SafeAreaView, Alert, TouchableHighlight} from 'react-native';
import {Divider, Layout, TopNavigation, Text, Button, Icon} from '@ui-kitten/components';

import ReactNativeBiometrics from 'react-native-biometrics'

const FacebookIcon = (props) => (
  <Icon name='home' {...props} />
);

export default function HomeScreen({navigation}) {

  const onPressHandler = () => {
    console.log("updated")
    ReactNativeBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const {available, biometryType} = resultObject

        if (available && biometryType === ReactNativeBiometrics.TouchID) {
          console.log('TouchID is supported')
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
          console.log('FaceID is supported')
        } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
          console.log('Biometrics is supported')
        } else {
          console.log('Biometrics not supported')
        }
      })
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