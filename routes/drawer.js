import HomeTabs from "./homeTag";
import SettingsScreen from "../screens/settingScreen";
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from "react";
import {StyleSheet} from 'react-native';
import {Drawer, DrawerItem, Layout, Avatar, IndexPath, MenuItem, Icon, Text} from '@ui-kitten/components';
import {AuthContext} from "../contexts/userContext";

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

const {Navigator, Screen} = createDrawerNavigator();

function DrawerContent({navigation, state}) {
  const {userName, title, toggleAuth} = React.useContext(AuthContext)

  return (
    <Layout style={{flex: 1, paddingTop: 20}}>

      <Avatar style={styles.avatar} size='giant' source={require('../assets/favicon.png')}/>

      <Layout style={styles.container}>
        <Text>{userName}</Text>
        <Text>{title}</Text>
      </Layout>

      <Layout style={{flexDirection: 'row'}}>
        <MenuItem style={styles.text} accessoryLeft={InfoIcon} title='About'/>
        <MenuItem style={styles.text} accessoryLeft={LogoutIcon} title='Logout'
                  onPress={() => {
                    toggleAuth({userName: '', title: '', isAuthenicated: false})
                  }}/>
      </Layout>

      <Layout style={{}}>
        <Drawer
          selectedIndex={new IndexPath(state.index)}
          onSelect={index => navigation.navigate(state.routeNames[index.row])}>
          <DrawerItem title='Home'/>
          {/*<DrawerItem title='Notifications'/>*/}
        </Drawer>
      </Layout>

    </Layout>
  )
};

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
      {/*<Screen*/}
      {/*  name="Notifications"*/}
      {/*  component={SettingsScreen}*/}
      {/*/>*/}
    </Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    // flexWrap: 'wrap',
    padding: 8,
  },
  avatar: {
    alignSelf: 'center',
    marginTop:  30,
    marginBottom: 20,
    width: 150,
    height: 150
  },
  text: {
    flex: 1,
    textAlign: 'center',
    marginVertical: 10,
    // borderRadius: 2
  }
});

