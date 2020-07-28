import {StyleSheet, Dimensions} from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GlobalStyles = StyleSheet.create({
  header:{
    marginTop: windowHeight * 0.03
  },
  header2:{
    flex: 1
  }

})

export default GlobalStyles