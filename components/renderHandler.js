import React from 'react'
import {Divider, IndexPath, Input, Layout, Select, SelectItem, Text} from "@ui-kitten/components";
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function RenderHandler({formTemplate, props}) {
  return (
    formTemplate.map((formProps) => {
      if (formProps.type === "input") {
        return renderInput({formProps, props})
      }

      if (formProps.type === "switch") {
        return renderSwitch({formProps, props})
      }

      if (formProps.type === "date") {
        return renderDateTimePicker({formProps, props})
      }
    })
  )
}


const renderInput = ({formProps, props}) => {
  return (
    <Layout key={formProps.id}>
      <Input
        multiline
        style={styles.input}
        placeholder={"Put Your Input Here"}
        label={formProps.name}
        caption={props.errors[formProps.name]}
        onChangeText={props.handleChange(formProps.name)}
        value={
          (props.values[formProps.name] === '' || props.values[formProps.name] === undefined) ?
            (props.values[formProps.name] = formProps.preset)
            :
            props.values[formProps.name]
        }
        onBlur={props.handleBlur(formProps.name)}
        status={(props.errors[formProps.name] === null || props.errors[formProps.name]) ? "danger" : "basic"}
      />
      {formProps.divider ? <Divider/> : null}
    </Layout>
  )
}

const renderSwitch = ({formProps, props}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const data = (formProps.preset === '') ? [] : formProps.preset.split(",")
  {
    props.values[formProps.name] = data[selectedIndex.row]
  }

  return (
    <Layout key={formProps.id}>
      <Select
        style={styles.input}
        label={formProps.name}
        placeholder='Default'
        value={data[selectedIndex.row]}
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          setSelectedIndex(index)
          props.values[formProps.name] = data[index.row]
        }}>
        {data.map((title, index) => <SelectItem key={"${formProps.id}_${index}"} title={title}/>)}
      </Select>
      {formProps.divider ? <Divider/> : null}
    </Layout>
  )
}

const renderDateTimePicker = ({formProps, props}) => {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.values[formProps.name] = currentDate.toISOString()
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = async () => {
    showMode('date');
  };

  const showTimepicker = async () => {
    showMode('time');
  };

  return (
    <Layout key={formProps.id} style={{marginTop: 5, marginBottom: 8}}>
      <Text category={"p2"} style={{marginBottom: 8, marginTop: 8}}>{formProps.preset}</Text>
      <Layout style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
        <TouchableOpacity onPress={showDatepicker}>
          <Text category={"h5"}>On {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showTimepicker}>
          <Text category={"h5"}>At {date.getHours()} : {date.getMinutes()}</Text>
        </TouchableOpacity>
      </Layout>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {formProps.divider ? <Divider/> : null}
    </Layout>
  )
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    // backgroundColor: '#307ecc',
    // borderWidth: 0,
    // color: '#FFFFFF',
    // borderColor: '#307ecc',
    height: windowHeight * 0.055,
    width: windowWidth * 0.33,
    alignItems: 'center',
    borderRadius: 8,
    // marginLeft: 35,
    // marginRight: 35,
    marginTop: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 14,
  },
  textStyle: {
    // backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 10,
    // marginLeft: 35,
    // marginRight: 35,
    // textAlign: 'center',
  },
  errorText: {
    // textAlign: 'right',
    fontSize: 12,
    marginTop: 10
  },
  input: {
    width: windowWidth * 0.88,
    marginVertical: windowHeight * 0.012,
    // textAlign: 'center',
  },

});