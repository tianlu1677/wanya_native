import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {
  View,
  Keyboard,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';
import Video from 'react-native-video';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import MediasPicker from '@/components/MediasPicker';
import {createTopic} from '@/api/topic_api';
import Toast from '@/components/Toast';
import GetLocation from '@/components/GetLocation';
import {dispatchPreviewImage} from '@/redux/actions';
const windowWidth = Dimensions.get('window').width;

const mediaSize = (windowWidth - 60 - 30) / 4; //图片尺寸

const NewTopic = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const savetopic = useSelector(state => state.home.savetopic);
  const uploadProgress = useSelector(state => state.home.uploadProgress);
  const location = useSelector(state => state.home.location);
  const videoRef = useRef('');

  // const defaultVideo = [
  //   {id: 1, url: 'http://xinxuefile.meirixinxue.com/assets/d479716443f6aca08c4e45135509bd03.mp4'},
  // ];
  const defaultVideo = [];
  const [imageSource, setImageSource] = useState([]);
  const [videoSource, setVideoSource] = useState(defaultVideo);

  const [content, setContent] = useState(savetopic.plan_content);

  const onChangeContent = text => {
    setContent(text);
    const topics = {...savetopic, plan_content: text};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
  };

  const getLocation = res => {
    if (res.position && res.position.coords) {
      dispatch({type: action.GET_LOCATION, value: {...location, ...res.position.coords}});
    }
    navigation.navigate('AddSpace');
  };

  const onImagePicker = () => {
    props.removeAllPhoto();
    const options = {
      imageCount: 9 - imageSource.length,
    };
    props.imagePick(options, async (err, res) => {
      if (err) {
        return;
      }
      const allImage = [...imageSource, ...res];
      setImageSource([...allImage]);
      for (let [index, file] of new Map(allImage.map((item, i) => [i, item]))) {
        if (!file.id) {
          const result = await props.uploadImage({uploadType: 'multipart', ...file});
          allImage[index] = result.asset;
          setImageSource([...allImage]);
        }
      }
    });
  };

  const onVideoPicker = () => {
    props.removeAllPhoto();
    props.videoPick({}, async (err, res) => {
      if (err) {
        return;
      }
      setVideoSource([...res]);
      const result = await props.uploadVideo(res[0], dispatch);
      setVideoSource([result.asset]);
      dispatch({type: action.UPLOAD_PROGRESS, value: ''});
    });
  };

  const deleteMedia = index => {
    props.removeImage(index);
    const image = imageSource.filter((v, i) => i !== index);
    const video = videoSource.filter((v, i) => i !== index);

    setImageSource([...image]);
    setVideoSource(video);
  };

  const isValidateForm = () => {
    if (imageSource.length === 0 && videoSource.length === 0 && !content) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async () => {
    if (!isValidateForm()) {
      Toast.show('图片/视频不能为空哦~');
      return false;
    }

    if (imageSource.length > 0) {
      const isImageLoading = imageSource.every(v => v.id);
      if (!isImageLoading) {
        Toast.show('图片正在上传中');
        return false;
      }
    }

    if (videoSource.length > 0) {
      if (!videoSource[0].id) {
        Toast.show('视频正在上传中');
        return false;
      }
    }

    if (!savetopic.node) {
      navigation.navigate('AddNode');
      return false;
    }

    const data = {
      type: 'single',
      medias: imageSource.map(v => v.url),
      video_content: videoSource.length > 0 ? videoSource[0].url : '',
      plain_content: savetopic.plan_content
        ? savetopic.plan_content
        : imageSource.length > 0
        ? '分享图片'
        : videoSource.length > 0
        ? '分享视频'
        : '',
      mention_ids: savetopic.mention ? savetopic.mention.map(v => v.id).join() : '',
      node_id: savetopic.node ? savetopic.node.id : '',
      space_id: savetopic.space ? savetopic.space.id : '',
    };

    console.log(data);
    Toast.showLoading('正在发布中...');
    try {
      const res = await createTopic(data);
      Toast.hide();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'TopicDetail', params: {topicId: res.id}}],
        })
      );

      dispatch({type: action.SAVE_NEW_TOPIC, value: {}});
    } catch {
      Toast.hide();
    }
  };

  const onPreview = (index = 0) => {
    const data = {
      images: imageSource.map(v => {
        return {url: v.url};
      }),
      visible: true,
      index,
    };
    dispatch(dispatchPreviewImage(data));
  };

  const LeftBtn = () => {
    return (
      <Pressable
        onPress={() => navigation.goBack()}
        style={{paddingLeft: 5}}
        hitSlop={{top: 10, bottom: 10, left: 5, right: 5}}>
        <IconFont name={'close'} size={14} />
      </Pressable>
    );
  };

  const RightBtn = () => {
    return (
      <Pressable onPress={onSubmit}>
        <Text style={[styles.finishBtn, {color: isValidateForm() ? '#000' : '#bdbdbd'}]}>发布</Text>
      </Pressable>
    );
  };

  useEffect(() => {
    setContent(savetopic.plan_content);
  }, [savetopic]);

  useEffect(() => {
    // 清空数据
    return () => {
      dispatch({type: action.SAVE_NEW_TOPIC, value: {}});
      props.removeAllPhoto();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
      headerLeft: () => <LeftBtn />,
      headerRight: () => <RightBtn />,
    });
  }, [navigation, imageSource, videoSource, savetopic]);

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.wrapper}>
          <View style={styles.mediaCon}>
            {/* picture */}
            {imageSource.map((v, index) => (
              <View
                style={[styles.mediaWrap, {marginRight: (index + 1) % 4 === 0 ? 0 : 10}]}
                key={index}>
                {v.id ? (
                  <>
                    <Pressable onPress={() => onPreview(index)}>
                      <Image key={index} style={styles.media} source={{uri: v.url}} />
                    </Pressable>
                    <Pressable onPress={() => deleteMedia(index)} style={styles.mediaCloseWrap}>
                      <Image
                        style={styles.mediaClose}
                        source={require('@/assets/images/close.png')}
                      />
                    </Pressable>
                  </>
                ) : (
                  <Image
                    key={index}
                    style={styles.media}
                    source={require('@/assets/images/loading.gif')}
                  />
                )}
              </View>
            ))}
            {videoSource.length === 0 && imageSource.length !== 9 && (
              <Pressable onPress={onImagePicker}>
                <Image
                  style={[styles.mediaWrap]}
                  source={require('@/assets/images/add-photo.png')}
                />
              </Pressable>
            )}

            {/* video */}
            {videoSource.map((v, index) => (
              <Pressable
                style={[styles.mediaWrap, {marginRight: (index + 1) % 4 === 0 ? 0 : 10}]}
                key={index}>
                {v.id ? (
                  <>
                    <Pressable
                      style={styles.media}
                      onPress={() => {
                        videoRef.current.presentFullscreenPlayer();
                      }}>
                      <Video
                        style={styles.media}
                        ref={videoRef}
                        source={{uri: v.url}}
                        posterResizeMode={'center'}
                        controls={false}
                        muted
                        reportBandwidth
                        repeat
                        onFullscreenPlayerDidDismiss={() => {
                          videoRef.current.seek(0);
                        }}
                      />
                    </Pressable>
                    <Pressable onPress={() => deleteMedia(index)} style={styles.mediaCloseWrap}>
                      <Image
                        style={styles.mediaClose}
                        source={require('@/assets/images/close.png')}
                      />
                    </Pressable>
                  </>
                ) : (
                  <View style={[styles.media, styles.progress]}>
                    <View style={styles.progressWrap}>
                      <Text style={styles.proNum}>{uploadProgress}</Text>
                      <Text style={styles.proPercent}>%</Text>
                    </View>
                  </View>
                )}
              </Pressable>
            ))}

            {imageSource.length === 0 && videoSource.length === 0 && (
              <Pressable onPress={onVideoPicker}>
                <Image style={styles.mediaWrap} source={require('@/assets/images/add-video.png')} />
              </Pressable>
            )}
          </View>
          <TextInput
            style={styles.content}
            multiline
            textAlignVertical="top"
            placeholder={
              currentAccount.publish_topics_count > 0 ? '记录与分享' : '快开始写下你的第一篇帖子吧~'
            }
            onChangeText={onChangeContent}
            value={content}
            selectionColor={'blue'}
          />
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={styles.addTextNameWrap}
              onPress={() => navigation.navigate('AddHashTag')}>
              <IconFont name={'hashtag'} size={13} color="#000" />
              <Text style={styles.addTextName}>话题</Text>
            </Pressable>
            <Pressable
              style={styles.addTextNameWrap}
              onPress={() => navigation.navigate('AddMentionAccount')}>
              <IconFont name={'at'} size={13} color="#000" />
              <Text style={styles.addTextName}>顽友</Text>
            </Pressable>
          </View>
          <View style={styles.addWrapper}>
            <Pressable style={styles.addSlide} onPress={() => navigation.navigate('AddNode')}>
              <IconFont name="blank-node" color={savetopic.node ? '#000' : '#c2c2c2'} size={16} />
              <Text style={[styles.addText, savetopic.node && styles.selectText]}>
                {savetopic.node ? savetopic.node.name : '选择圈子（必选）'}
              </Text>
              <IconFont name="arrow-right" size={10} style={styles.backarrow} color="#c2c2c2" />
            </Pressable>
            <GetLocation handleClick={getLocation} style={styles.addSlide}>
              <IconFont name="space-point" color={savetopic.space ? '#000' : '#c2c2c2'} size={16} />
              <Text style={[styles.addText, savetopic.space && styles.selectText]}>
                {savetopic.space ? savetopic.space.name : '选择场地'}
              </Text>
              <IconFont name="arrow-right" size={10} style={styles.backarrow} color="#c2c2c2" />
            </GetLocation>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 20,
  },
  mediaCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 7,
  },
  mediaWrap: {
    position: 'relative',
    width: mediaSize,
    height: mediaSize,
    marginRight: 10,
    marginBottom: 10,
  },
  media: {
    width: 71,
    height: 71,
  },
  mediaCloseWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingLeft: 10,
    paddingBottom: 10,
    textAlign: 'right',
  },
  mediaClose: {
    width: 15,
    height: 15,
  },
  progress: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  progressWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  proNum: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '500',
  },
  proPercent: {
    color: '#fff',
    fontSize: 10,
    position: 'absolute',
    right: -10,
    bottom: 3,
  },
  content: {
    minHeight: 90,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },
  addTextNameWrap: {
    width: 63,
    height: 30,
    borderColor: '#cfd1dd',
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    overflow: 'hidden',
  },
  addTextName: {
    fontSize: 13,
    marginLeft: 3,
  },
  addWrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb',
    marginTop: 24,
  },
  addSlide: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    paddingLeft: 6,
  },
  addText: {
    fontSize: 13,
    marginLeft: 7,
    color: '#c2c2c2',
  },
  selectText: {
    color: '#000000',
  },
  backarrow: {
    marginLeft: 'auto',
    marginRight: 7,
  },
  submitBtn: {
    fontWeight: '500',
  },

  finishBtn: {
    marginRight: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#BDBDBD',
  },
});

export default MediasPicker(NewTopic);
