import * as React from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/homeScreen'
import {TabBar, Tab, Icon,} from '@ui-kitten/components';
import Page1 from "../screens/page1";
import Page2 from "../screens/page2";
import Page3 from "../screens/page3";

const HomeIcon = (props) => (
  <Icon name='home' {...props} />
);

const TextIcon = (props) => (
  <Icon name='text' {...props} />
);

const {Navigator, Screen} = createMaterialTopTabNavigator();

const TopTabBar = ({navigation, state}) => (
  <TabBar
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='Home'/>
    <Tab title='page 1'/>
    <Tab title='page 2'/>
    <Tab title='page 3'/>
  </TabBar>
);

export default function HomeTopTabs() {
  return (
    <Navigator tabBar={props => <TopTabBar {...props} />}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="page 1" component={Page1} />
      <Screen name="page 2" component={Page2} />
      <Screen name="page 3" component={Page3} />
    </Navigator>
  );
}

