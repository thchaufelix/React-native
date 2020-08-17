import * as React from "react";
import {SafeAreaView, Alert, TouchableHighlight} from 'react-native';
import {Divider, Layout, Text, Button, Icon} from '@ui-kitten/components';

import {AuthContext} from "../contexts/userContext"
import PDFEditor from "../components/pdfEditor";


const FacebookIcon = (props) => (
  <Icon name='home' {...props} />
);

export default function HomeScreen({navigation}) {
  const {token} = React.useContext(AuthContext)
  const [pdfContent, setPdfContent] = React.useState("")

  const onPressHandler = async (e) => {
    e.preventDefault()
    console.log("updated!!")
    setPdfContent(PDFEditor())

    console.log(pdfContent)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*<TopNavigation title='MyApp' alignment='center'/>*/}
      {/*<Divider/>*/}
      <Layout style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
        {/*<Text style={{marginBottom: 30}} category='h1'>Home!</Text>*/}
        <Text style={{marginBottom: 10}} category='p1'>Your token: </Text>
        <Text style={{marginBottom: 30}} category='p1'>{token}</Text>
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