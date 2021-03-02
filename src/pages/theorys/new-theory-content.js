import React, {useState, useLayoutEffect} from 'react';
import {View, Text, TextInput, ScrollView, Pressable, StyleSheet} from 'react-native';
import {KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import StepCompoment, {defaultProps} from './component/StepCompoment';

const defaultData = {title: '标题', media: null, intro: '简介'};

const TheoryStepContent = props => {
  const {navigation} = props;
  const [title, setTitle] = useState('玩法总标题');
  const [intro, setIntro] = useState('玩法总内容');
  const [tips, setTips] = useState(null);

  const [stepData, setStepData] = useState([defaultData]);

  const onChangeData = (data, index) => {
    stepData[index] = data;
    setStepData([...stepData]);
  };

  const addStep = () => {
    setStepData([...stepData, defaultData]);
  };

  useLayoutEffect(() => {
    const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};
    const onSubmit = () => {
      navigation.navigate('NewTheoryContent');
    };

    const onPreview = () => {
      navigation.navigate('TheoryPreview');
    };

    const onPublish = () => {
      navigation.navigate('TheoryDetail');
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
          <Text style={{fontSize: 15, color: title ? '#000' : '#bdbdbd'}} onPress={onPreview}>
            预览
          </Text>
          <Text
            style={{fontSize: 15, marginLeft: 18, color: title ? '#000' : '#bdbdbd'}}
            onPress={onPublish}>
            发布
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, title]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.mediaWrap}>
            <IconFont name={'shangchuan'} size={18} color="#9F9F9F" />
            <Text style={styles.mediaText}>上传这个顽法的完整介绍视频或封面图</Text>
          </View>
          <View style={styles.contentWrap}>
            <TextInput
              {...defaultProps}
              maxLength={30}
              placeholder="添加顽法名称"
              value={title}
              onChangeText={value => setTitle(value)}
              style={styles.theoryTitle}
            />
            <TextInput
              {...defaultProps}
              multiline
              placeholder="添加顽法名称"
              maxLength={200}
              value={intro}
              onChangeText={value => setIntro(value)}
              style={styles.theoryIntro}
            />
            <Text style={styles.introTitle}>顽法步骤</Text>
            {stepData.map((step, index) => {
              return <StepCompoment key={index} data={step} index={index} change={onChangeData} />;
            })}
            <Pressable style={styles.addStep} onPress={addStep}>
              <IconFont name={'plus'} size={14} />
              <Text style={styles.addStepText}>增加步骤</Text>
            </Pressable>
            <Text style={styles.introTitle}>小贴士</Text>
            <TextInput
              {...defaultProps}
              multiline
              placeholder="这套玩法有哪些小技巧或者注意事项，需要提醒大家"
              maxLength={200}
              value={tips}
              onChangeText={value => setTips(value)}
              style={[styles.theoryIntro, {marginTop: 0}]}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const greyColor = {backgroundColor: '#fafafa'};
const blackText = {fontWeight: '500', fontSize: 16, color: '#000'};
const greyText = {fontWeight: '300', fontSize: 14, color: '#9F9F9F'};
const center = {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mediaWrap: {
    height: RFValue(130),
    ...center,
    ...greyColor,
  },
  mediaText: {
    ...greyText,
    marginLeft: 5,
  },
  contentWrap: {
    paddingHorizontal: 15,
    paddingBottom: RFValue(30),
  },
  theoryTitle: {
    height: RFValue(45),
    paddingHorizontal: 15,
    marginTop: RFValue(15),
    ...blackText,
    ...greyColor,
  },
  theoryIntro: {
    minHeight: RFValue(120),
    lineHeight: RFValue(20),
    paddingHorizontal: 15,
    paddingTop: RFValue(5),
    marginTop: RFValue(15),
    ...greyText,
    ...greyColor,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: RFValue(25),
    marginBottom: RFValue(15),
  },
  addStep: {
    height: RFValue(45),
    ...greyColor,
    ...center,
  },
  addStepText: {
    fontSize: 14,
    color: '#2C2C2C',
    marginLeft: 5,
  },
});

export default TheoryStepContent;
