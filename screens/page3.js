import {
  IndexPath,
  Icon,
  Layout,
  Select,
  SelectGroup,
  SelectItem,
  Text
} from "@ui-kitten/components";
import {TextInput, TouchableWithoutFeedback, StyleSheet} from "react-native";
import * as React from "react";
import WeatherLocationInfo from "../components/weather";


function NestedDropDown({data, setProps, parent}) {

  const items = Object.keys(data)

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = items[selectedIndex.row];

  const renderOption = ({title, key}) => (
    <SelectItem title={title} key={key}/>
  );

  React.useEffect(() => {
    setProps((parent) ? parent + "," + items[0] : items[0])
  }, [])

  return (
    <>
      <Select
        style={styles.select}
        placeholder='Default'
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={index => {
          setSelectedIndex(index)
          setProps((parent) ? parent + "," + items[index-1] : items[index-1])
        }}>
        {items.map((e, i) => (renderOption({title: e, key: i})))}
      </Select>
      {(data[displayValue]) ? (
        <NestedDropDown data={data[displayValue]} setProps={setProps} parent={(parent) ? parent + "," + displayValue : displayValue}/>
      ) : null}
    </>
  )
}


export default function Page3() {
  const [props, setProps] = React.useState(null);
  const dataObj = {
    'Developer': null,
    'Designer': {
      'option 1': null,
      'option 2': {'option 1': null},
      'option 3': {
        'option 1': null,
        'option 2': null
      }
    },
    'Product Manager': null,
  };

  return (
    <Layout style={styles.container}>
      {/*<Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>*/}
      {/*<Text appearance={"hint"} style={{marginBottom: 30}} category={"p1"}>This is Page 3</Text>*/}

      {/*<WeatherLocationInfo />*/}

      <NestedDropDown data={dataObj} setProps={setProps} parent={''}/>
      <Text>{JSON.stringify(props)}</Text>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 120,
  },
  select: {
    // flex: 1,
    justifyContent: 'flex-start',
    margin: 2,
  },
});