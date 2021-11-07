import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  StatusBar,
  Keyboard,
  Dimensions,
} from 'react-native';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchCurrentAccount, dispatchUpdateSocialAccount} from '@/redux/actions';
import * as action from '@/redux/constants';
import MediasPicker from '@/components/MediasPicker';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getLabelList} from '@/api/settings_api';
import {syncAccountInfo} from '@/api/account_api';
import cStyles from '../style';
import Toast from '@/components/Toast';
import {openSettings} from 'react-native-permissions';
const {width: screenW} = Dimensions.get('window');

const RegisterInfo = props => {
  const dispatch = useDispatch();
  const {socialToken, socialAccount} = useSelector(state => state.login);
  const {imagePick, removeAllPhoto, uploadAvatar} = props;
  const [nickname, setNickname] = useState('');
  const [imageSource, setImageSource] = useState('');

  const isCanClick = nickname && imageSource;

  const checkPermission = async () => {
    const imagePermission =
      Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.CAMERA;
    const status = await check(imagePermission);
    if (status === RESULTS.GRANTED) {
      return true;
    }

    if (status === RESULTS.DENIED) {
      request(imagePermission).then(result => {
        console.log('result', result);
      });
      return true;
    }

    if (status === RESULTS.BLOCKED) {
      request(imagePermission).then(result => {
        console.log('result', result);
      });
      // setPermissionModal(true);
      return false;
    }
  };

  const updateAvatar = async file => {
    const imageData = {
      uploadType: 'multipart',
      account_id: socialAccount.id,
      keyParams: 'account[avatar]',
      ...file,
    };
    const res = await uploadAvatar(imageData, socialToken);
    console.log('avatar', imageSource, res.account, imageSource);
    setImageSource({...file, url: res.account.avatar_url});
  };

  const onImagePicker = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      Toast.showError('请授权手机相机以及存储空间权限，方便更新手机头像');
      setTimeout(() => {
        openSettings().catch(() => console.warn('cannot open settings'));
      }, 1000);
      return;
    }
    Toast.showError('上传中...');
    removeAllPhoto();

    const options = {
      imageCount: 1,
      isCrop: true,
      CropW: screenW * 1,
      CropH: screenW,
      isCamera: true,
    };
    imagePick(options, async (err, res) => {
      if (err) {
        if (err !== '取消') {
          Toast.showError(JSON.stringify(err));
        }
        return;
      }
      setImageSource(res[0]);
      updateAvatar(res[0]);
      Toast.showError('已完成', {duration: 500});
      Toast.hide();
    });
    Toast.hide();
  };

  const handleNextClick = async () => {
    if (!isCanClick) {
      return false;
    }

    if (!imageSource.url) {
      updateAvatar(imageSource);
    }

    const data = {
      id: socialAccount.id,
      token: socialToken,
      account: {nickname, profile_attributes: {init_photo: true}},
    };

    const res = await syncAccountInfo(data);
    console.log('更新信息res: ', res);
    dispatch(dispatchUpdateSocialAccount(socialToken));
  };

  const loadData = async () => {
    const res = await getLabelList();
    dispatch({type: action.UPDATE_TOTAL_LABEL_LIST, labelList: res.data.label_list});
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Pressable style={[cStyles.wrapper, styles.wrapper]} onPress={() => Keyboard.dismiss()}>
      <StatusBar barStyle="light-content" />
      <Text style={cStyles.infoTitle}>欢迎来到顽鸦</Text>
      <Text style={cStyles.infoText}>完善个人信息，让大家更好地认识你</Text>
      {imageSource ? (
        <Pressable onPress={onImagePicker}>
          <FastImg
            source={{uri: imageSource.uri || imageSource.url}}
            style={styles.avator}
            mode="cover"
          />
        </Pressable>
      ) : (
        <Pressable style={[styles.avator, styles.avatorWrap]} onPress={onImagePicker}>
          <IconFont name="shangchuan" size={20} color="#fff" />
        </Pressable>
      )}
      <Text style={[styles.avatorText, {color: imageSource ? '#000' : '#BDBDBD'}]}>上传头像</Text>
      <TextInput
        placeholder="填写昵称"
        textAlign="left"
        selectionColor="#ff193a"
        placeholderTextColor="#BDBDBD"
        maxLength={11}
        autoFocus={true}
        caretHidden={false}
        value={nickname}
        onChangeText={text => setNickname(text)}
        style={[cStyles.inputWrap, styles.inputContent]}
      />

      <Text
        onPress={handleNextClick}
        style={[
          cStyles.nextStep,
          styles.nextBtn,
          isCanClick ? cStyles.nextStepActive : cStyles.nextStepNormal,
        ]}>
        下一步
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  avator: {
    width: VWValue(76),
    height: VWValue(76),
    marginTop: RFValue(40),
    borderColor: 'transparent',
    borderRadius: VWValue(38),
  },
  avatorWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  avatorText: {
    fontSize: 12,
    marginTop: RFValue(12),
  },
  inputContent: {
    marginTop: RFValue(25),
  },
  nextBtn: {
    marginTop: RFValue(25),
  },
});

export default MediasPicker(RegisterInfo);
