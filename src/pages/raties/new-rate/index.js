import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {ScrollView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {debounce} from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {changeUploadStatus} from '@/redux/actions';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import MediasPicker from '@/components/MediasPicker';
import {createTopic} from '@/api/topic_api';

import PublishRateScore, {ReturnScoreText} from './component/publish-rate-score';
import UploadMedia from './component/upload-media';

import {BaseRelatedStyle as lstyles} from '@/styles/baseCommon';

const NewTopic = props => {
  const dispatch = useDispatch();
  const {navigation, uploadVideo, removeAllPhoto} = props;
  const {
    home: {savetopic},
  } = useSelector(state => state);
  const {space, shop_store_ids = []} = savetopic;
  const [imageSource, setImageSource] = useState([]);
  const [videoSource, setVideoSource] = useState([]);
  const [content, setContent] = useState(savetopic.plan_content);
  const [score, setScore] = useState(0);
  const currentTarget = space ? space : shop_store_ids.length > 0 ? shop_store_ids[0] : null;
  const rateType = space ? 'space' : shop_store_ids.length > 0 ? 'shop_store' : '';

  console.log(currentTarget);
  const handleGoHashTag = () => {
    navigation.navigate('AddHashTag');
  };

  const handleGoAccount = () => {
    navigation.navigate('AddMentionAccount', {type: 'add-node'});
  };

  const onChangeContent = text => {
    setContent(text);
    const topics = {...savetopic, plan_content: text};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
  };

  const isValidateForm = () => (content && score > 0 ? true : false);

  const getValidateForm = () => {
    const data = {
      type: 'single',
      node_id: '',
      space_id: space ? space.id : '',
      shop_store_ids: (shop_store_ids || []).map(v => v.id).join(),
      plain_content: savetopic.plan_content,
      mention_ids: (savetopic.mention || []).map(v => v.id).join(),
      medias: imageSource.map(v => v.url),
      is_rate: true,
      rate_score: score,
    };
    return data;
  };

  const onSubmit = async () => {
    if (!isValidateForm()) {
      Toast.show('评分/内容不能为空哦~');
      return false;
    }

    if (imageSource.length > 0) {
      const isImageLoading = imageSource.every(v => v.id);
      if (!isImageLoading) {
        Toast.show('图片正在上传中');
        return false;
      }
    }

    Toast.showLoading('正在发布中...', {duration: 3000});
    const data = getValidateForm();

    if (videoSource.length > 0) {
      // 先上传视频再发布
      const params = {
        content: {video: {...videoSource[0]}, content: {...data}},
        upload: (file, cb) => uploadVideo(file, cb),
      };
      dispatch(changeUploadStatus({...params, status: 'upload', progress: 0}));
      // 等待200ms再跳转，避免首页还没有拿到redux里面的值 ｜｜ 应该不会存在拿不到值的情况（同步dispatch）
      setTimeout(() => {
        Toast.hide();
        navigation.reset({
          index: 0,
          routes: [{name: 'Recommend', params: {activityKey: 'follow'}}],
        });
      }, 200);
    } else {
      try {
        const res = await createTopic(data);
        Toast.hide();
        navigation.reset({
          index: 0,
          routes: [{name: 'Recommend', params: {activityKey: 'follow'}}],
        });
      } catch (err) {
        Toast.hide();
      }
    }
  };

  useEffect(() => {
    return () => {
      removeAllPhoto();
      dispatch({type: action.SAVE_NEW_TOPIC, value: {}});
    };
  }, []);

  useEffect(() => {
    setContent(savetopic.plan_content);
  }, [savetopic]);

  useLayoutEffect(() => {
    const hitSlop = {top: 10, bottom: 10, left: 5, right: 5};

    const RightBtn = () => {
      const style = {color: isValidateForm() ? '#000' : '#bdbdbd'};
      return (
        <Pressable onPress={debounce(onSubmit, 1000)} hitSlop={hitSlop}>
          <Text style={[styles.finishBtn, style]}>发布</Text>
        </Pressable>
      );
    };

    navigation.setOptions({
      headerTitle: '评价',
      headerRight: () => <RightBtn />,
    });
  }, [navigation, imageSource, videoSource, savetopic]);

  return (
    <ScrollView style={styles.pageWrapper} onScroll={Keyboard.dismiss} scrollEventThrottle={16}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          {currentTarget ? (
            <View style={lstyles.relatedWrapper}>
              <FastImg style={lstyles.relatedImage} source={{uri: currentTarget.cover_url}} />
              <View style={lstyles.relatedInfo}>
                <Text style={lstyles.relatedName} numberOfLines={1}>
                  {currentTarget.name}
                </Text>
                <Text style={lstyles.relatedText} numberOfLines={1}>
                  {currentTarget.desc_tip}
                </Text>
              </View>
            </View>
          ) : null}

          <View style={styles.rateWrapper}>
            <Text style={styles.rateTitle}>
              {rateType === 'space' ? '场地评价' : rateType === 'shop_store' ? '顽士多评价' : ''}
            </Text>
            <PublishRateScore score={score} setScore={setScore} />
            <Text style={styles.rateText}>{ReturnScoreText(score)}</Text>
          </View>

          <TextInput
            style={styles.content}
            multiline
            textAlignVertical="top"
            selectionColor="#ff193a"
            placeholder="写下评价将对其他人提供重要参考，至少10字"
            value={content}
            onChangeText={onChangeContent}
          />

          <View style={styles.labelWrapper}>
            <Pressable style={styles.addTextNameWrap} onPress={handleGoHashTag}>
              <IconFont name="hashtag" size={14} color="#000" />
              <Text style={styles.addTextName}>话题</Text>
            </Pressable>
            <Pressable style={styles.addTextNameWrap} onPress={handleGoAccount}>
              <IconFont name="at" size={16} color="#000" />
              <Text style={styles.addTextName}>顽友</Text>
            </Pressable>
          </View>

          <UploadMedia
            {...props}
            imageSource={imageSource}
            videoSource={videoSource}
            setImageSource={setImageSource}
            setVideoSource={setVideoSource}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  rateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(22),
  },
  rateTitle: {
    fontWeight: '500',
    marginRight: 10,
  },
  rateText: {
    color: '#bdbdbd',
    fontSize: 12,
  },
  content: {
    minHeight: RFValue(180),
    lineHeight: 20,
    marginTop: RFValue(10),
    textAlign: 'justify',
    letterSpacing: 1,
  },
  labelWrapper: {
    flexDirection: 'row',
    marginBottom: RFValue(22),
  },
  addTextNameWrap: {
    paddingHorizontal: VWValue(10),
    height: RFValue(30),
    backgroundColor: '#F6F6F6',
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  addTextName: {
    fontSize: 12,
    marginLeft: 3,
    fontWeight: '300',
    color: '#3c3c3c',
  },
  finishBtn: {
    marginRight: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#BDBDBD',
  },
});

export default MediasPicker(NewTopic);
