import React, {useState} from 'react';
import {StyleSheet, Platform, Alert, Text, View, Pressable, Modal} from 'react-native';
import {check, request, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from '@/components/Toast';

const GetStorage = ({children, handleClick, style, media_url}) => {
  const [visible, setVisible] = useState(false);
  const photoPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

  const getLocation = async () => {
    const answer = await checkPermission();

    if (answer === 'WAIT') {
      console.log('等待授权中');
      return;
    }

    if (!answer) {
      console.log('没权限');
      Alert.alert('授权相册权限才能存储到本地', '', [
        {
          text: '取消',
          onPress: () => onCancel(),
        },

        {text: '去设置', onPress: () => onOpenSetting()},
      ]);
      return;
    }

    handleClick && handleClick(true);
  };

  const checkPermission = async () => {
    const result = await check(photoPermission);
    let Permission = false;
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        break;
      case RESULTS.DENIED:
        // 还是可以再次请求
        console.log('The permission has not been requested / is denied but requestable');
        request(photoPermission).then(result => {
          console.log('result', result);
          getLocation();
        });
        return 'WAIT';
      case RESULTS.GRANTED:
        //拥有此权限
        console.log('The permission is granted');
        return true;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
    return Permission;
  };

  const onOpenSetting = () => {
    setVisible(false);
    openSettings().catch(() => console.warn('cannot open settings'));
  };

  const onCancel = () => {
    setVisible(false);
    console.log('没有权限');
    handleClick && handleClick(false);
  };

  return (
    <>
      <Pressable
        style={style}
        onPress={() => {
          getLocation();
        }}>
        {children}
      </Pressable>
      <Modal transparent={visible} statusBarTranslucent visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>授权后才能存储到本地</Text>
            <View style={styles.modalBtnWrap}>
              <Text style={styles.modalBtn} onPress={onCancel}>
                取消
              </Text>
              <Text style={styles.modalBtn} onPress={onOpenSetting}>
                去设置
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalBtnWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  modalBtn: {
    width: 70,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    borderRadius: 6,
    overflow: 'hidden',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default GetStorage;
