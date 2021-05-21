import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable, Dimensions, StatusBar} from 'react-native';
import {Platform, ScrollView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import PermissionModal from './PhotoPermission';
import * as action from '@/redux/constants';
import {dispatchPreviewImage, changeUploadStatus} from '@/redux/actions';
import IconFont from '@/iconfont';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import MediasPicker from '@/components/MediasPicker';
import {createTopic} from '@/api/topic_api';
import Toast from '@/components/Toast';
import GetLocation from '@/components/GetLocation';
import FastImg from '@/components/FastImg';
import {getLocation} from '@/api/space_api';
import {loadLocation} from '@/pages/home/getLocation';

const {width: windowWidth} = Dimensions.get('window');
const mediaSize = (windowWidth - 60 - 30) / 4; //图片尺寸

const NewTopic = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const videoRef = useRef('');
  const {currentAccount} = useSelector(state => state.account);
  const {savetopic, location} = useSelector(state => state.home);
  const {movement_ids, shop_store_ids, shop_brand_ids} = savetopic;
  const [imageSource, setImageSource] = useState([]);
  const [videoSource, setVideoSource] = useState([]);
  const [linkSource, setLinkSource] = useState(null);
  const [permissionModal, setPermissionModal] = useState(false); // 显示权限页面
  const [content, setContent] = useState(savetopic.plan_content);
  const [tagWidth, setTagWidth] = useState(1);

  const onChangeContent = text => {
    setContent(text);
    const topics = {...savetopic, plan_content: text};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
  };

  const getCurrentLocation = async res => {
    if (res === false) {
      // 拒绝权限
      dispatch({type: action.GET_LOCATION, value: {}});
      return;
    }

    if (location) {
      // loction 缓存
      navigation.navigate('AddSpace', {type: 'topic'});
      return;
    }

    // 获取到权限信息
    if (res.position && res.position.coords) {
      const {latitude, longitude} = res.position.coords;
      const {city} = (await getLocation({latitude, longitude})).data;
      dispatch({
        type: action.GET_LOCATION,
        value: {...location, ...res.position.coords, positionCity: city, chooseCity: city},
      });
      navigation.navigate('AddSpace', {type: 'topic'});
    }
  };

  const checkPermission = async () => {
    const imagePermission =
      Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.CAMERA;
    const status = await check(imagePermission);
    if (status === RESULTS.GRANTED) {
      return true;
    }

    if (status === RESULTS.DENIED) {
      request(imagePermission).then(result => {
        console.log('result', result);
      });
      return true;
    }

    if (status === RESULTS.BLOCKED) {
      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        console.log('result', result);
      });
      setPermissionModal(true);
      return false;
    }
  };

  const onImagePicker = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      return;
    }
    props.removeAllPhoto();
    const options = {imageCount: 9 - imageSource.length, isCamera: false};
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

  //TODO 限制描述
  const onVideoPicker = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      return;
    }
    props.removeAllPhoto();
    const systemVersion = parseInt(DeviceInfo.getSystemVersion());
    const videoSelectType =
      Platform.OS === 'ios' && systemVersion < 14 ? 'imagePicker' : 'syanPicker';

    if (videoSelectType === 'syanPicker') {
      props.videoPick(
        {
          MaxSecond: 300,
          MinSecond: 1,
          recordVideoSecond: 60,
          videoCount: 1,
          allowTakeVideo: false,
        },
        async (err, res) => {
          if (err) {
            return;
          }
          setVideoSource(res);
        }
      );
    }

    // react-native-image-picker
    if (videoSelectType === 'imagePicker') {
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'video',
          videoQuality: 'low',
        },
        async response => {
          if (response.didCancel) {
            return;
          }
          console.log({uri: response.origURL});
          setVideoSource([{uri: response.origURL}]);
        }
      );
    }
  };

  const deleteMedia = index => {
    props.removeImage(index);
    const image = imageSource.filter((v, i) => i !== index);
    const video = videoSource.filter((v, i) => i !== index);
    setImageSource([...image]);
    setVideoSource(video);
  };

  const onAddLink = () => {
    navigation.navigate('AddLink');
  };

  const onDeleteLink = () => {
    setLinkSource(null);
    const topics = {...savetopic, linkContent: null};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
  };

  const isValidateForm = () => {
    //图片 视频 外链 文字 选1+node
    if (imageSource.length === 0 && videoSource.length === 0 && !content && !linkSource) {
      return false;
    } else {
      return true;
    }
  };

  const getValidateForm = () => {
    const data = {
      type: 'single',
      medias: imageSource.map(v => v.url),
      topic_link_id: linkSource ? linkSource.id : '',
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
    };
    return data;
  };

  const onSubmit = async () => {
    if (!isValidateForm()) {
      Toast.show('图片/视频/外链不能为空哦~');
      return false;
    }

    if (imageSource.length > 0) {
      const isImageLoading = imageSource.every(v => v.id);
      if (!isImageLoading) {
        Toast.show('图片正在上传中');
        return false;
      }
    }

    if (!savetopic.node) {
      navigation.navigate('AddNode');
      return false;
    }

    const data = getValidateForm();
    if (videoSource.length > 0) {
      // 视频上传
      navigation.reset({
        index: 0,
        routes: [{name: 'Recommend', params: {activityKey: 'follow'}}],
      });
      const params = {
        content: {
          video: {...videoSource[0]},
          content: {...data},
        },
        upload: (file, cb) => props.uploadVideo(file, cb),
      };
      dispatch(changeUploadStatus({...params, status: 'upload', progress: 0}));
    } else {
      //other
      Toast.showLoading('正在发布中...');
      // const waitTime = ms => new Promise(resolve => setTimeout(resolve, ms));
      try {
        const res = await createTopic(data);
        // await waitTime(1500);
        Toast.hide();
        props.navigation.reset({
          index: 0,
          routes: [{name: 'TopicDetail', params: {topicId: res.id}}],
        });
        dispatch({type: action.SAVE_NEW_TOPIC, value: {}});
      } catch (err) {
        Toast.hide();
        console.log(err);
      }
    }
  };

  const onPreview = (index = 0) => {
    const images = imageSource.map(v => {
      return {url: v.url};
    });
    const data = {images, visible: true, index};
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
    setLinkSource(savetopic.linkContent);
  }, [savetopic]);

  useEffect(() => {
    if (!location) {
      setTimeout(() => {
        // 如果在effect里面，必须等待500ms
        loadLocation(dispatch);
      }, 500);
    }

    return () => {
      dispatch({type: action.SAVE_NEW_TOPIC, value: {}});
      props.removeAllPhoto();
    };
  }, []);

  useEffect(() => {
    if (location && location.createLocation) {
      dispatch({
        type: action.SAVE_NEW_TOPIC,
        value: {...savetopic, location: location.createLocation},
      });
    }
  }, [location]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
      headerLeft: () => <LeftBtn />,
      headerRight: () => <RightBtn />,
    });
  }, [navigation, imageSource, videoSource, savetopic, linkSource]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.wrapper}>
          <PermissionModal
            visible={permissionModal}
            cancleClick={() => {
              setPermissionModal(false);
            }}
          />
          <View style={styles.mediaCon}>
            {/* picture */}
            {imageSource.map((v, index) => (
              <View
                style={[styles.mediaWrap, {marginRight: (index + 1) % 4 === 0 ? 0 : 10}]}
                key={index}>
                {v.id ? (
                  <>
                    <Pressable onPress={() => onPreview(index)}>
                      <FastImg key={index} style={styles.media} source={{uri: v.url}} />
                    </Pressable>
                    <Pressable onPress={() => deleteMedia(index)} style={styles.mediaCloseWrap}>
                      <FastImg
                        style={styles.mediaClose}
                        source={require('@/assets/images/close.png')}
                      />
                    </Pressable>
                  </>
                ) : (
                  <FastImg
                    key={index}
                    style={styles.media}
                    source={require('@/assets/images/loading.gif')}
                  />
                )}
              </View>
            ))}

            {/* picture empty */}
            {videoSource.length === 0 && !linkSource && imageSource.length !== 9 && (
              <Pressable
                onPress={onImagePicker}
                style={[
                  styles.mediaWrap,
                  {marginRight: imageSource.length > 0 && imageSource.length % 3 === 0 ? 0 : 10},
                ]}>
                <FastImg style={styles.media} source={require('@/assets/images/add-photo.png')} />
              </Pressable>
            )}

            {/* video */}
            {videoSource.map((v, index) => (
              <Pressable style={[styles.mediaWrap, {backgroundColor: '#000'}]} key={index}>
                <Pressable
                  style={styles.media}
                  onPress={() => {
                    videoRef.current.presentFullscreenPlayer();
                  }}>
                  <Video
                    style={styles.media}
                    ref={videoRef}
                    source={{uri: v.uri}}
                    posterResizeMode={'center'}
                    controls={false}
                    muted={false}
                    reportBandwidth
                    ignoreSilentSwitch="ignore"
                    repeat
                    onFullscreenPlayerDidDismiss={() => {
                      videoRef.current.seek(0);
                    }}
                  />
                </Pressable>
                <Pressable onPress={() => deleteMedia(index)} style={styles.mediaCloseWrap}>
                  <FastImg
                    style={styles.mediaClose}
                    source={require('@/assets/images/close.png')}
                  />
                </Pressable>
              </Pressable>
            ))}

            {/* video empty */}
            {imageSource.length === 0 && videoSource.length === 0 && !linkSource && (
              <Pressable onPress={onVideoPicker}>
                <FastImg
                  style={styles.mediaWrap}
                  source={require('@/assets/images/add-video.png')}
                />
              </Pressable>
            )}

            {/* link empty */}
            {imageSource.length === 0 && videoSource.length === 0 && !linkSource && (
              <Pressable onPress={onAddLink}>
                <FastImg
                  style={styles.mediaWrap}
                  source={require('@/assets/images/add-link.png')}
                />
              </Pressable>
            )}

            {/* link */}
            {linkSource && (
              <View style={styles.linkWrapper}>
                <View style={styles.linkImageWrap}>
                  <FastImg
                    source={{uri: linkSource.cover_url}}
                    mode={'cover'}
                    style={{width: 45, height: 45}}
                  />
                  {linkSource.outlink_type === 'music' && (
                    <IconFont name="sanjiaoxing" size="12" style={styles.linkImage} />
                  )}
                </View>
                <Text style={styles.linkText} numberOfLines={2}>
                  {linkSource.title || linkSource.raw_link}
                </Text>
                <Pressable onPress={onDeleteLink}>
                  <IconFont
                    name={'qingchu'}
                    size={15}
                    style={{marginLeft: 22, marginRight: 4}}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  />
                </Pressable>
              </View>
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
            selectionColor={'#ff193a'}
          />
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={styles.addTextNameWrap}
              onPress={() => navigation.navigate('AddHashTag')}
              onLayout={e => setTagWidth(e.nativeEvent.layout.width)}>
              <IconFont name={'hashtag'} size={14} color="#000" />
              <Text style={styles.addTextName}>话题</Text>
            </Pressable>
            <Pressable
              style={styles.addTextNameWrap}
              onPress={() => navigation.navigate('AddMentionAccount', {type: 'add-node'})}>
              <IconFont name={'at'} size={16} color="#000" />
              <Text style={styles.addTextName}>顽友</Text>
            </Pressable>
            <GetLocation
              handleClick={getCurrentLocation}
              style={{maxWidth: windowWidth - 60 - tagWidth * 2 - 12 * 2}}>
              <View style={[styles.addTextNameWrap, {marginRight: 0}]}>
                <IconFont name={'space-point'} size={15} color="#000" />
                <Text style={styles.addTextName} numberOfLines={1}>
                  {savetopic.space?.name || savetopic.location?.name || '场地位置'}
                </Text>
              </View>
            </GetLocation>
          </View>
          <View style={styles.addWrapper}>
            <Pressable style={styles.addSlide} onPress={() => navigation.navigate('AddNode')}>
              <Text style={styles.addText}>关联圈子</Text>
              {savetopic.node && savetopic.node.name ? (
                <View style={styles.checkTextWrap}>
                  <IconFont name="node-solid" size={15} color="#FFE30A" />
                  <Text style={styles.checkText}>{savetopic.node?.name}</Text>
                </View>
              ) : null}
              <IconFont name="arrow-right" size={10} color="#c2c2c2" />
            </Pressable>
            <Pressable style={styles.addSlide} onPress={() => navigation.navigate('AddRelated')}>
              <Text style={styles.addText}>关联顽招/Van Store/品牌等</Text>
              <IconFont name="arrow-right" size={10} color="#c2c2c2" />
            </Pressable>
          </View>

          {/* movement_ids */}
          {movement_ids?.length > 0 ? (
            <View style={styles.relatedWrapper}>
              <View style={styles.related}>
                <FastImg
                  style={styles.relatedImage}
                  source={require('@/assets/images/topic-related.png')}
                />
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.relatedName}>{movement_ids[0].name.trim()}</Text>
                  <Text style={styles.relatedText}>{movement_ids[0].desc_tip}</Text>
                </View>
              </View>
            </View>
          ) : null}

          {/* shop_store_ids */}
          {shop_store_ids?.length > 0 ? (
            <View style={styles.relatedWrapper}>
              <View style={styles.related}>
                <FastImg style={styles.relatedImage} source={{uri: shop_store_ids[0].cover_url}} />
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.relatedName}>{shop_store_ids[0].name.trim()}</Text>
                  <Text style={styles.relatedText}>{shop_store_ids[0].desc_tip}</Text>
                </View>
              </View>
            </View>
          ) : null}

          {/* shop_brand_ids */}
          {shop_brand_ids?.length > 0 ? (
            <View style={styles.relatedWrapper}>
              <View style={styles.related}>
                <FastImg style={styles.relatedImage} source={{uri: shop_brand_ids[0].cover_url}} />
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.relatedName}>{shop_brand_ids[0].name.trim()}</Text>
                  <Text style={styles.relatedText}>{shop_brand_ids[0].desc_tip}</Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 20,
  },
  mediaCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mediaWrap: {
    position: 'relative',
    width: mediaSize,
    height: mediaSize,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  media: {
    width: mediaSize,
    height: mediaSize,
    borderRadius: 6,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  proNum: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '500',
  },
  proPercent: {
    color: '#fff',
    fontSize: 10,
    marginTop: 8,
    marginLeft: 2,
  },
  content: {
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
    marginBottom: RFValue(20),
    marginTop: RFValue(6),
    textAlign: 'justify',
    minHeight: RFValue(180),
    letterSpacing: 1,
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
  addWrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb',
    marginTop: RFValue(14),
  },
  addSlide: {
    flexDirection: 'row',
    alignItems: 'center',
    height: RFValue(50),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    paddingRight: 7,
  },
  addText: {
    fontSize: 14,
    color: '#000000',
    marginRight: 'auto',
  },
  checkTextWrap: {
    height: RFValue(25),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    paddingHorizontal: RFValue(10),
    marginRight: 7,
  },
  checkText: {
    fontSize: 11,
    marginLeft: 5,
    color: '#3c3c3c',
    fontWeight: '300',
  },
  finishBtn: {
    marginRight: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#BDBDBD',
  },
  linkWrapper: {
    flex: 1,
    backgroundColor: '#F2F3F5',
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  linkImageWrap: {
    position: 'relative',
  },
  linkImage: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -6,
    marginLeft: -6,
  },
  linkText: {
    fontSize: 13,
    lineHeight: 20,
    marginVertical: 3,
    color: '#3F3F3F',
    marginLeft: 10,
    textAlign: 'justify',
    flex: 1,
  },
  linkIcon: {
    marginRight: 4,
    marginLeft: 44,
  },
  relatedWrapper: {
    height: RFValue(55),
    backgroundColor: '#000',
    borderRadius: 9,
    justifyContent: 'center',
    paddingLeft: RFValue(10),
    marginTop: RFValue(13),
  },
  related: {
    flexDirection: 'row',
  },
  relatedImage: {
    width: RFValue(33),
    height: RFValue(33),
    marginRight: 8,
    borderRadius: 6,
  },
  relatedName: {
    color: '#fff',
    fontSize: RFValue(14),
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
