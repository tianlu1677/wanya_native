import React, {Component, useRef, useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  Platform,
  StatusBar,
  View,
  TextInput,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {syncAccountInfo} from '@/api/mine_api';
import {secureCheck} from '@/api/secure_check';
import {Button} from 'react-native-elements';
import {BOTTOM_HEIGHT} from '@/utils/navbar';

const EditAccountContent = ({navigation, route}) => {
  const [editKey, setEditKey] = useState('');
  const [content, setContent] = useState('');
  const currentAccount = useSelector(state => state.account.currentAccount);
  useLayoutEffect(() => {}, [navigation]);

  useEffect(() => {
    setEditKey(route.params.editKey);
    setContent(route.params.content);
  }, []);

  const validForm = () => {
    if (!content) {
      return false;
    }
    if (editKey === 'nickname' && content === currentAccount.nickname) {
      return false;
    }
    if (currentAccount === 'intro' && content === currentAccount.intro) {
      return false;
    }
    if (currentAccount === 'province' && content === currentAccount.province) {
      return false;
    }
    return true;
  };

  const saveContent = async () => {
    if (!content) {
      return;
    }

    const res = await secureCheck('text', content);
    if (!res.status) {
      // Taro.showToast({title: '您输入的内容有违法违规内容，请重新输入', icon: 'none' })
      console.log('error', res);
      return;
    }

    let data = {id: currentAccount.id};
    if (editKey === 'nickname') {
      data = {...data, nickname: content};
    }
    if (editKey === 'intro') {
      data = {...data, intro: content};
    }

    syncAccountInfo({account: data});
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback
      style={{flex: 1, backgroundColor: '#fafafa'}}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={{flex: 1, backgroundColor: '#fafafa'}}>
        <StatusBar barStyle="dark-content" />
        {editKey === 'nickname' && (
          <TextInput
            caretHidden={false}
            selectionColor={'#ff193a'}
            maxLength={20}
            onChangeText={text => {
              setContent(text);
            }}
            placeholder={'请输入昵称'}
            placeholderTextColor={'#c2c2c2'}
            defaultValue={content}
            style={styles.editInput}
          />
        )}
        {editKey === 'intro' && (
          <TextInput
            caretHidden={false}
            selectionColor={'#ff193a'}
            maxLength={40}
            multiline
            numberOfLines={10}
            onChangeText={text => {
              setContent(text);
            }}
            // returnKeyType={'done'}
            placeholder={'输入简介，30个字以内'}
            placeholderTextColor={'#c2c2c2'}
            defaultValue={content}
            style={styles.multiLine}
          />
        )}
        {/*{editKey === 'province' && <TextInput></TextInput>}*/}
        <Button
          containerStyle={styles.publicBtnContainer}
          buttonStyle={{...styles.saveButton, backgroundColor: validForm() ? 'black' : '#F8F8F8'}}
          titleStyle={validForm() ? styles.validTitle : styles.novalidTitle}
          title="确定"
          onPress={() => {
            saveContent();
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  //底部默认样式
  editInput: {
    color: 'black',
    marginTop: 15,
    padding: 0,
    paddingLeft: 14,
    backgroundColor: 'white',
    fontWeight: '600',
    height: 55,
  },

  multiLine: {
    color: 'black',
    padding: 0,
    marginTop: 15,
    paddingLeft: 14,
    backgroundColor: 'white',
    paddingTop: 15,
    textAlignVertical: 'top',
    height: 172,
    fontSize: 18,
    lineHeight: 22,
  },

  publicBtnContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: BOTTOM_HEIGHT,
    backgroundColor: 'black',
  },
  saveButton: {
    fontSize: 28,
    color: 'red',
    width: '100%',
    height: 50,
    borderRadius: 2,
  },

  novalidTitle: {
    fontSize: 16,
    color: '#d7d7d7',
  },
  validTitle: {
    fontSize: 16,
    color: 'white',
  },
});

export default EditAccountContent;
