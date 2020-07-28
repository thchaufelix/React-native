import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, MenuItem, OverflowMenu } from '@ui-kitten/components';

const SimpleOverflowMenu = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE MENU
    </Button>
  );

  return (
    <Layout style={styles.container} level='1'>
      <OverflowMenu
        anchor={renderToggleButton}
        visible={visible}
        selectedIndex={selectedIndex}
        onSelect={onItemSelect}
        onBackdropPress={() => setVisible(false)}>
        <MenuItem title='Users'/>
        <MenuItem title='Orders'/>
        <MenuItem title='Transactions'/>
      </OverflowMenu>
    </Layout>
  );
};

export default SimpleOverflowMenu

const styles = StyleSheet.create({
  container: {
    minHeight: 144,
  },
});