import {Button, Layout, Text} from "@ui-kitten/components";
import {Alert, TextInput, TouchableWithoutFeedback} from "react-native";
import * as React from "react";
import CCard from "../components/card";
import axios from "axios";
import {AuthContext} from "../contexts/userContext"


export default function Page1() {

  const {token, userName} = React.useContext(AuthContext)
  const [refreshing, setRefreshing] = React.useState(false);
  const [cardInfo, setCardInfo] = React.useState([])

  const updateCardRecord = () => {
    const options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token ' + token
      },
      // data: qs.stringify(data),
      url: "http://10.13.41.122:8000/formRecord/all/",
    };
    axios(options)
      .then((response) => {
        let cardInfos = response.data

        const payloads = cardInfos.map((cardInfo) => {
          let payload = Object()
          payload.refNumber = cardInfo.refNumber
          payload.applicant = cardInfo.applicant
          payload.submitTo = cardInfo.submitTo
          payload.content = JSON.parse(cardInfo.content)

          // console.log(payload)
          return payload
        })
        setCardInfo(payloads)
        setRefreshing(false)
      }, (error) => {
        console.log(error)
      });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    updateCardRecord()
  }, [])

  React.useEffect(() => {
    updateCardRecord()
  }, [])

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
      <CCard items={cardInfo} callback={{acceptInfo, rejectInfo, onRefresh, refreshing}}/>
    </Layout>

  )
}