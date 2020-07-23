import SignInScreen from "../screens/signIn";
import * as React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export function SinginDrawer() {
  return (
    <Drawer.Navigator initialRouteName="SignIn">
      <Drawer.Screen
        name="SignIn"
        component={SignInScreen}
        // option={({route}) => {
        //
        // }}
      />
    </Drawer.Navigator>
  )
}