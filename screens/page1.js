import {Button, Layout, Text} from "@ui-kitten/components";
import {TextInput, TouchableWithoutFeedback} from "react-native";
import * as React from "react";
import CCard from "../components/card";

export default function Page1() {

  const [cardInfo, setCardInfo] = React.useState([
    {title: "Item 1", status: 'basic', id: '1'},
    {title: "Item 2", status: 'basic', id: '2'},
    {title: "Item 3", status: 'basic', id: '3'},
    {title: "Item 3", status: 'basic', id: '4'},
    {title: "Item 3", status: 'basic', id: '5'},
    {title: "Item 3", status: 'basic', id: '6'},
  ])

  const acceptInfo = (id) => {
    const index = id - 1
    setCardInfo(
      (prevItems) => {
        let items = [...prevItems];
        let item = {...items[index]};
        item.status = 'success';
        items[index] = item;
        return items
      }
    )
  }

  const rejectInfo = (id) => {
    const index = id - 1
    setCardInfo(
      (prevItems) => {
        let items = [...prevItems];
        let item = {...items[index]};
        item.status = 'danger';
        items[index] = item;
        return items
      }
    )
  }

  return (
    // <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Layout>
      {/*<Text appearance={"hint"} style={{marginBottom: 30}} category={"p1"}>This is Page 1</Text>*/}
      <CCard items={cardInfo} callback={{acceptInfo, rejectInfo}}/>
    </Layout>
  )
}