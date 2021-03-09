import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, TextInput, ScrollView, Pressable, StyleSheet} from 'react-native';
import {KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import ActionSheet from '@/components/ActionSheet';
import {RFValue} from '@/utils/response-fontsize';
import {IsIos, STATUS_BAR_HEIGHT, NAV_BAR_HEIGHT, SAFE_TOP} from '@/utils/navbar';
import TheorySteps from '@/pages/theories/component/theory-steps';
import TheoryMedia from '@/pages/theories/component/theory-media.js';
import TheoryMediaPicker from '@/pages/theories/component/theory-media-picker';
import TheoryMediaSheet, {checkPermission} from '@/pages/theories/component/theory-media-sheet';
import {
  getTheoriy,
  refreshTheory,
  addTheoryBody,
  deleteTheoryBody,
  publishTheory,
  wastedTheory,
} from '@/api/theory_api';

const defaultProps = {
  autoCorrect: false,
  autoComplete: false,
  caretHidden: false,
  selectionColor: '#ff193a',
  placeholderTextColor: '#9F9F9F',
};

const TheoryStepContent = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showCloseSheet, setShowCloseSheet] = useState(false);
  const {theory} = useSelector(state => state.theory);

  const addStep = async () => {
    // add
    await addTheoryBody(theory.id);

    //remove
    // const data = {id: theory.id, theory_body_id: 2};
    // await deleteTheoryBody(theory.id, data);

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

  const loadData = async () => {
    const res = await getTheoriy(props.route.params.id);
    dispatch({type: action.UPDATE_THEORY, value: res.data.theory});
  };

  useEffect(() => {
    loadData();
  }, []);

  useLayoutEffect(() => {
    const isValidateForm = () => {
      //封面，标题 步骤1标题
      const {title, media, theory_bodies = []} = theory;
      if (title && media && media.url && theory_bodies.length > 0 && theory_bodies[0].title) {
        return true;
      } else {
        return false;
      }
    };

    const onPreview = () => {
      if (!isValidateForm()) {
        Toast.show('标题/顽法介绍/步骤标题不能为空哦~');
        return;
      }
      navigation.navigate('TheoryPreview');
    };

    const onPublish = async () => {
      if (!isValidateForm()) {
        Toast.show('标题/顽法介绍/步骤标题不能为空哦~');
        return;
      }
      Toast.showLoading('正在发布中...');
      const res = await publishTheory(theory.id, theory);
      Toast.showError('发布成功');
      Toast.hide();
      navigation.navigate('TheoryDetail', {theoryId: res.theory.id});
    };

    const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};
    const colorStyle = {fontSize: 15, color: isValidateForm() ? '#000' : '#bdbdbd'};

    navigation.setOptions({
      headerTitle: '写顽法',
      headerLeft: () => (
        <Pressable onPress={() => setShowCloseSheet(true)} hitSlop={hitSlop}>
          <IconFont name={'close'} size={14} />
        </Pressable>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <Text style={colorStyle} onPress={onPreview}>
            预览
          </Text>
          <Text style={{...colorStyle, marginLeft: 18}} onPress={onPublish}>
            发布
          </Text>
        </View>
      ),
    });
  }, [navigation, theory]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
      keyboardVerticalOffset={IsIos ? NAV_BAR_HEIGHT + SAFE_TOP : STATUS_BAR_HEIGHT + 55}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          {theory.media ? (
            <TheoryMedia
              media={theory.media}
              type="theory_media"
              loadData={loadData}
              showDetele={true}
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
              textAlignVertical={'left'}
              underlineColorAndroid={'transparent'}
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
      </TouchableWithoutFeedback>

      {/* choose media sheet */}
      <TheoryMediaSheet
        {...props}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
        params={{assetable_type: 'Theory', assetable_id: theory.id, assetable_name: 'theory_media'}}
        loadData={loadData}
      />

      {/* close sheet */}
      <ActionSheet
        actionItems={[
          {
            label: '直接退出',
            onPress: async () => {
              await wastedTheory(theory.id);
              navigation.reset({index: 0, routes: [{name: 'Recommend'}]});
            },
          },
          {
            label: '保存到草稿箱',
            onPress: async () => {
              navigation.reset({index: 0, routes: [{name: 'Recommend'}]});
            },
          },
        ]}
        showActionSheet={showCloseSheet}
        changeModal={() => setShowCloseSheet(false)}
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
    lineHeight: RFValue(16),
    paddingHorizontal: 15,
    paddingTop: RFValue(5),
    marginTop: RFValue(15),
    paddingVertical: 0,
    padding: 0,
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
