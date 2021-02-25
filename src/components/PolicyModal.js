import React, {Component, useState, useLayoutEffect, useEffect, useCallback, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Modal, Image, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Helper from '../utils/helper';
import IconFont from '@/iconfont';
import * as RootNavigation from '@/navigator/root-navigation';
import {BaseApiUrl} from '@/utils/config';
import {useFocusEffect} from '@react-navigation/native';

const PolicyModal = ({navigation, route}) => {
  const [showModal, setShowModal] = useState(false);
  const agreePolicy = async () => {
    console.log('cancel');
    Helper.setData('agree_policy', 'ok');
    setShowModal(false);
    console.log('showModal', showModal);
  };

  const loadPolicy = async () => {
    const agree_policy_status = await Helper.getData('agree_policy');
    // console.log('agree_policy_status', agree_policy_status)
    if (agree_policy_status !== 'ok') {
      setShowModal(true);
    }
  };

  goPolicy = (type) => {
    if (type === 'private') {
      RootNavigation.navigate('WebView', {
        sourceUrl: `${BaseApiUrl}/home/private_policy`,
        title: '顽鸦隐私政策',
        bgColor: 'black',
      });
      setShowModal(false);
    }
    if (type === 'user') {
      RootNavigation.navigate('WebView', {
        sourceUrl: `${BaseApiUrl}/home/user_agreement`,
        title: '顽鸦用户协议',
        bgColor: 'black',
      });
      setShowModal(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPolicy();
    }, [])
  );

  return (
    <>
      {showModal && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          statusBarTranslucent={true}
          // presentationStyle={'fillScreen'}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.tipBoxBg}>
            <View style={styles.tipBox}>
              <View style={styles.tipBoxTil}>
                <Text style={styles.tipBoxTilTxt}>服务协议和隐私政策</Text>
              </View>
              <View>
                <Text style={styles.tipBoxDec}>
                  请你务必审核阅读、充分理解“服务协议”和隐私政策个条款，包括但不限于：为了向你提供即时通讯、内容分享等服务，我们需要手机你的设备信息、操作日志等个人信息。你可以在“设置”中查看、变更、删除跟人信息并管理你的授权。
                  你可阅读{' '}
                  <Text style={styles.linkTxtColor}>
                    《<Text onPress={() => goPolicy('user')} style={{color: 'blue'}}>服务协议</Text> 与 <Text onPress={() => goPolicy('private')} style={{color: 'blue'}}>隐私政策</Text>》
                  </Text>
                  了解详细信息。如你同意，请点击“同意”开始接受我们的服务。
                </Text>
              </View>
              <TouchableOpacity style={styles.sureBtn} onPress={() => agreePolicy()}>
                <Text style={styles.sureBtnTxt}>同意</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default PolicyModal;

const styles = StyleSheet.create({
  tipBoxBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tipBox: {
    width: 320,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  tipBoxTil: {
    width: '100%',
    marginBottom: 15,
  },
  tipBoxTilTxt: {
    fontSize: 18,
    textAlign: 'center',
  },
  tipBoxDec: {
    lineHeight: 22,
  },
  linkTxtColor: {
    // color: '#51aaf9',
    color: 'black',
  },
  sureBtn: {
    marginTop: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sureBtnTxt: {
    color: '#51aaf9',
  },
  policyHeader: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#221F30',
  },
  policyHeaderTxt: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 10,
    top: 20,
    zIndex: 99,
  },
});
