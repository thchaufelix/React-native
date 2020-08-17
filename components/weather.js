import * as React from 'react'
import * as Location from 'expo-location';

import {Layout, Text} from "@ui-kitten/components";
import {StyleSheet} from 'react-native';



export default function WeatherLocationInfo() {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  let text = 'Waiting..';
  let loc_info = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    loc_info = `${location.coords.longitude}\" ${location.coords.latitude} `
    text = JSON.stringify(location.coords);
  }

  return (
    <Layout style={styles.container}>
      <Text>{text}</Text>
      <Text>{loc_info}</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});