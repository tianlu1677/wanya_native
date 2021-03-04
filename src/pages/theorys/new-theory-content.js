import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, TextInput, ScrollView, Pressable, StyleSheet} from 'react-native';
import {KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
import {check, RESULTS, PERMISSIONS} from 'react-native-permissions';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import ActionSheet from '@/components/ActionSheet';
import StepCompoment, {defaultProps} from './component/step-component';
import SyanImagePicker from 'react-native-syan-image-picker';
import TheoryMediaPicker from './component/theory-media-picker';

const imagePermission =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.CAMERA;
const defaultData = {title: '标题', media: null, intro: '简介'};

const checkPermission = async props => {
  const status = await check(imagePermission);
  if ([RESULTS.GRANTED, RESULTS.DENIED].includes(status)) {
    return true;
  }

  if (status === RESULTS.BLOCKED) {
    return false;
  }
};

const TheoryStepContent = props => {
  const {navigation} = props;
  const [title, setTitle] = useState('玩法总标题');
  const [intro, setIntro] = useState('玩法总内容');
  const [tips, setTips] = useState(null);
  const [stepData, setStepData] = useState([defaultData]);
  const [actionItems, setActionItems] = useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const onChangeData = (data, index) => {
    stepData[index] = data;
    setStepData([...stepData]);
  };

  const addStep = () => {
    setStepData([...stepData, defaultData]);
  };

  const onMediaPicker = async () => {
    const hasPermission = await checkPermission();
    console.log('hasPermission', hasPermission);
    if (!hasPermission) {
      return;
    }

    setShowActionSheet(true);
  };

  useEffect(() => {}, []);

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
          <Pressable style={styles.mediaWrap} onPress={onMediaPicker}>
            <IconFont name={'shangchuan'} size={18} color="#9F9F9F" />
            <Text style={styles.mediaText}>上传这个顽法的完整介绍视频或封面图</Text>
          </Pressable>
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
      <ActionSheet
        actionItems={[
          {
            id: 1,
            label: '照片',
            onPress: async () => {
              console.log('zhaopian');
              props.removeAllPhoto();
              props.imagePicker(async (err, res) => {
                if (err) {
                  return;
                }
                console.log(res);
                const result = await props.uploadImage(res[0]);
                console.log(result);
              });
            },
          },
          {
            id: 2,
            label: '视频',
            onPress: async () => {
              console.log('shipin');
            },
          },
        ]}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
      />
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

export default TheoryMediaPicker(TheoryStepContent);

// export default TheoryStepContent;
