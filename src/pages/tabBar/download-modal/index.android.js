import React, {useEffect} from 'react';
import {View} from 'react-native';
import {XUpdate, InitArgs, UpdateArgs} from 'react-native-xupdate-new';
import {getVersionUpgrades} from '@/api/settings_api';
import {WANYA_VERSION} from '@/utils/config';
import Helper from '@/utils/helper';

const DownLoadModal = () => {
  const initXUpdate = () => {
    let args = new InitArgs();
    args.debug = false;
    args.isPostJson = false;
    args.timeout = 25000;
    args.isWifiOnly = false;
    args.isAutoMode = false;
    args.supportSilentInstall = false;
    args.enableRetry = true;
    XUpdate.init(args)
      .then(result => {
        console.log('初始化成功', JSON.stringify(result));
      })
      .catch(error => {
        console.log(error);
      });

    //设置自定义解析
    // XUpdate.setCustomParser({parseJson: customParser});
    //设置错误监听
    XUpdate.addErrorListener(errorListener);
  };

  const errorListener = error => {
    console.log(error);
    //下载失败
    if (error.code === 4000) {
      XUpdate.showRetryUpdateTip(
        '无法继续下载，是否考虑切换fir下载？',
        'http://fir.vanyah.cn/vanyahapp'
      );
    }
    console.log('发送异常：' + JSON.stringify(error));
  };

  const checkUpdateDefault = async () => {
    const params = {platform: 'android', version: WANYA_VERSION}; // 0.0.24
    const res = await getVersionUpgrades(params);
    if (!res.title) {
      return;
    }

    let cache_key = `OVERDUCETIME_${res.version_name}`;
    if (!res.force_update) {
      const last_check_time = await Helper.getData(cache_key);
      // eslint-disable-next-line radix
      if (last_check_time && parseInt(last_check_time) > new Date().getTime()) {
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
      apkMd5: '',
    });
  };

  useEffect(() => {
    initXUpdate();
    checkUpdateDefault();
    return () => {
      XUpdate.removeErrorListener(errorListener);
    };
  }, []);

  return <View />;
};
export default DownLoadModal;
