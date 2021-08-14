import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Dimensions, Linking} from 'react-native';
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

const _updateUrl = 'https://gitee.com/xuexiangjys/XUpdate/raw/master/jsonapi/update_test.json';

const _updateUrl2 = 'https://gitee.com/xuexiangjys/XUpdate/raw/master/jsonapi/update_forced.json';

const _updateUrl3 = 'https://gitee.com/xuexiangjys/XUpdate/raw/master/jsonapi/update_custom.json';

const DownLoadModal = () => {
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState({});


   const initXUpdate = () => {
    let args = new InitArgs();
    args.debug = true;
    args.isPostJson = false;
    args.timeout = 25000;
    args.isWifiOnly = false;
    args.isAutoMode = false;
    args.supportSilentInstall = false;
    args.enableRetry = false;
    XUpdate.init(args)
      .then(result => {
        console.log('初始化成功', JSON.stringify(result))
        // this.setState({
        //   _message: '初始化成功:' + JSON.stringify(result),
        // });
      })
      .catch(error => {
        console.log(error);
      });

    //设置自定义解析
    XUpdate.setCustomParser({parseJson: customParser});
    //设置错误监听
    XUpdate.addErrorListener(errorListener);
  }

  const errorListener = (error) => {
    console.log(error);
    //下载失败
    if (error.code === 4000) {
      XUpdate.showRetryUpdateTip(
        'Github被墙无法继续下载，是否考虑切换蒲公英下载？',
        'https://www.pgyer.com/flutter_learn'
      );
    }
    console.log('发送异常：' + JSON.stringify(error))
  }

  const customParser = () => {
    const appInfo = {
      Code: 0,
      Msg: '',
      UpdateStatus: 2,
      VersionCode: 20,
      VersionName: '1.0.2',
      UploadTime: '2021-07-10 17:28:41',
      ModifyContent:
        ' 1、优化api接口。 2、添加使用demo演示。 3、新增自定义更新服务API接口。 4、优化更新提示界面。',
      DownloadUrl: 'https://xuexiangjys.oss-cn-shanghai.aliyuncs.com/apk/xupdate_demo_1.0.2.apk',
      ApkSize: 2048,
      ApkMd5: 'E4B79A36EFB9F17DF7E3BB161F9BCFD8',
    };
    return {
      //必填
      hasUpdate: appInfo.hasUpdate,
      versionCode: appInfo.versionCode,
      versionName: appInfo.versionName,
      updateContent: appInfo.updateLog,
      downloadUrl: appInfo.apkUrl,
      //选填
      isIgnorable: appInfo.isIgnorable,
      apkSize: appInfo.apkSize,
    };
  };

  const checkUpdateDefault = async () => {
    const params = {platform: 'android', version: WANYA_VERSION}; // 0.0.24
    const res = await getVersionUpgrades(params);
    if(!res.title) {
      return
    }
    if (res.title) {
      let cache_key = `OVERDUCETIME_${res.version_name}`;
      if (!res.force_update) {
        const last_check_time = await Helper.getData(cache_key);
        if (last_check_time && parseInt(last_check_time) > (new Date().getTime())) {
          console.log(cache_key, 'checked!');
          return 'checked!';
        }
        const timestamp = 3 * 24 * 60 * 60 * 1000;
        const overdueTime = new Date().getTime() + timestamp;
        Helper.setData(cache_key, overdueTime.toString());
      }
      let args = new UpdateArgs();
      args.supportBackgroundUpdate = true;
      XUpdate.updateByInfo(args, {
        hasUpdate: true,
        isForce: res.force_update,
        versionCode: res.version_code,
        versionName: res.version_name,
        updateContent: res.desc,
        downloadUrl: res.download_url,
        //选填
        isIgnorable: false,
        apkSize: res.apk_size,
        apkMd5: ''
      });
    }
  }

  useEffect(() => {
    // init();
    initXUpdate();
    checkUpdateDefault();
  }, []);

  return (
    <View />
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
