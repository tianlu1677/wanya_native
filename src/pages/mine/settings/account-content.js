import React, {useState, useCallback} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View, Text, Dimensions, Pressable} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RegionPicker} from '@yz1311/react-native-wheel-picker';
import {useDispatch, useSelector} from 'react-redux';
import {dispatchCurrentAccount} from '@/redux/actions';
import MediasPicker from '@/components/MediasPicker';
import {RFValue} from '@/utils/response-fontsize';
import {BarHeight} from '@/utils/navbar';
import Toast from '@/components/Toast';
import FastImg from '@/components/FastImg';
import {syncAccountInfo} from '@/api/mine_api';
import {AccountDetailBgImg} from '@/utils/default-image';

const {width: screenW} = Dimensions.get('window');
const TOP_HEADER = RFValue(110) + BarHeight;

const AccountContent = props => {
  const dispatch = useDispatch();
  const {currentAccount} = useSelector(state => state.account);
  const {navigation, uploadAvatar} = props;
  const [birthdayVisible, setBirthdayVisible] = useState(false);
  const [cityVisible, setCityVisible] = useState(false);

  const defaultCity = (currentAccount.city && currentAccount.city.split(',')) || [];
  const defaultBirthday = currentAccount.birthday ? new Date(currentAccount.birthday) : new Date();

  const onImagePicker = type => {
    props.removeAllPhoto();
    const options = {
      imageCount: 1,
      isRecordSelected: false,
      isCrop: true,
      CropW: screenW * 1,
      CropH: type === 'avatar' ? screenW * 1 : TOP_HEADER,
      isCamera: false,
    };

    props.imagePick(options, async (err, res) => {
      if (err) {
        return;
      }
      Toast.showLoading('更换中...');
      const data = {
        uploadType: 'multipart',
        account_id: currentAccount.id,
        keyParams:
          type === 'avatar' ? 'account[avatar]' : 'account[profile_attributes][background_img]',
        ...res[0],
      };
      await uploadAvatar(data);
      dispatch(dispatchCurrentAccount());
      Toast.hide();
      Toast.showError('已完成', {duration: 500});
    });
  };

  const setGenderValue = async value => {
    await syncAccountInfo({id: currentAccount.id, gender: value});
    dispatch(dispatchCurrentAccount());
  };

  const onBirthdayCancel = () => {
    setBirthdayVisible(false);
  };

  const onBirthdayConfirm = async value => {
    onBirthdayCancel();
    await syncAccountInfo({id: currentAccount.id, birthday: value});
    dispatch(dispatchCurrentAccount());
  };

  const onCityPickerCancel = () => {
    setCityVisible(false);
  };

  const onCityPickerConfirm = async (names, codes) => {
    onCityPickerCancel();
    await syncAccountInfo({id: currentAccount.id, city: names.join(',')});
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
      case 'intro':
        navigation.navigate('EditAccountContent', {
          editKey: 'intro',
          content: currentAccount.intro,
        });
        break;
      case 'birthday':
        setBirthdayVisible(true);
        break;
      case 'city':
        setCityVisible(true);
        break;
      case 'avatar':
        onImagePicker('avatar');
        break;
      case 'background_img':
        onImagePicker('background_img');
        break;
      case 'label':
        navigation.navigate('EditAccountLabel');
        break;
      default:
        console.log('not');
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchCurrentAccount());
    }, [])
  );

  const ForwardRight = () => <Icon color="#C2C2C2" name={'chevron-forward'} size={19} />;

  return (
    <SafeAreaView style={{flex: 1}}>
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
          source={{uri: currentAccount.background_img_url || AccountDetailBgImg}}
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

      <Pressable style={styles.itemWrap} onPress={() => goPages('intro')}>
        <Text style={styles.itemTitle}>个性签名</Text>
        <Text style={[styles.itemContent, styles.introText]} numberOfLines={2}>
          {currentAccount.intro}
        </Text>
        <ForwardRight />
      </Pressable>

      <View style={styles.contentBlank} />
      <Pressable style={styles.itemWrap} onPress={() => goPages('gender')}>
        <Text style={styles.itemTitle}>性别</Text>
        <Pressable>
          <RNPickerSelect
            onValueChange={value => setGenderValue(value)}
            fixAndroidTouchableBug
            placeholder={{}}
            value={currentAccount.gender}
            doneText="完成"
            items={[
              {label: '男', value: 'man'},
              {label: '女', value: 'woman'},
              {label: '保密', value: 'other'},
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

      <Pressable style={styles.itemWrap} onPress={() => goPages('city')}>
        <Text style={styles.itemTitle}>所在地</Text>
        <Text style={styles.itemContent}>{currentAccount.city.replace(',', '')}</Text>
        <ForwardRight />
      </Pressable>
      {/* <View style={styles.bottomLine} /> */}

      {/* <View style={styles.bottomLine} />
      <Pressable style={styles.itemWrap} onPress={() => goPages('intro')}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          简介
        </Text>
        <Text style={styles.itemContent} numberOfLines={1}>
          {currentAccount.intro}
        </Text>
        <ForwardRight />
      </Pressable>
      <View style={styles.bottomLine} /> */}

      <View style={styles.contentBlank} />
      <Pressable style={styles.itemWrap} onPress={() => goPages('label')}>
        <Text style={styles.itemTitle}>身份标签</Text>
        <View style={[styles.itemContent, styles.labelWrapper]}>
          {currentAccount.label_list.map(label => (
            <Text style={styles.label} key={label}>
              {label}
            </Text>
          ))}
        </View>
        <ForwardRight />
      </Pressable>

      <RegionPicker
        mode="pc"
        isModal={true}
        modalVisible={cityVisible}
        selectedValue={defaultCity}
        onPickerConfirm={onCityPickerConfirm}
        onPickerCancel={onCityPickerCancel}
      />

      <DateTimePickerModal
        mode="date"
        locale="zh_CN"
        isVisible={birthdayVisible}
        date={defaultBirthday}
        onConfirm={onBirthdayConfirm}
        onCancel={onBirthdayCancel}
        cancelTextIOS="取消"
        confirmTextIOS="确认"
        headerTextIOS="选择生日"
        minimumDate={new Date('1960-01-01')}
        maximumDate={new Date()}
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
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  itemTitle: {
    marginRight: 'auto',
  },
  itemContent: {
    maxWidth: 300,
    textAlign: 'right',
  },
  introText: {
    lineHeight: 20,
    flex: 1,
    marginLeft: 20,
    paddingVertical: 7,
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
  labelWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 1,
    marginLeft: 20,
    paddingTop: 7,
  },
  label: {
    width: 'auto',
    height: 30,
    lineHeight: 30,
    color: '#fff',
    paddingHorizontal: 12,
    backgroundColor: '#ff2242',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 7,
    marginRight: 7,
  },
});

export default MediasPicker(AccountContent);
