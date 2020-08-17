import React from 'react';
import {FlatList, View, StyleSheet, RefreshControl} from 'react-native';
import {Button, Card, Divider, Layout, List, Text} from '@ui-kitten/components';


export default function CCard({items, callback}) {

  const Header = (props, info) => (
    <View {...props}>
      <Text category='h4'>{info.item.refNumber}</Text>
      <Text category='s1'>By {info.item.applicant}</Text>
    </View>
  );

  const Footer = (props, info) => (
    // <View {...props} style={[props.style, styles.footerContainer]}>
    //   <Button
    //     style={styles.footerControl}
    //     size='small'
    //     status='basic'
    //     onPress={() => callback.rejectInfo(info.item.id)}
    //   >
    //     CANCEL
    //   </Button>
    //   <Button
    //     style={styles.footerControl}
    //     size='small'
    //     onPress={() => callback.acceptInfo(info.item.id)}
    //   >
    //     ACCEPT
    //   </Button>
    // </View>

    <View {...props} style={[props.style, styles.footerContainer]}>
      <Text category='s1'>Submit To: </Text>
      <Text category='s1'>{info.item.submitTo}</Text>
      {/*<Text category='s1'>By {info.item.applicant}</Text>*/}
    </View>
  );

  return (
      <List
        style={styles.container}
        // contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={callback.refreshing} onRefresh={callback.onRefresh}/>}
        data={items}

        renderItem={(info) => (
          <Card
            style={styles.item}
            header={headerProps => Header(headerProps, info)}
            footer={footerProps => Footer(footerProps, info)}
            // status={info.item.status}
          >
            {Object.keys(info.item.content).map(function (key, keyIndex) {
              return (
                <Layout key={`${info.refNumber}_${keyIndex}`}
                        style={{flexDirection: "column", justifyContent: "space-between"}}>
                  <Text category='p1'>{key}: </Text>
                  <Text category='c1'>{info.item.content[key]}</Text>
                  <Text category='c1'> </Text>
                  {/*<Divider/>*/}
                </Layout>
              )
            })}
          </Card>
        )}
      />
  )
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    // flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  container: {
    // maxHeight: 320,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
  scrollView: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});