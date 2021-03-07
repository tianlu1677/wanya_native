import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, TextInput, ScrollView, Pressable, StyleSheet} from 'react-native';
import {KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
// import ActionSheet from '@/components/ActionSheet';
import TheorySteps, {defaultProps} from './component/theory-steps';
import TheoryMediaPicker from './component/theory-media-picker';
import {
  getTheoriy,
  refreshTheory,
  addTheoryBody,
  deleteTheoryBody,
  publishTheory,
} from '@/api/theory_api';
import {IsIos, STATUS_BAR_HEIGHT, NAV_BAR_HEIGHT, SAFE_TOP} from '@/utils/navbar';
import TheoryMedia from './component/theory-media.js';
import TheoryMediaSheet, {checkPermission} from './component/theory-media-sheet';
import Toast from '@/components/Toast';

import * as action from '@/redux/constants';

const media = {
  assetable_id: 1,
  assetable_name: 'theory_media',
  assetable_type: 'Theory',
  category: 'video',
  height: 2160,
  mediaType: 2,
  fileName: 'IMG_7512.MOV',
  mime: 'video/mp4',
  width: 3840,
  size: 33835097,
  coverUri:
    '/private/var/mobile/Containers/Data/Application/7575233A-3EAE-43BA-B66F-B43D8BD4CE20/tmp/SyanImageCaches/6D7829F2-99A1-431B-AC98-30DA4228AB95IMG_7512.jpg',
  duration: 7.681666666666667,
  type: 'video',
  favorite: false,
  uri:
    '/var/mobile/Containers/Data/Application/7575233A-3EAE-43BA-B66F-B43D8BD4CE20/tmp/video-2021-03-05-14:40:51-790.mp4',
};

// const imagePermission =
//   Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.CAMERA;

const defaultData = {title: '标题', media: null, intro: '简介'};

// const checkPermission = async props => {
//   const status = await check(imagePermission);
//   if ([RESULTS.GRANTED, RESULTS.DENIED].includes(status)) {
//     return true;
//   }

//   if (status === RESULTS.BLOCKED) {
//     return false;
//   }
// };

const TheoryStepContent = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [tips, setTips] = useState(null);
  // const [stepData, setStepData] = useState([defaultData]);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const {theory} = useSelector(state => state.theory);

  const onChangeData = (data, index) => {
    // stepData[index] = data;
    // setStepData([...stepData]);
  };

  const addStep = async () => {
    // add
    // const res = await addTheoryBody(theory.id);
    // console.log(res);

    //remove
    const data = {id: theory.id, theory_body_id: 2};
    const rest = await deleteTheoryBody(theory.id, data);
    console.log('rest', rest);
    loadData();
  };

  const onMediaPicker = async () => {
    const hasPermission = await checkPermission();
    if (hasPermission) {
      setShowActionSheet(true);
    }
  };

  const updateTheoryText = async () => {
    const {title, plain_content, tip} = theory;
    const data = {theory: {title, plain_content, tip}};
    await refreshTheory(theory.id, data);
  };

  const updateTheory = async values => {
    const update = {...theory, ...values};
    dispatch({type: action.UPDATE_THEORY, value: update});
  };

  const updateMediaTheory = values => {};

  // 下一步的时候保存
  const loadData = async () => {
    const res = await getTheoriy(2);
    dispatch({type: action.UPDATE_THEORY, value: res.data.theory});
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log('theory', theory);

  useLayoutEffect(() => {
    const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};
    const onSubmit = () => {
      navigation.navigate('NewTheoryContent');
    };

    const onPreview = () => {
      navigation.navigate('TheoryPreview');
    };

    const onPublish = async () => {
      console.log(theory);
      Toast.showLoading('正在发布中...');
      const res = await publishTheory(theory.id, theory);
      console.log('res', res);
      Toast.hide();
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
          {/* color: title ? '#000' : '#bdbdbd' */}
          <Text style={{fontSize: 15}} onPress={onPreview}>
            预览
          </Text>
          <Text style={{fontSize: 15, marginLeft: 18}} onPress={onPublish}>
            发布
          </Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
      keyboardVerticalOffset={IsIos ? NAV_BAR_HEIGHT + SAFE_TOP : STATUS_BAR_HEIGHT + 55}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <View style={styles.container}> */}
        <ScrollView>
          {theory.media ? (
            <TheoryMedia
              media={theory.media}
              type="theory_media"
              loadData={loadData}
              isShowDetele={true}
            />
          ) : (
            <Pressable style={styles.mediaWrap} onPress={onMediaPicker}>
              <IconFont name={'shangchuan'} size={18} color="#9F9F9F" />
              <Text style={styles.mediaText}>上传这个顽法的完整介绍视频或封面图</Text>
            </Pressable>
          )}
          <View style={styles.contentWrap}>
            <TextInput
              {...defaultProps}
              maxLength={30}
              placeholder="添加顽法名称"
              value={theory.title}
              onBlur={updateTheoryText}
              onChangeText={value => updateTheory({title: value})}
              style={[styles.theoryTitle, {textAlign: 'center'}]}
            />
            <TextInput
              {...defaultProps}
              multiline
              maxLength={200}
              placeholder="可以写写这个技巧顽法背后的故事，或者描述下掌握这个顽法的准备工作，包括装备、脚位等"
              value={theory.plain_content}
              onBlur={updateTheoryText}
              onChangeText={value => updateTheory({plain_content: value})}
              style={styles.theoryIntro}
            />
            <Text style={styles.introTitle}>顽法步骤</Text>
            <TheorySteps {...props} loadData={loadData} />
            <Pressable style={styles.addStep} onPress={addStep}>
              <IconFont name={'plus'} size={14} />
              <Text style={styles.addStepText}>增加步骤</Text>
            </Pressable>
            <Text style={styles.introTitle}>小贴士</Text>
            <TextInput
              {...defaultProps}
              multiline
              maxLength={200}
              placeholder="这套玩法有哪些小技巧或者注意事项，需要提醒大家"
              value={theory.tip}
              onBlur={updateTheoryText}
              onChangeText={value => updateTheory({tip: value})}
              style={[styles.theoryIntro, {marginTop: 0}]}
            />
          </View>
        </ScrollView>
        {/* </View> */}
      </TouchableWithoutFeedback>

      <TheoryMediaSheet
        {...props}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
        params={{assetable_type: 'Theory', assetable_id: theory.id, assetable_name: 'theory_media'}}
        loadData={loadData}
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
  container: {
    flex: 1,
    alignItems: 'center',
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
