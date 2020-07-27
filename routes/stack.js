// In App.js in a new project

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/signIn'
import RootDrawer from "./drawer";
import {default as theme} from '../theme.json';
import {Icon, Button} from '@ui-kitten/components';
import * as eva from "@eva-design/eva";
import {AuthContext} from '../contexts/userContext'

const DrawerIcon = (props) => (
  <Icon name='menu-outline' {...props} />
);

const Stack = createStackNavigator();

const config = {
  animation: 'stiffness',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};


export default function RootStack() {
  const [isLogin, setIsLogin] = React.useState(false);
  const {isAuthenicated} = React.useContext(AuthContext);

  return (
    <Stack.Navigator
      headerMode={'none'}
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: theme["color-primary-700"]},
      }}
    >
      {isAuthenicated ? (
        <Stack.Screen
          name="Home"
          component={RootDrawer}
          options={({navigation}) => ({
            title: ' This is Demo App',
            headerLeft: () => (
              <Button
                appearance='ghost'
                style={{margin: 3}}
                // variants={'primary'}
                accessoryLeft={DrawerIcon}
                onPress={() => navigation.toggleDrawer()}
              >
              </Button>
            ),
          })}
        />
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}/>
      )}
    </Stack.Navigator>
  )
}
