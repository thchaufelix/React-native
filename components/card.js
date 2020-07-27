import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Button, Card, List, Text} from '@ui-kitten/components';

export default function CCard({items, callback}) {

  const Header = (props, info) => (
    <View {...props}>
      <Text category='h6'>{info.item.title}</Text>
      <Text category='s1'>By Wikipedia</Text>
    </View>
  );

  const Footer = (props, info) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size='small'
        status='basic'
        onPress={() => callback.rejectInfo(info.item.id)}
      >
        CANCEL
      </Button>
      <Button
        style={styles.footerControl}
        size='small'
        onPress={() => callback.acceptInfo(info.item.id)}
      >
        ACCEPT
      </Button>
    </View>
  );

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={items}
      renderItem={(info) => (
        <Card
          style={styles.item}
          header={headerProps => Header(headerProps, info)}
          footer={footerProps => Footer(footerProps, info)}
          status={info.item.status}
        >
          <Text>
            The Maldives, officially the Republic of Maldives, is a small country in South Asia, located in the
            Arabian
            Sea
            of the Indian Ocean. It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the
            Asian
            continent
          </Text>
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
});