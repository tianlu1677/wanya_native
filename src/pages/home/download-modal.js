import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {getVersionUpgrades} from '@/api/settings_api';
import {WANYA_VERSION} from '@/utils/config';
import DownLoadImg from '@/assets/images/download.png';
import {Pressable} from 'react-native';
const {width} = Dimensions.get('window');

const DownLoadModal = () => {
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState({});

  const handleUpdate = () => {
    // 立即更新
  };

  const handleClose = () => {
    setVisible(false);
  };

  const loadData = async () => {
    const params = {platform: 'ios', version: '0.0.24'}; //WANYA_VERSION
    const res = await getVersionUpgrades(params);
    setInfo(res.title ? res : null);
    setVisible(res.title ? true : false);
  };

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 3000);
  }, []);

  return (
    <Modal
      visible={visible}
      transparent={true}
      backdropColor="black"
      backdropOpacity={0.4}
      style={styles.modalView}>
      <View style={styles.modalContent}>
        <FastImg source={DownLoadImg} style={styles.image} />
        <Text style={styles.title}>版本更新 V {info.version_name}</Text>
        <Text style={styles.content}>{info.desc}</Text>
        <Text style={styles.btn} onPress={handleUpdate}>
          立即更新
        </Text>
        <Pressable onPress={handleClose} style={styles.icon}>
          <IconFont name="guanbi" size={20} />
        </Pressable>
      </View>
    </Modal>
  );
};

const imageWidth = width - RFValue(50 * 2) - RFValue(25 * 2) - RFValue(25 * 2);
const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: RFValue(50),
  },
  modalContent: {
    paddingHorizontal: RFValue(40),
    paddingVertical: RFValue(25),
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: imageWidth,
    height: (578 * imageWidth) / 670,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginVertical: RFValue(20),
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },
  btn: {
    width: '100%',
    height: 45,
    lineHeight: 45,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#ff2242',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: RFValue(20),
  },
  icon: {
    position: 'absolute',
    bottom: -35,
  },
});

export default DownLoadModal;
