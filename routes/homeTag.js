import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/homeScreen'
import SettingsScreen from "../screens/settingScreen";
import {BottomNavigation, BottomNavigationTab, TabBar, Tab, Layout, Text, Icon} from '@ui-kitten/components';
import HomeTopTabs from "./homeTopTab";
import FormTemplateScreen from "../screens/formTemplateScreen"

const Tag1 = (props) => (
  <Icon name='home' {...props} />
);

const Tag2 = (props) => (
  <Icon name='text' {...props} />
);

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Home' icon={Tag1}/>
    <BottomNavigationTab title='Details' icon={Tag2}/>
    <BottomNavigationTab title='Upload' icon={Tag2}/>
  </BottomNavigation>
);

export default function HomeTabs() {
  return (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Screen name="Home" component={HomeTopTabs}/>
      <Screen name="Notifications" component={SettingsScreen}/>
      <Screen name="Upload" component={FormTemplateScreen}/>
    </Navigator>
)
  ;
}

