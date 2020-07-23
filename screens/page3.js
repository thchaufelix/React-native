import {Button, Layout, Text} from "@ui-kitten/components";
import {TextInput, TouchableWithoutFeedback} from "react-native";
import * as React from "react";


export default function Page3() {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text appearance={"hint"} style={{marginBottom: 30}} category={"p1"}>This is Page 3</Text>
    </Layout>
  )
}