import React from 'react';
import {Button, Layout, Text, TopNavigation, Icon, TopNavigationAction} from "@ui-kitten/components";
import {Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet, FlatList} from "react-native"
import FormUpload from '../components/formUpload'

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

export default function FormTemplateScreen({navigation}) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [formTemplate, setFormTemplate] = React.useState("")

  const closeModal = () => {
    setModalOpen(false)
  }
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => setModalOpen(false)}/>
  );

  return (
    <Layout>

      <Modal visible={modalOpen} animationType={'slide'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Layout style={styles.modalContent}>
            <TopNavigation
              alignment={"center"}
              title='Form Template'
              accessoryLeft={BackAction}
            />
            <FormUpload template={formTemplate} callback={{"closeModal": closeModal}}/>
          </Layout>
        </TouchableWithoutFeedback>
      </Modal>

      <Button onPress={() => {
        setFormTemplate("RI")
        setModalOpen(true)
      }}>
        <Text>RI Form</Text>
      </Button>

    </Layout>
  )
}


const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center'
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  }
})