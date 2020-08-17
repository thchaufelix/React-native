import {Button, Layout, Text} from "@ui-kitten/components";
import {TextInput, TouchableWithoutFeedback, Image, StyleSheet, View} from "react-native";
import * as React from "react";

import Signature from 'react-native-signature-canvas';


export const SignatureScreen = () => {
  const [signature, setSign] = React.useState(null);

  const handleSignature = signature => {
    console.log(signature);
    setSign(signature);
  };

  const handleEmpty = () => {
    console.log('Empty');
  }

  const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;
  return (
    <Layout style={{ flex: 1 }}>
      <View style={styles.preview}>
        {signature ? (
          <Image
            resizeMode={"contain"}
            style={{ width: 335, height: 114 }}
            source={{ uri: signature }}
          />
        ) : null}
      </View>
      <Signature
        onOK={handleSignature}
        onEmpty={handleEmpty}
        descriptionText="Sign"
        clearText="Clear"
        confirmText="Save"
        webStyle={style}
      />
    </Layout>
  );
}

export default function Page2() {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/*<Text appearance={"hint"} style={{marginBottom: 30}} category={"p1"}>This is Page 2</Text>*/}
      <SignatureScreen />
    </Layout>
  )
}


const styles = StyleSheet.create({
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  }
});

