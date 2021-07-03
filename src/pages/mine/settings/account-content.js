import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View, Text, Dimensions, Pressable} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import {dispatchCurrentAccount} from '@/redux/actions';
import MediasPicker from '@/components/MediasPicker';
import Toast from '@/components/Toast';
import FastImg from '@/components/FastImg';
import {syncAccountInfo} from '@/api/mine_api';

const {width: screenW} = Dimensions.get('window');

const AccountContent = props => {
  const navigation = props.navigation;
  const [gender, setGender] = useState('');
  const [birthdayVisible, setBirthdayVisible] = useState(false);
  const [birthday, setBirthday] = useState('');
  const currentAccount = useSelector(state => state.account.currentAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    setGender(currentAccount.gender);
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchCurrentAccount());
    }, [])
  );

  const onImagePicker = type => {
    props.removeAllPhoto();
    const options = {
      imageCount: 1,
      isRecordSelected: false,
      isCrop: true,
      CropW: screenW * 1,
      CropH: screenW * 1,
      isCamera: false,
    };

    props.imagePick(options, async (err, res) => {
      if (err) {
        return;
      }

      Toast.showLoading('更换中...');
      await props.uploadAvatar({
        uploadType: 'multipart',
        account_id: currentAccount.id,
        keyParams: type === 'avatar' ? 'account[avatar]' : 'account[background_img]',
        ...res[0],
      });
      dispatch(dispatchCurrentAccount());
      Toast.hide();
      Toast.showError('已完成', {duration: 500});
    });
  };

  const setGenderValue = async value => {
    if (value.toString().length <= 0) {
      return;
    }
    setGender(value);
    await syncAccountInfo({id: currentAccount.id, gender: value});
    dispatch(dispatchCurrentAccount());
  };

  const setBirthdayData = async value => {
    setBirthdayVisible(false);
    setBirthday(value);
    await syncAccountInfo({id: currentAccount.id, birthday: value});
    dispatch(dispatchCurrentAccount());
  };

  const goPages = (type = '') => {
    switch (type) {
      case 'nickname':
        navigation.navigate('EditAccountContent', {
          editKey: 'nickname',
          content: currentAccount.nickname,
        });
        break;
      case 'gender':
        break;
      case 'birthday':
        setBirthday(currentAccount.birthday);
        setBirthdayVisible(true);
        break;
      case 'intro':
        navigation.navigate('EditAccountContent', {
          editKey: 'intro',
          content: currentAccount.intro,
        });
        break;
      case 'avatar':
        onImagePicker('avatar');
        break;
      case 'background_img':
        onImagePicker('background_img');
        break;

      default:
        console.log('not');
    }
  };

  console.log(currentAccount);

  const ForwardRight = () => <Icon color="#C2C2C2" name={'chevron-forward'} size={19} />;

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View style={styles.contentBlank} />

      <Pressable style={styles.itemWrap} onPress={() => goPages('avatar')}>
        <Text style={styles.itemTitle}>头像</Text>
        <FastImg
          source={{uri: currentAccount.avatar_url}}
          style={{...styles.itemContent, ...styles.avator}}
        />
        <ForwardRight />
      </Pressable>
      <View style={styles.bottomLine} />

      <Pressable style={styles.itemWrap} onPress={() => goPages('background_img')}>
        <Text style={styles.itemTitle}>背景图</Text>
        <FastImg
          source={{uri: currentAccount.background_img_url}}
          style={{...styles.itemContent, ...styles.bgCover}}
        />
        <ForwardRight />
      </Pressable>

      <View style={styles.contentBlank} />

      <Pressable style={styles.itemWrap} onPress={() => goPages('nickname')}>
        <Text style={styles.itemTitle}>昵称</Text>
        <Text style={styles.itemContent}>{currentAccount.nickname}</Text>
        <ForwardRight />
      </Pressable>
      <View style={styles.bottomLine} />

      <Pressable style={styles.itemWrap} onPress={() => goPages('gender')}>
        <Text style={styles.itemTitle}>性别</Text>
        <Pressable>
          <RNPickerSelect
            onValueChange={value => setGenderValue(value)}
            fixAndroidTouchableBug
            placeholder={{label: '请选择', value: '', color: 'gray'}}
            value={gender}
            doneText={'完成'}
            items={[
              {label: '男', value: 'man'},
              {label: '女', value: 'woman'},
              {label: '不显示', value: 'other'},
            ]}
          />
        </Pressable>
        <ForwardRight />
      </Pressable>
      <View style={styles.bottomLine} />

      <Pressable style={styles.itemWrap} onPress={() => goPages('birthday')}>
        <Text style={styles.itemTitle}>生日</Text>
        <Text style={styles.itemContent}>{currentAccount.birthday}</Text>
        <ForwardRight />
      </Pressable>
      <View style={styles.bottomLine} />

      <Pressable style={styles.itemWrap} onPress={() => goPages('intro')}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          简介
        </Text>
        <Text style={styles.itemContent} numberOfLines={1}>
          {currentAccount.intro}
        </Text>
        <ForwardRight />
      </Pressable>

      <DateTimePickerModal
        isVisible={birthdayVisible}
        mode="date"
        locale="zh_CN"
        date={birthday ? new Date(birthday) : new Date()}
        onConfirm={value => setBirthdayData(value)}
        onCancel={() => setBirthdayVisible(false)}
        cancelTextIOS="取消"
        confirmTextIOS="确认"
        headerTextIOS="选择生日"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 14,
  },
  contentBlank: {
    height: 9,
    backgroundColor: '#FAFAFA',
  },
  itemWrap: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  itemTitle: {
    marginRight: 'auto',
  },
  itemContent: {
    maxWidth: 300,
    textAlign: 'right',
  },
  avator: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  bgCover: {
    width: 85,
    height: 30,
  },
});

export default MediasPicker(AccountContent);
