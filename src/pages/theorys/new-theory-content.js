import React, {useState, useLayoutEffect} from 'react';
import ReactNative, {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {IsIos, STATUS_BAR_HEIGHT, NAV_BAR_HEIGHT, SAFE_TOP} from '@/utils/navbar';

console.log(STATUS_BAR_HEIGHT);
console.log(NAV_BAR_HEIGHT);
const TextInput = props => {
  return (
    <ReactNative.TextInput
      style={props.style}
      autoCorrect={false}
      autoComplete={false}
      caretHidden={false}
      selectionColor={'#ff193a'}
      placeholderTextColor={'#9F9F9F'}
      maxLength={30}
      {...props}
    />
  );
};

const TheoryStepContent = props => {
  const {navigation} = props;
  const [textValue, setTextValue] = useState('你好');

  useLayoutEffect(() => {
    const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};

    const onSubmit = () => {
      navigation.navigate('NewTheoryContent');
    };

    navigation.setOptions({
      headerTitle: '写顽法',
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} hitSlop={hitSlop}>
          <IconFont name={'close'} size={14} />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={onSubmit} style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 15, color: textValue ? '#000' : '#bdbdbd'}}>预览</Text>
          <Text style={{fontSize: 15, marginLeft: 18, color: textValue ? '#000' : '#bdbdbd'}}>
            发布
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, textValue]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
      keyboardVerticalOffset={9}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.addMedia}>
            <IconFont name={'shangchuan'} size={18} color="#9F9F9F" />
            <Text style={styles.mediaText}>上传这个顽法的完整介绍视频或封面图</Text>
          </View>
          <View style={styles.stepWrap}>
            {/* <TextInput
              style={styles.inputContent}
              autoCorrect={false}
              autoComplete={false}
              caretHidden={false}
              selectionColor={'#ff193a'}
              placeholderTextColor={'#9F9F9F'}
              placeholder="添加顽法名称"
              maxLength={30}
              value={textValue}
              onChangeText={value => setTextValue(value)}
            />
            <TextInput
              style={[styles.inputContent, styles.multiInput]}
              autoCorrect={false}
              autoComplete={false}
              caretHidden={false}
              multiline
              selectionColor={'#ff193a'}
              placeholderTextColor={'#9F9F9F'}
              placeholder="添加顽法名称"
              maxLength={30}
              value={textValue}
              onChangeText={value => setTextValue(value)}
            /> */}
            <Text style={[styles.height, styles.title]}>顽法步骤</Text>
            <View style={styles.stepTitleWrap}>
              <Text style={[styles.height, styles.stepTitleText]}>第一步</Text>
              <TextInput
                value={textValue}
                onChangeText={value => setTextValue(value)}
                style={styles.stepTitle}
              />
            </View>
            <View style={[styles.addMedia, styles.stepMedia]}>
              <IconFont name={'shangchuan'} size={18} color="#9F9F9F" />
              <Text style={styles.mediaText}>上传步骤图/视频/GIF</Text>
            </View>
            <TextInput
              multiline
              value={textValue}
              onChangeText={value => setTextValue(value)}
              style={styles.stepIntro}
              maxLength={200}
              numberOfLine={4}
              // textAlignVertical="center"
            />
          </View>
          {/* 页面往上推占位 */}
          <View style={{backgroundColor: '#fff', flex: 1}} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const greyColor = '#fafafa';
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    // paddingTop: RFValue(35),
    // paddingHorizontal: RFValue(30),
    justifyContent: 'center',
    overflow: 'hidden',
    // backgroundColor: 'pink',
  },
  addMedia: {
    height: RFValue(130),
    backgroundColor: greyColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaText: {
    color: '#9F9F9F',
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 5,
  },
  stepWrap: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputContent: {
    height: RFValue(45),
    lineHeight: RFValue(45),
    backgroundColor: greyColor,
    fontWeight: '500',
    fontSize: 16,
    marginTop: RFValue(15),
  },
  multiInput: {
    height: RFValue(120),
    lineHeight: RFValue(20),
    textAlign: 'auto',
    padding: RFValue(15),
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: RFValue(25),
    marginBottom: RFValue(15),
  },
  height: {
    height: RFValue(45),
    lineHeight: RFValue(45),
    backgroundColor: greyColor,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  stepTitleWrap: {
    flexDirection: 'row',
    paddingLeft: 15,
    backgroundColor: greyColor,
    borderRadius: 5,
  },
  stepTitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  stepTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 10,
    paddingRight: 10,
  },
  stepMedia: {
    marginTop: RFValue(10),
    height: RFValue(120),
    borderRadius: 10,
  },
  stepIntro: {
    // fontSize: 14,
    // fontWeight: '300',
    // color: '#9F9F9F',
    // marginTop: RFValue(10),
    backgroundColor: 'pink',
    // paddingHorizontal: 14,
    // paddingTop: RFValue(12),
    // paddingBottom: RFValue(12),
    // borderRadius: 5,
    // lineHeight: RFValue(20),
    color: 'green',
  },
});

export default TheoryStepContent;
