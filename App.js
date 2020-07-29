import * as React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import RootDrawer from './routes/drawer'
import {default as theme} from './theme.json';
import AuthContextProvider from "./contexts/userContext";
import RootStack from "./routes/stack";

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <NavigationContainer >
          <AuthContextProvider>
            {/*<RootDrawer/>*/}
            <RootStack/>
          </AuthContextProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}