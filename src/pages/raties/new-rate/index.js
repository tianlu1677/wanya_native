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

import PublishRateScore from './component/publish-rate-score';
import UploadMedia from './component/upload-media';

const NewTopic = props => {
  const dispatch = useDispatch();
  const {navigation, uploadVideo, removeAllPhoto} = props;
  const {
    home: {savetopic},
  } = useSelector(state => state);
  const {movement_ids, shop_store_ids, shop_brand_ids, tag_list, product} = savetopic;
  const [imageSource, setImageSource] = useState([]);
  const [videoSource, setVideoSource] = useState([]);
  const [content, setContent] = useState(savetopic.plan_content);
  const [score, setScore] = useState(0);

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

  const isValidateForm = () => {
    return content && score > 0 ? true : false;
  };

  const getValidateForm = () => {
    const data = {
      type: 'single',
      medias: imageSource.map(v => v.url),
      plain_content: savetopic.plan_content
        ? savetopic.plan_content.trim()
        : imageSource.length > 0
        ? '分享图片'
        : videoSource.length > 0
        ? '分享视频'
        : '',
      mention_ids: savetopic.mention ? savetopic.mention.map(v => v.id).join() : '',
      node_id: savetopic.node ? savetopic.node.id : '',
      space_id: savetopic.space ? savetopic.space.id : '',
      location_id: savetopic.location ? savetopic.location.id : '',
      movement_ids: (movement_ids || []).map(v => v.id).join(),
      shop_store_ids: (shop_store_ids || []).map(v => v.id).join(),
      shop_brand_ids: (shop_brand_ids || []).map(v => v.id).join(),
      product_ids: product?.id || '',
      tag_list: tag_list ? tag_list : [],
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

    const data = getValidateForm();

    if (videoSource.length > 0) {
      // 先上传视频再发布
      Toast.showLoading('正在发布中...', {duration: 3000});
      const params = {
        content: {video: {...videoSource[0]}, content: {...data}},
        upload: (file, cb) => uploadVideo(file, cb),
      };
      dispatch(changeUploadStatus({...params, status: 'upload', progress: 0}));
      // 等待200ms再跳转，避免首页还没有拿到redux里面的值
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
        navigation.reset({index: 0, routes: [{name: 'TopicDetail', params: {topicId: res.id}}]});
        dispatch({type: action.SAVE_NEW_TOPIC, value: {}});
      } catch (err) {
        Toast.hide();
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch({type: action.SAVE_NEW_TOPIC, value: {}});
      removeAllPhoto();
    };
  }, []);

  useEffect(() => {
    setContent(savetopic.plan_content);
  }, [savetopic]);

  useLayoutEffect(() => {
    const hitSlop = {top: 10, bottom: 10, left: 5, right: 5};

    const LeftBtn = () => {
      const handleClose = () => navigation.goBack();
      return (
        <Pressable onPress={handleClose} style={{padding: 5}} hitSlop={hitSlop}>
          <IconFont name="close" size={14} />
        </Pressable>
      );
    };

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
      headerLeft: () => <LeftBtn />,
      headerRight: () => <RightBtn />,
    });
  }, [navigation, imageSource, videoSource, savetopic]);

  return (
    <ScrollView style={styles.pageWrapper}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <View style={styles.relatedWrapper}>
            <FastImg
              style={styles.relatedImage}
              source={require('@/assets/images/add-video.png')}
            />
            <View style={styles.relatedInfo}>
              <Text style={styles.relatedName} numberOfLines={1}>
                {/* {movement_ids[0].name.trim()} */}
                32323
              </Text>
              <Text style={styles.relatedText} numberOfLines={1}>
                {/* {movement_ids[0].desc_tip} */}
                32323
              </Text>
            </View>
          </View>

          <View style={styles.rateWrapper}>
            <Text style={styles.rateText}>场地评价</Text>
            <PublishRateScore score={score} setScore={setScore} />
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
  rateText: {
    fontWeight: '500',
    marginRight: 10,
  },
  content: {
    minHeight: RFValue(180),
    lineHeight: 20,
    marginTop: 10,
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
  relatedWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(10),
    backgroundColor: '#000',
    borderRadius: 9,
  },
  relatedImage: {
    width: RFValue(33),
    height: RFValue(33),
    marginRight: 8,
    borderRadius: 6,
  },
  relatedInfo: {
    flex: 1,
  },
  relatedName: {
    color: '#fff',
    fontWeight: '500',
  },
  relatedText: {
    color: '#bdbdbd',
    fontSize: RFValue(10),
    fontWeight: '300',
    marginTop: 4,
  },
});

export default MediasPicker(NewTopic);
