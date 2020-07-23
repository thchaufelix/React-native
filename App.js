import * as React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import RootDrawer from './routes/drawer'
import {default as theme} from './theme.json';

export default function App() {
  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <RootDrawer/>
      </ApplicationProvider>
    </NavigationContainer>
  );
}