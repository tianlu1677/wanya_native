import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import Clipboard from '@react-native-community/clipboard';
import Toast from '@/components/Toast';
import {addTopicLink} from '@/api/topic_api';
import Autolink from 'react-native-autolink';
import * as Sentry from "@sentry/react-native";

const AddLink = ({navigation}) => {
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  const [textValue, setTextValue] = useState('');
  const [parseUrl, setParseUrl] = useState('');

  const load = async () => {
    const res = await Clipboard.getString();
    if (res) {
      Toast.showError('已粘贴最近复制过的链接');
      setTextValue(res);
    }
  };

  const onAnalysis = async () => {
    Toast.showLoading('正在解析中...');
    try {
      // console.log('parseUrl', parseUrl)
      let res = await addTopicLink({raw_link: (parseUrl)});
      // console.log('res', res);
      Toast.hide();
      if (res.error_info || res.error) {
        Toast.showError(res.error_info || '解析不到该网址，请重新输入');
        return;
      }
      const topics = {...home.savetopic, linkContent: res.topic_link};
      dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
      navigation.goBack();
    } catch(e) {

      Sentry.captureException(e);
      Toast.hide();
      Toast.showError('解析不到该网址，请重新输入');
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
          <Text style={[styles.cancel, {color: textValue ? '#000' : '#bdbdbd'}]}>确定</Text>
        </Pressable>
      ),
    });
  }, [navigation, textValue, parseUrl]);

  useEffect(() => {
    setParseUrl(parseUrl);
  }, [parseUrl]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.tips}>请复制链接后回到这里，添加链接后发布可直接查看详情</Text>
      <TextInput
        style={styles.inputContent}
        autoFocus
        autoCorrect={false}
        autoComplete={false}
        multiline
        caretHidden={false}
        clearButtonMode="always"
        selectionColor={'#ff193a'}
        placeholderTextColor={'#353535'}
        value={textValue}
        onChangeText={value => setTextValue(value)}
      />

      <View style={{display: 'none'}}>
        <Autolink
          text={textValue}
          renderLink={(text, match) => {
            setParseUrl(match.getAnchorHref());
            return <Text style={{color: 'red'}}>{match.getAnchorHref()}</Text>;
          }}
        />
      </View>
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
    minHeight: 80,
    lineHeight: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    marginTop: 25,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cancel: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    fontSize: 15,
  },
});

export default AddLink;
