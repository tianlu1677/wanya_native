import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Pressable, Button, FlatList, ScrollView, View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const LabIndex = props => {
  const navigation = props.navigation
  const [deviceToken, setDeviceToken] = useState('')
  const getDeviceToken = () => {
    DeviceInfo.getDeviceToken().then(deviceToken => {
      console.log('deviceToken', deviceToken)
      setDeviceToken(deviceToken)
    });
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>

      <ScrollView>
        <View>
          <Pressable onPress={getDeviceToken}>
            <Text style={styles.text}>查看当前的device_token</Text>
            <Text>{deviceToken}</Text>
          </Pressable>

          <Pressable onPress={() => {navigation.navigate('LabNewest')}}>
            <Text style={styles.text}>最新帖子排序</Text>

          </Pressable>
          <Pressable onPress={() => {navigation.navigate('LabGalley')}}>
            <Text style={styles.text}>最新帖子画廊</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default LabIndex;
