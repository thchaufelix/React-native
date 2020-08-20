import * as React from 'react'
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
import RenderHandler from "./renderHandler";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function FormUpload({template, callback}) {
  // User Information
  const {token} = React.useContext(AuthContext)

  // Load Form Template at Begin
  React.useEffect(() => {
    const options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        'Authorization': 'Token ' + token
      },
      url: `http://10.13.41.122:8000/formTemplate/${template}/`,
    };
    axios(options)
      .then((response) => {
        let formTemplateData = response.data
        setFormTemplate(formTemplateData)
      }, (error) => {
        console.log(error)
      });
  }, [])

  // State Init
  const [singleFile, setSingleFile] = React.useState(null)
  const [formTemplate, setFormTemplate] = React.useState([])

  // Validation Filed Init
  const tempReviewSchema = {}
  {
    formTemplate.forEach(({name, type, require}) => {
      if (type === "input") {
        tempReviewSchema[name] = require ? yup.string().required("Required") : yup.string()
      }
    })
  }
  const reviewSchema = yup.object(tempReviewSchema)

  // On Submit Handler
  let uploadImage = async (values) => {
    //Check if any file is selected or not
    // console.log(values)
    if (singleFile != null) {

      // const fileToUpload = singleFile;
      const data = new FormData();
      {
        Object.keys(values).map(
          (keyName, item) => (data.append(keyName, values[keyName]))
        )
      }
      // const jsonObj = JSON.stringify(fileToUpload);
      // const blob = new Blob([jsonObj], {
      //   type: 'image/jpeg'
      // });
      // data.append('file_attachment', blob);

      const options = {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Token ' + token
        },
        data: data,
        url: "http://10.13.41.122:8000/formRecord/",
      };
      axios(options)
        .then(() => {
          alert("Upload Success")
          callback.closeModal()
        }, () => {
          Alert.alert("Something Wrong", "Please check the Network")
        })

    } else {
      alert('Please Select File first');
    }
  }

  // Image Picker
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
      // console.log(res)
      if (res.cancelled) {
        alert('Canceled from single doc picker');
      } else {
        res.type = 'image/jpeg'
        // console.log('res : ' + JSON.stringify(res));
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
              initialValues={{}}
              validationSchema={reviewSchema}
              onSubmit={(values, actions) => {
                uploadImage(values)
                  .then()
              }}
            >
              {(props) => (
                <Layout key={"main"}>
                  <Text style={styles.header} category={"h1"}>Request for Inspection (RI) Form</Text>
                  <Divider/>

                  {/* Render Handler (3 types of input field) */}
                  <RenderHandler formTemplate={formTemplate} props={props}/>

                  <Layout style={{marginTop: 10, marginBottom: 10}}/>
                  <Layout style={{alignItems: 'center', flexDirection: 'row', justifyContent: "space-around"}}>
                    <Button
                      style={styles.buttonStyle}
                      onPress={props.handleSubmit}
                      disabled={props.isValidating}
                      disable={props.isSubmitting}
                    >Submit</Button>

                    {/* This is the Button for Picking Image from Local Device Storage */}
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