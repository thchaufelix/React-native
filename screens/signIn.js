import * as React from 'react'
import {
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
  Alert,
  ImageBackground,
  SafeAreaView,
} from 'react-native'
import {AuthContext} from "../contexts/userContext";
import {Layout, Button, Text, Icon} from "@ui-kitten/components";
import axios from 'axios';
import {Formik} from 'formik'
import * as yup from 'yup'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const reviewSchema = yup.object({
  email: yup.string()
    .email('Email is invalid')
    .required("Required"),
  password: yup.string()
    .required('Required')
    .min(8),
  // rating: yup.string()
  //   .required()
  //   .test('is-num-1-5', 'Rating must a number 1 - 5', (val) => {
  //     return parseInt(val) < 6 && parseInt(val) > 0;
  //   })
})

export default function SignInScreen({navigation}) {
  const shakeIconRef = React.useRef();
  const {toggleAuth, userName} = React.useContext(AuthContext);

  // React.useEffect(() => {
  //   shakeIconRef.current.startAnimation();
  //
  //   shakeIconRef.current.stopAnimation();
  // }, []);

  const renderShakeIcon = (props) => (
    <Icon
      {...props}
      ref={shakeIconRef}
      animation='shake'
      name='log-in'
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={{flex: 1}}>
          <ImageBackground source={require('../assets/bg_login.jpg')} style={styles.bgImage} resizeMode='cover'/>
          <Formik
            initialValues={{email: userName, password: ''}}
            validationSchema={reviewSchema}
            // validate={() => shakeIconRef.current.startAnimation()}
            onSubmit={(values, actions) => {
              // shakeIconRef.current.startAnimation();
              axios.post("http://10.11.53.136:8000/api-token-auth/", {
                username: values.email,
                password: values.password
              })
                .then((response) => {
                  toggleAuth({
                    userName: values.email,
                    title: 'tester',
                    token: response.data.token,
                    isAuthenicated: true
                  });
                }, (error) => {
                  console.log(error)
                  Alert.alert("Somthing Wrong", "Wrong Password")
                  // Alert.alert("Somthing Wrong", error)
                });
            }}
          >
            {(props) => (
              <Layout style={styles.container} level={"2"}>
                <Text
                  style={styles.header}
                  category={"h1"}
                >Inspection</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  onBlur={props.handleBlur('email')}
                />
                <Text style={styles.errorText}
                      category={"p2"}
                      status={"danger"}>{props.touched.email && props.errors.email}</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  onBlur={props.handleBlur('password')}
                  secureTextEntry
                />
                <Text style={styles.errorText}
                      category={"p2"}
                      status={"danger"}>{props.touched.password && props.errors.password}</Text>

                <Button
                  style={styles.button}
                  onPress={props.handleSubmit}
                  title={"Sign in"}
                  disabled={props.isValidating}
                  accessoryLeft={renderShakeIcon}
                >Sign in</Button>

                <Text
                  style={styles.footer}
                  category={"label"}
                >Cerebro Strategy Ltd.</Text>
              </Layout>
            )}
          </Formik>
        </Layout>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: windowHeight * 0.07,
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    padding: windowHeight * 0.005,
    // borderRadius: 15,
    borderBottomWidth: 1,
    marginVertical: windowHeight * 0.005,
    marginHorizontal: windowWidth * 0.15,
    textAlign: 'center',
    borderColor: '#333',
    // color: "gray"
  },
  button: {
    marginTop: windowHeight * 0.08,
    marginBottom: windowHeight * 0.1,
    width: windowWidth * 0.45,
    alignSelf: 'center',
    borderRadius: 4,
  },
  container: {
    // height: windowHeight*0.8,
    alignContent: 'center',
    marginHorizontal: windowWidth * 0.05,
    marginBottom: windowHeight * 0.12,
    borderRadius: 4,
    // elevation: 3,
    // shadowOffset: {width: 1, height: 1},
    // shadowColor: '#333',
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    opacity: 0.76
  },
  errorText: {
    textAlign: 'center',
    // fontSize: 12
  },
  bgImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    // opacity: 0.9,
  },
  footer: {
    textAlign: 'center',
    marginTop: windowHeight * 0.08,
    marginBottom: windowHeight * 0.03,
    textDecorationLine: "underline",
  }
})
