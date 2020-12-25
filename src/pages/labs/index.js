import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Pressable, Button, FlatList, ScrollView, View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import GetLocation from '@/components/GetLocation';
import PushNotification from 'react-native-push-notification';
import Helper from '@/utils/helper';
import {
  check,
  request,
  addLocationListener,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const LabIndex = props => {
  const navigation = props.navigation;
  const [deviceToken, setDeviceToken] = useState('');
  const [notifyPermission, setNotifyPermission] = useState({});
  const [position, setPosition] = useState({});
  const getDeviceToken = async () => {
    const device_token = await Helper.getData('device_token');
    setDeviceToken(device_token);
  };

  const getLocation = data => {
    console.log('data', data);
    // if(data.position && data.position.coords)
    setPosition(data);
  };

  const checkPermission = () => {
    PushNotification.checkPermissions(res => {
      setNotifyPermission(res);
    });
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        <View>
          <Pressable onPress={getDeviceToken}>
            <Text style={styles.text}>查看当前的device_token</Text>
            <Text style={styles.smallText}>{deviceToken}</Text>
          </Pressable>
          <View>
            <GetLocation handleClick={getLocation}>
              <Text style={styles.text}>获取当前位置</Text>
              <Text style={styles.smallText}>{JSON.stringify(position)}</Text>
            </GetLocation>
          </View>

          <Pressable onPress={checkPermission}>
            <Text style={styles.text}>通知权限</Text>
            <Text style={styles.smallText}>{JSON.stringify(notifyPermission)}</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate('LabNewest');
            }}>
            <Text style={styles.text}>最新帖子排序</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('LabGalley');
            }}>
            <Text style={styles.text}>最新帖子画廊</Text>
          </Pressable>
          <Pressable onPress={openSettings}>
            <Text style={styles.text}>去设置权限页面</Text>
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
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 2,
    marginBottom: 2,
    color: 'white',
    backgroundColor: 'orange',
  },
  smallText: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
    backgroundColor: 'yellow',
  },
});

export default LabIndex;
