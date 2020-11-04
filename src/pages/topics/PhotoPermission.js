import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal, {ModalTitle, ModalContent} from 'react-native-modals';
import {openSettings} from 'react-native-permissions';
const PermissionModal = props => {
  const [photo_permission, setPhotoPermission] = useState(false);

  const goToSettings = () => {
    // console.log('xxxx')
    openSettings().catch(() => console.warn('cannot open settings'));
  };

  const cancel = () => {
    props.cancleClick();
  };

  return (
    <Modal.BottomModal
      height={0.5}
      width={1}
      rounded
      useNativeDriver={false}
      containerStyle={{flex: 1, zIndex: 10000, elevation: 10}}
      modalStyle={{}}
      overlayOpacity={0.6}
      visible={props.visible}
      onTouchOutside={() => cancel()}
      onSwipeOut={() => cancel()}
      modalTitle={false}>
      <ModalContent style={styles.content}>
        <View style={{flex: 1}}>
          <View style={styles.decArea}>
            <Text style={styles.title}>没有相机权限</Text>
            <Text style={styles.subtitle}>
              请在 <Text style={styles.boldStyle}>「设置」</Text>
              {'->'} <Text style={styles.boldStyle}>「顽鸦」</Text>
            </Text>
            <Text style={styles.subtitle}>
              允许我访问 <Text style={styles.boldStyle}>「相机」</Text>和{' '}
              <Text style={styles.boldStyle}>「相册」</Text>吧
            </Text>
          </View>
          <TouchableOpacity style={styles.addWeightBtn} onPress={() => {goToSettings()}}>
            <Text style={styles.addWeightBtnTxt}>{'去设置'}</Text>
          </TouchableOpacity>
        </View>
      </ModalContent>
    </Modal.BottomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    zIndex: 1000,
  },
  decArea: {
    marginTop: 30,
    alignItems: 'center',
  },
  title: {
    color: '#3C3D57',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 34,
  },
  subtitle: {
    color: '#7A7DA1',
    fontSize: 16,
    marginVertical: 3,
  },
  boldStyle: {
    fontWeight: 'bold',
  },
  addWeightBtn: {
    position: 'absolute',
    bottom: 19,
    width: '100%',
    height: 50,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 4,
    backgroundColor: 'black',
  },
  addWeightBtnTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  content: {
    paddingTop: 10,
    fontSize: 12,
    lineHeight: 14,
    color: '#222222',
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
  body: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 1,
    color: '#222222',
  },
});

export default PermissionModal;
