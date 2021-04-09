import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

const DrawerContent = props => {
  console.log(props);
  return (
    <View style={{flex: 1, backgroundColor: 'green'}}>
      {/* <Text>this is text</Text> */}
      <DrawerContentScrollView {...props} style={{backgroundColor: 'pink', flex: 1}}>
        <DrawerItem label="退出" />
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;
