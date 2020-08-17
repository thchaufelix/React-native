import * as React from 'react'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {Button, Layout, Text, Input, Divider, Select, SelectItem, IndexPath} from "@ui-kitten/components";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback, SafeAreaView
} from 'react-native'
import axios from "axios";
import {AuthContext} from "../contexts/userContext";
import {Formik} from 'formik'
import * as yup from 'yup'
import DateTimePicker from '@react-native-community/datetimepicker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function RiForm() {

  const [singleFile, setSingleFile] = React.useState(null);
  const {token, userName} = React.useContext(AuthContext);
  const [selectedLocationIndex, setSelectedLocationIndex] = React.useState(new IndexPath(0));
  const [selectedWorkIndex, setSelectedWorkIndex] = React.useState(new IndexPath(0));

  const locations = [
    'portion',
    'location',
    'chainage',
    'level',
  ]

  const works = [
    'foundation',
    'reinforcement',
    'formwork',
  ]


  // const [fromTemplate, setFormTemplate] = React.useState([
  //   {id: 1, name: "Ref Number:", type: "input", divider: false, require: true, preset: "NA/HKG/TEST123"},
  //   {id: 2, name: "Location of Works:", type: "input", divider: false, require: true, preset: ""},
  //   {id: 3, name: "Works to be Inspected:", type: "input", divider: true, require: false, preset: ""},
  //   {id: 4, name: "test4", type: "input", divider: false, require: true, preset: ""},
  //   // {id: 5, name: "test5", type: "input", divider: false, require: true, preset: ""},
  //   {
  //     id: 6,
  //     name: "test6",
  //     type: "button",
  //     divider: true,
  //     require: false,
  //     preset: "Concreting,Backfilling,Pipelaying,Covering up"
  //   },
  //   // {id: 7, name: "test7", type: "input", divider: false, require: false, preset: ""},
  //   // {id: 8, name: "test8", type: "input", divider: false, require: false, preset: ""},
  //   // {id: 9, name: "test9", type: "input", divider: false, require: false, preset: ""},
  // ])
  //
  // let tempReviewSchema = {}
  // {
  //   fromTemplate.forEach(({name, type, require, preset}) => {
  //     if (type === "input") {
  //       tempReviewSchema[name] = require ? yup.string().required("Required") : yup.string()
  //     }
  //   })
  // }
  const reviewSchema = yup.object({
    "RefNumber": yup.string()
      .required("Required"),

    Attention: yup.string(),
  })

  let uploadImage = async (values) => {
    if (singleFile != null) {
      const data = new FormData();
      {
        Object.keys(values).map(
          (keyName, item) => (data.append(keyName, values[keyName]))
        )
      }
      // data.append('file_attachment', fileToUpload);

      const options = {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Token ' + token
        },
        data: data,
        url: "http://10.13.41.122:8000/upload/",
      };
      axios(options)
        .then((res) => {
          alert("Upload Success")
        }, (error) => {
          Alert.alert("Something Wrong", "Please check the Network")
        })

    } else {
      alert('Please Select File first');
    }
  }

  let selectFile = async () => {
    //Opening Document Picker to select one file
    try {
      // const res = await DocumentPicker.getDocumentAsync({type: "image/*"});
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // base64: true,
        // exif: true,
        // aspect: [4, 3],
        quality: 1,
      });
      console.log(res)
      if (res.cancelled) {
        alert('Canceled from single doc picker');
      } else {
        res.type = 'image/jpeg'
        console.log('res : ' + JSON.stringify(res));
        setSingleFile(res);
        if (res.type === "cancel") {
          alert('Canceled from single doc picker');
        }
      }
    } catch (err) {
      alert('Unknown Error: ' + JSON.stringify(err));
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={styles.mainBody}>

          <ScrollView>
            <Formik
              initialValues={{RefNumber: '', Attention: ''}}
              validationSchema={reviewSchema}
              onSubmit={(values, actions) => {
                uploadImage(values)
                  .then()
              }}
            >
              {(props) => (
                <Layout>
                  <Text style={styles.header} category={"h1"}>Request for Inspection (RI) Form</Text>
                  <Divider/>

                  <Input
                    style={styles.input}
                    placeholder={"Put Your Input Here"}
                    label={"Ref Number"}
                    caption={props.errors["RefNumber"]}
                    onChangeText={props.handleChange("RefNumber")}
                    value={(props.values["RefNumber"] === '') ? (props.values["RefNumber"] = "NE201801-RI") : props.values["RefNumber"]}
                    onBlur={props.handleBlur("RefNumber")}
                    status={(props.errors["RefNumber"] === null || props.errors["RefNumber"]) ? "danger" : "basic"}
                  />
                  <Input
                    style={styles.input}
                    placeholder={"Put Your Input Here"}
                    label={"Attention"}
                    caption={props.errors["Attention"]}
                    onChangeText={props.handleChange("Attention")}
                    value={(props.values["Attention"] === '') ? (props.values["Attention"] = "Ms. TANG Yuk Yee, Gloria (CRE)") : props.values["Attention"]}
                    onBlur={props.handleBlur("Attention")}
                    status={(props.errors["Attention"] === null || props.errors["Attention"]) ? "danger" : "basic"}
                    disabled={true}
                  />
                  <Divider/>

                  <Layout style={styles.input} level='1'>
                    <Select
                      label={"Location of Works"}
                      placeholder='Default'
                      value={locations[selectedLocationIndex.row]}
                      selectedIndex={selectedLocationIndex}
                      onSelect={(index) => {
                        setSelectedLocationIndex(index)
                        props.values.locations = works[selectedLocationIndex.row]
                      }}>
                      {locations.map(title => <SelectItem title={title}/>)}
                    </Select>
                  </Layout>

                  <Layout style={styles.input} level='1'>
                    <Select
                      label={"Works to be inspected"}
                      placeholder='Default'
                      value={works[selectedWorkIndex.row]}
                      selectedIndex={selectedWorkIndex}
                      onSelect={(index) => {
                        setSelectedWorkIndex(index)
                        props.values.works = works[selectedWorkIndex.row]
                      }}>
                      {works.map(title => <SelectItem title={title}/>)}
                    </Select>
                  </Layout>




                  {/* Footer */}
                  <Layout style={{marginTop: 10, marginBottom: 10}}/>
                  <Layout style={{alignItems: 'center', flexDirection: 'row', justifyContent: "space-around"}}>
                    <Button
                      style={styles.buttonStyle}
                      onPress={props.handleSubmit}
                      disabled={props.isValidating}
                      disable={props.isSubmitting}
                    >Submit</Button>

                    {/*This is the Button for Picking Image from Local Device Storage*/}
                    <Button
                      style={styles.buttonStyle}
                      activeOpacity={0.5}
                      onPress={selectFile}>
                      <Text style={styles.buttonTextStyle}>Select Image</Text>
                    </Button>
                  </Layout>

                </Layout>
              )}
            </Formik>
          </ScrollView>

          {/* This is For uploading Picked Image*/}
          {/*<Layout style={{alignItems: 'center', flexDirection: 'row', justifyContent: "space-between"}}>*/}
          {/*  {singleFile != null ? (*/}
          {/*    <Text style={styles.textStyle}>*/}
          {/*      File Name: {singleFile.name ? singleFile.name : 'N/A'} {'\n'}*/}
          {/*      File Size: {singleFile.size ? singleFile.size : 'N/A'} {'\n'}*/}
          {/*    </Text>*/}
          {/*  ) : (*/}
          {/*    <Text style={styles.textStyle}>*/}
          {/*      File Name: N/A {'\n'}*/}
          {/*      File Size: N/A {'\n'}*/}
          {/*    </Text>*/}
          {/*  )}*/}
          {/*  <Button*/}
          {/*    style={styles.buttonStyle}*/}
          {/*    activeOpacity={0.5}*/}
          {/*    onPress={uploadImage}>*/}
          {/*    <Text style={styles.buttonTextStyle}>Upload Image</Text>*/}
          {/*  </Button>*/}
          {/*</Layout>*/}

        </Layout>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};


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