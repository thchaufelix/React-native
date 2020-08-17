// In App.js in a new project

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Avatar, TopNavigationAction, OverflowMenu, MenuItem, Icon} from '@ui-kitten/components';
import * as eva from "@eva-design/eva";

import SignInScreen from '../screens/signIn'
import RootDrawer from "./drawer";
import {AuthContext} from '../contexts/userContext'

const DrawerIcon = (props) => (
  <Avatar {...props} source={require('../assets/music.png')}/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
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
  // const [isLogin, setIsLogin] = React.useState(false);
  const {isAuthenicated, toggleAuth} = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index) => setVisible(false);


  const onLogoutPress = ({ index }) => {
    toggleAuth({token: '', isAuthenicated: false})
    setVisible(false);
  };

  const renderToggleButton = () => (
    <TopNavigationAction icon={DrawerIcon} onPress={() => setVisible(true)}/>
  );

  return (
    <Stack.Navigator
      headerMode = "screen"
    >
      {isAuthenicated ? (
        <Stack.Screen
          name="Home"
          component={RootDrawer}
          options={({navigation}) => ({
            title: 'Inspection',
            headerStyle: {backgroundColor: eva.dark["color-basic-300"]},
            headerRight: () => (
              < OverflowMenu
                value={"left"}
                anchor={renderToggleButton}
                visible={visible}
                onSelect={onItemSelect}
                onBackdropPress={() => setVisible(false)}
              >
                <MenuItem title='Logout' onPress={onLogoutPress} accessoryLeft={LogoutIcon}/>
              </OverflowMenu>
            ),
          })}
        />
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} options={{
          headerShown: false,
          transitionSpec: {open: config, close: config,},
        }}/>
      )}
    </Stack.Navigator>
  )
}
