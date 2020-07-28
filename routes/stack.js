// In App.js in a new project

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Icon,
  Button,
  TopNavigation,
  Avatar,
  ApplicationProvider,
  TopNavigationAction,
  OverflowMenu, MenuItem, Layout
} from '@ui-kitten/components';
import * as eva from "@eva-design/eva";
import {default as theme} from '../theme.json';

import SignInScreen from '../screens/signIn'
import RootDrawer from "./drawer";
import {AuthContext} from '../contexts/userContext'

const DrawerIcon = (props) => (
  // <Icon name='menu-outline' {...props} />
  // <Avatar {...props} source={require('../assets/favicon.png')}/>
  <Avatar {...props} source={require('../assets/music.png')}/>
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
  const {isAuthenicated, toggleAuth} = React.useContext(AuthContext);

  // const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index) => {
    // setSelectedIndex(index);
    setVisible(false);
  };

  const onLogoutPress = ({ index }) => {
    toggleAuth({userName: '', title: '', isAuthenicated: false})
    setVisible(false);
  };

  const renderToggleButton = () => (
    <TopNavigationAction icon={DrawerIcon} onPress={() => setVisible(true)}/>
  );

  return (
    <Stack.Navigator
      // headerMode={'screen'}
      screenOptions={{
        headerTintColor: 'white',
        title: 'Cerebro',
        headerStyle: {backgroundColor: eva.dark["color-basic-700"]},
      }}
    >
      {isAuthenicated ? (
        <Stack.Screen
          name="Home"
          component={RootDrawer}
          options={({navigation}) => ({
            headerRight: () => (
              < OverflowMenu
                value={"left"}
                anchor={renderToggleButton}
                visible={visible}
                // selectedIndex={selectedIndex}
                onSelect={onItemSelect}
                onBackdropPress={() => setVisible(false)}
              >
                {/*<MenuItem title='Home'/>*/}
                {/*<MenuItem title='Details'/>*/}
                <MenuItem title='Logout' onPress={onLogoutPress}/>
              </OverflowMenu>
            ),
          })}
        />
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} options={{
          transitionSpec: {open: config, close: config,},
        }}/>
      )}
    </Stack.Navigator>
  )
}
