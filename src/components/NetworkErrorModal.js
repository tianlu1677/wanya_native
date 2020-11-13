import React, {Component, useState, useLayoutEffect, useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal, {ModalTitle, ModalContent} from 'react-native-modals';
import {openSettings} from 'react-native-permissions';

import IconFont from '@/iconfont';

const NetworkErrorModal = props => {
  const dispatch = useDispatch();
  const {visible} = props;
  const title = '无网络连接';
  const cancel = () => {
    console.log('cancel')
    props.handleCancel && props.handleCancel();
  };
  return (
    <Modal.BottomModal
      height={0.8}
      width={1}
      rounded
      useNativeDriver={false}
      containerStyle={{flex: 1, zIndex: 10000, elevation: 10}}
      modalStyle={{}}
      overlayOpacity={0.6}
      visible={visible}
      onTouchOutside={() => cancel()}
      onSwipeOut={() => cancel()}
      modalTitle={title ? <ModalTitle title={title} /> : false}>
      <ModalContent style={styles.content}>
        <View style={{marginBottom: 24}}>
          <IconFont name={'wuwangluo'} color={'#BDBDBD'} size={100} />
        </View>
        <Text style={styles.tip}>请检查你的网络连接状态</Text>
        <Text style={styles.tip}>或在【<Text onPress={openSettings}>设置</Text>】里查看</Text>
      </ModalContent>
    </Modal.BottomModal>
  );
};

export default NetworkErrorModal;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 300,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingBottom: 180,
  },
  tip: {
    fontSize: 14,
    color: '#BDBDBD',
    fontWeight: '400',
    lineHeight: 23,
  },
});
