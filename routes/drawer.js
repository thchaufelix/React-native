import HomeTabs from "./homeTag";
import SettingsScreen from "../screens/settingScreen";
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from "react";
import {StyleSheet} from 'react-native';
import {Drawer, DrawerItem, Layout, Avatar, IndexPath, MenuItem, Icon} from '@ui-kitten/components';

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

const {Navigator, Screen} = createDrawerNavigator();

const DrawerContent = ({navigation, state}) => (
  <Layout style={{flex: 1, paddingTop: 60}}>

    <Avatar style={styles.avatar} size='giant' source={require('../assets/favicon.png')}/>

    <Layout style={{flexDirection: 'row'}}>
      <MenuItem style={styles.text} accessoryLeft={InfoIcon} title='About'/>
      <MenuItem style={styles.text} accessoryLeft={LogoutIcon} title='Logout'/>
    </Layout>

    <Layout style={{flex: 8}}>
      <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}>
        <DrawerItem title='Home'/>
        <DrawerItem title='Notifications'/>
      </Drawer>
    </Layout>

  </Layout>
);

export default function RootDrawer() {
  return (
    <Navigator
      drawerContent={props => <DrawerContent {...props}/>}
      initialRouteName="Home"
      drawerPosition={'left'}
    >
      <Screen
        name="Home"
        component={HomeTabs}
      />
      <Screen
        name="Notifications"
        component={SettingsScreen}
      />
    </Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 8,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 150,
    height: 150
  },
  text: {
    flex: 1,
    textAlign: 'center',
    marginVertical: 10,
    borderRadius: 2
  }
});

