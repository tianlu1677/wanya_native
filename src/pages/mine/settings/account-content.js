import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {dispatchCurrentAccount} from '../../../redux/actions';
import {syncAccountInfo} from '@/api/mine_api';
import Icon from 'react-native-vector-icons/Ionicons';
import commonStyles from '@/styles/commonStyles';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MediasPicker from '@/components/MediasPicker';
import Toast from '@/components/Toast';
import {useFocusEffect} from '@react-navigation/native';
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

  const ForwardRight = () => {
    return <Icon color={'#C2C2C2'} name={'chevron-forward'} size={20} />;
  };

  const onImagePicker = () => {
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
        keyParams: 'account[avatar]',
        ...res[0],
      });
      dispatch(dispatchCurrentAccount());
      Toast.hide();
      Toast.showError('已完成', {duration: 500});
    });
  };

  const setGenderValue = async value => {
    console.log('xxxx', value);
    if (value.toString().length <= 0) {
      return;
    }
    setGender(value);
    await syncAccountInfo({id: currentAccount.id, gender: value});
    dispatch(dispatchCurrentAccount());
  };

  const setBirthdayData = async value => {
    // console.log('value', value);
    setBirthdayVisible(false);
    setBirthday(value);
    await syncAccountInfo({id: currentAccount.id, birthday: value});
    dispatch(dispatchCurrentAccount());
  };

  const GenderDropdown = () => {
    return (
      <RNPickerSelect
        onValueChange={value => setGenderValue(value)}
        fixAndroidTouchableBug
        placeholder={{
          label: '请选择',
          value: '',
          color: 'gray',
        }}
        value={gender}
        doneText={'完成'}
        style={{...pickerSelectStyles}}
        items={[
          {label: '男', value: 'man'},
          {label: '女', value: 'woman'},
          {label: '不显示', value: 'other'},
        ]}
      />
    );
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
        console.log('currentAccount.birthday', currentAccount.birthday);
        setBirthdayVisible(true);
        break;
      case 'intro':
        navigation.navigate('EditAccountContent', {
          editKey: 'intro',
          content: currentAccount.intro,
        });
        break;
      case 'avatar':
        onImagePicker();
        break;
      default:
        console.log('not');
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="light-content" />
      <Text style={commonStyles.contentBlank} />
      <ItemView
        onPress={() => {
          goPages('avatar');
        }}>
        <ItemTitle>头像</ItemTitle>
        <ItemWrap>
          <Image
            source={{uri: currentAccount.avatar_url}}
            style={{
              width: 35,
              height: 35,
              borderRadius: 20,
            }}
          />
          <ForwardRight />
        </ItemWrap>
      </ItemView>
      <Text style={commonStyles.contentBlank} />
      <ItemView
        style={{}}
        onPress={() => {
          goPages('nickname');
        }}>
        <ItemTitle>昵称</ItemTitle>
        <ItemWrap>
          <ItemTitle>{currentAccount.nickname}</ItemTitle>
          <ForwardRight />
        </ItemWrap>
      </ItemView>
      <ItemView
        style={[commonStyles.topBorder1px, styles.nestLine]}
        onPress={() => {
          goPages('gender');
        }}>
        <ItemTitle>性别</ItemTitle>
        <ItemWrap>
          <GenderDropdown />
          <ForwardRight />
        </ItemWrap>
      </ItemView>

      <ItemView
        style={[commonStyles.topBorder1px, commonStyles.bottomBorder1px, styles.nestLine]}
        onPress={() => {
          goPages('birthday');
        }}>
        <ItemTitle>生日</ItemTitle>
        <ItemWrap>
          <ItemTitle>{currentAccount.birthday}</ItemTitle>
          <ForwardRight />

          <DateTimePickerModal
            isVisible={birthdayVisible}
            mode="date"
            locale={'zh_CN'}
            date={birthday ? new Date(birthday) : new Date()}
            onConfirm={value => {
              setBirthdayData(value);
            }}
            onCancel={() => {
              setBirthdayVisible(false);
            }}
            cancelTextIOS={'取消'}
            confirmTextIOS={'确认'}
            headerTextIOS={'选择生日'}
          />
        </ItemWrap>
      </ItemView>
      <ItemView
        style={{...commonStyles.bottomBorder1px}}
        onPress={() => {
          goPages('intro');
        }}>
        <ItemTitle numberOfLines={1}>简介</ItemTitle>
        <ItemWrap style={{maxWidth: 200}}>
          <ItemTitle numberOfLines={1}>{currentAccount.intro}</ItemTitle>
          <ForwardRight />
        </ItemWrap>
      </ItemView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nestLine: {
    marginLeft: 14,
    paddingLeft: 0,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // paddingVertical: 12,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 4,
    color: 'black',
    fontSize: 14,
    justifyContent: 'center',
    paddingTop: 5,
  },
  inputAndroid: {
    fontSize: 10,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'black',
    // borderRadius: 8,
    width: 150,
    flex: 1,
    marginLeft: 100,
    // justifyContent: 'center',
    color: 'black',
    backgroundColor: 'white',
    marginRight: -100,
    paddingRight: 0, // to ensure the text is never behind the icon
  },
});

const ItemWrap = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const ItemView = styled(Pressable)`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 14px;
  padding-right: 14px;
  color: rgba(0, 0, 0, 1);
`;

const ItemTitle = styled(Text)`
  font-size: 14px;
  font-weight: 400;
`;

export default MediasPicker(AccountContent);
