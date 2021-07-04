import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Platform, StatusBar} from 'react-native';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import * as action from '@/redux/constants';
import MediasPicker from '@/components/MediasPicker';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getLabelList} from '@/api/settings_api';
import {syncAccountInfo} from '@/api/account_api';
import cStyles from '../style';

const RegisterInfo = props => {
  const dispatch = useDispatch();
  const {socialToken, socialAccount} = useSelector(state => state.login);
  const {navigation, imagePick, removeAllPhoto, uploadAvatar} = props;
  const [nickname, setNickname] = useState(socialAccount?.nickname || '');
  const [imageSource, setImageSource] = useState(socialAccount?.avatar_url || '');

  console.log('register socialAccount', socialToken, socialAccount);

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
      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        console.log('result', result);
      });
      // setPermissionModal(true);
      return false;
    }
  };

  const onImagePicker = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      return;
    }
    removeAllPhoto();
    imagePick({imageCount: 1}, async (err, res) => {
      if (err) {
        return;
      }
      setImageSource(res[0]);
    });
  };

  const handleNextClick = async () => {
    if (!isCanClick) {
      return false;
    }

    if (imageSource.uri) {
      const imageData = {
        uploadType: 'multipart',
        account_id: socialAccount.id,
        keyParams: 'account[avatar]',
        ...imageSource,
      };
      await uploadAvatar(imageData, socialToken);
    }

    const data = {id: socialAccount.id, token: socialToken, account: {nickname}};
    await syncAccountInfo(data);
    dispatch(dispatchUpdateSocialAccount(socialToken, navigation));
  };

  const loadData = async () => {
    const res = await getLabelList();
    dispatch({type: action.UPDATE_TOTAL_LABEL_LIST, labelList: res.data.label_list});
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={[cStyles.wrapper, styles.wrapper]}>
      <StatusBar barStyle="light-content" />
      <Text style={cStyles.infoTitle}>欢迎来到顽鸦</Text>
      <Text style={cStyles.infoText}>完善个人信息，让大家更好地认识你</Text>
      {imageSource ? (
        <Pressable onPress={onImagePicker}>
          <FastImg source={{uri: imageSource.uri || imageSource}} style={styles.avator} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  avator: {
    width: VWValue(75),
    height: VWValue(75),
    marginTop: RFValue(40),
    borderColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: VWValue(40),
  },
  avatorWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
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
