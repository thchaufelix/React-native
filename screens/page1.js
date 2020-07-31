import {Button, Layout, Text} from "@ui-kitten/components";
import {Alert, TextInput, TouchableWithoutFeedback} from "react-native";
import * as React from "react";
import CCard from "../components/card";
import axios from "axios";
import {AuthContext} from "../contexts/userContext"

export default function Page1() {

  const {token, userName} = React.useContext(AuthContext)

  React.useEffect(() => {
    const options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token ' + token
      },
      // data: qs.stringify(data),
      url: "http://10.11.53.136:8000/data/all/",
    };
    axios(options)
      .then((response) => {
        let cardInfos = response.data
        cardInfos.map((cardInfo) => {
          let cardStatus = cardInfo.status.status_name
          cardInfo.status = cardStatus
          cardInfo.applicant = userName
          return cardInfo
        })
        setCardInfo(cardInfos)
      }, (error) => {
        console.log(error)
      });
  }, [cardInfo])

  const [cardInfo, setCardInfo] = React.useState([])

  const acceptInfo = (id) => {
    const index = id - 1
    setCardInfo(
      (prevItems) => {
        let items = [...prevItems];
        let item = {...items[index]};
        item.status = 'success';
        item.title = item.title.split("-")[0] + "- Accept"
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
        item.title = item.title.split("-")[0] + "- Reject"
        items[index] = item;
        return items
      }
    )
  }

  return (
    // <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Layout>
      <CCard items={cardInfo} callback={{acceptInfo, rejectInfo}}/>
    </Layout>

  )
}