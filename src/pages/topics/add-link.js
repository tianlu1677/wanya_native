import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import Clipboard from '@react-native-community/clipboard';
import Toast from '@/components/Toast';
import {addTopicLink} from '@/api/topic_api';

const AddLink = ({navigation}) => {
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  const [text, setText] = useState(null);

  const load = async () => {
    const res = await Clipboard.getString();
    if (res) {
      Toast.showError('已粘贴最近复制过的链接');
      setText(res);
    }
  };

  const onAnalysis = async () => {
    const reg = 'https://';
    if (!text.match(reg)) {
      Toast.showError('链接格式有误，请重新输入');
      return;
    }
    try {
      Toast.showLoading('正在解析中...');
      let res = await addTopicLink({raw_link: text});
      console.log(res);
      Toast.hide();
      if (!res.topic_link) {
        Toast.showError('解析不到该网址，请重新输入');
        return;
      }
      const topics = {...home.savetopic, linkContent: res.topic_link};
      dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
      navigation.goBack();
    } catch {
      Toast.showError('解析不到该网址，请重新输入');
      Toast.hide();
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '添加链接',
      headerRight: () => (
        <Pressable onPress={onAnalysis}>
          <Text style={[styles.cancel, {color: text ? '#000' : '#bdbdbd'}]}>确定</Text>
        </Pressable>
      ),
    });
  }, [navigation, text]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.tips}>请复制链接后回到这里，添加链接后发布可直接查看详情</Text>
      <TextInput
        style={styles.inputContent}
        autoFocus
        autoComplete={'tel'}
        caretHidden={false}
        selectionColor={'#ff193a'}
        placeholderTextColor={'#353535'}
        clearButtonMode={'always'}
        value={text}
        onChangeText={value => setText(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 14,
    paddingTop: 28,
  },
  tips: {
    fontSize: 13,
    color: '#C2C2C2',
    textAlign: 'center',
  },
  inputContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    marginTop: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    lineHeight: 20,
  },
  cancel: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    fontSize: 15,
    // color: '#bdbdbd',
  },
});

export default AddLink;
