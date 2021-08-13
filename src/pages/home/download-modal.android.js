import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Linking} from 'react-native';
import Modal from 'react-native-modal';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {getVersionUpgrades} from '@/api/settings_api';
import {WANYA_VERSION} from '@/utils/config';
import Helper from '@/utils/helper';
import DownLoadImg from '@/assets/images/download.png';
import {Pressable} from 'react-native';
const {width} = Dimensions.get('window');
import {XUpdate, InitArgs, UpdateArgs} from 'react-native-xupdate-new';

const _updateUrl =
  'https://gitee.com/xuexiangjys/XUpdate/raw/master/jsonapi/update_test.json';

const _updateUrl2 =
  'https://gitee.com/xuexiangjys/XUpdate/raw/master/jsonapi/update_forced.json';

const _updateUrl3 =
  'https://gitee.com/xuexiangjys/XUpdate/raw/master/jsonapi/update_custom.json';

const DownLoadModal = () => {
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState({});

  const handleUpdate = () => {
    if (info.category === 'ios') {
      Linking.openURL(info.download_url);
    }
    // 立即更新
  };

  const handleClose = () => {
    setVisible(false);
  };


  const loadData = async () => {
    const params = {platform: 'android', version: '0.0.21'}; // 0.0.24
    const res = await getVersionUpgrades(params);

    if (res.title) {
      setInfo(res);
      setVisible(true);
      if (!res.force_update) {
        const timestamp = 3 * 24 * 60 * 60 * 1000;
        const overdueTime = new Date().getTime() + timestamp;
        Helper.setData('OVERDUCETIME', overdueTime.toString());
      }
    }
  };

  const init = async () => {
    const overdueTime = (await Helper.getData('OVERDUCETIME')) || 0;
    const current = new Date().getTime();

    if (Number(overdueTime) > current) {
      return;
    }

    setTimeout(() => {
      loadData();
    }, 3000);
  };

  const errorListener = (error) => {
    console.log(error);
    //下载失败
    if (error.code === 4000) {
      XUpdate.showRetryUpdateTip(
        'Github被墙无法继续下载，是否考虑切换蒲公英下载？',
        'https://www.pgyer.com/flutter_learn',
      );
    }
    // this.setState({
    //   _message: '发送异常：' + JSON.stringify(error),
    // });
  };

  useEffect(() => {
    init();
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

        {info.force_update ? null : (
          <Pressable onPress={handleClose} style={styles.icon}>
            <IconFont name="guanbi" size={20} />
          </Pressable>
        )}
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
