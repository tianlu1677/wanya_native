import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StatusBar, TextInput, ScrollView, Pressable, StyleSheet} from 'react-native';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import ActionSheet from '@/components/ActionSheet';
import {RFValue} from '@/utils/response-fontsize';
import Loading from '@/components/Loading';
import {STATUS_BAR_HEIGHT, NAV_BAR_HEIGHT, SAFE_TOP} from '@/utils/navbar';
import TheorySteps from '@/pages/theories/component/theory-steps';
import TheoryMedia from '@/pages/theories/component/theory-media.js';
import TheoryMediaPicker from '@/pages/theories/component/theory-media-picker';
import TheoryMediaSheet, {checkPermission} from '@/pages/theories/component/theory-media-sheet';
import {
  getTheoriy,
  refreshTheory,
  addTheoryBody,
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
    await addTheoryBody(theory.id);
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
    // loadData();
  };

  const updateTheory = async (value, key) => {
    theory[key] = value;
    dispatch({type: action.UPDATE_THEORY, value: theory});
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
      if (
        title &&
        media &&
        media.url &&
        theory_bodies.length > 0 &&
        theory_bodies[0].title &&
        theory_bodies[0].desc
      ) {
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
      try {
        if (!isValidateForm()) {
          Toast.show('标题/顽法介绍/步骤标题不能为空哦~');
          return;
        }
        Toast.showLoading('正在发布中...');
        const res = await publishTheory(theory.id, theory);
        Toast.showError('发布成功');
        Toast.hide();
        props.navigation.reset({
          index: 0,
          routes: [{name: 'TheoryDetail', params: {theoryId: res.theory.id}}],
        });
      } catch (e) {
        Toast.hide();
        Toast.showError('发布失败');
        alert(e);
      }
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

  return theory && theory.id ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? NAV_BAR_HEIGHT + SAFE_TOP : STATUS_BAR_HEIGHT
      }>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ScrollView style={{flex: 1}}>
        {theory.media ? (
          <TheoryMedia
            media={theory.media}
            type="theory_media"
            loadData={loadData}
            showDelete={true}
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
            onChangeText={value => updateTheory(value, 'title')}
            style={[styles.theoryTitle, {textAlign: 'center'}]}
          />
          <TextInput
            {...defaultProps}
            multiline
            maxLength={200}
            placeholder="可以写写这个技巧顽法背后的故事，或者描述下掌握这个顽法的准备工作，包括装备、脚位等"
            value={theory.plain_content}
            onBlur={updateTheoryText}
            textAlignVertical={'top'}
            underlineColorAndroid={'transparent'}
            onChangeText={value => updateTheory(value, 'plain_content')}
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
            scrollEnabled={false}
            maxLength={200}
            placeholder="这套玩法有哪些小技巧或者注意事项，需要提醒大家"
            value={theory.tip}
            textAlignVertical={'top'}
            onBlur={updateTheoryText}
            onChangeText={value => updateTheory(value, 'tip')}
            style={[styles.theoryIntro, {marginTop: 0}]}
          />
        </View>
      </ScrollView>

      {/* choose media sheet */}
      <TheoryMediaSheet
        {...props}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
        params={{
          assetable_type: 'Theory',
          assetable_id: theory.id && theory.id.toString(),
          assetable_name: 'theory_media',
        }}
        loadData={loadData}
      />

      {/* close sheet */}
      <ActionSheet
        actionItems={[
          {
            label: '保存到草稿箱',
            onPress: async () => {
              navigation.reset({index: 0, routes: [{name: 'Recommend'}]});
            },
          },
          {
            label: '直接退出',
            onPress: async () => {
              await wastedTheory(theory.id);
              navigation.reset({index: 0, routes: [{name: 'Recommend'}]});
            },
          },
        ]}
        showActionSheet={showCloseSheet}
        changeModal={() => setShowCloseSheet(false)}
      />
    </KeyboardAvoidingView>
  ) : (
    <Loading />
  );
};

const greyColor = {backgroundColor: '#fafafa'};
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
    fontSize: 14,
    color: '#9F9F9F',
    fontWeight: '300',
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
    fontSize: 18,
    fontWeight: '500',
    ...greyColor,
  },
  theoryIntro: {
    minHeight: RFValue(120),
    lineHeight: 20,
    paddingHorizontal: RFValue(15),
    paddingTop: RFValue(15),
    paddingBottom: RFValue(15),
    marginTop: RFValue(15),
    paddingVertical: 0,
    padding: 0,
    fontSize: 15,
    fontWeight: '300',
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
