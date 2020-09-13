import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import MediasPicker from '@/components/MediasPicker';
import {createTopic} from '@/api/topic_api';
import Toast from '@/components/Toast';

const NewTopic = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);
  const uploadProgress = useSelector(state => state.home.uploadProgress);

  const [imageSource, setImageSource] = useState([]);
  const [videoSource, setVideoSource] = useState([]);

  const [content, setContent] = useState(savetopic.plan_content);

  const onChangeContent = text => {
    setContent(text);
    const topics = {...savetopic, plan_content: text};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
  };

  const onImagePicker = () => {
    const options = {
      imageCount: 9 - imageSource.length,
    };
    props.imagePick(options, async (err, res) => {
      if (err) {
        return;
      }
      setImageSource([...res]);
      for (let [index, file] of new Map(res.map((item, i) => [i, item]))) {
        const result = await props.uploadImage({uploadType: 'multipart', ...file});
        imageSource[index] = result.asset;
        setImageSource([...imageSource]);
      }
    });
  };

  const onVideoPicker = () => {
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

  const onSubmit = async () => {
    if (imageSource.length === 0 && videoSource.length === 0) {
      return Toast.show('图片/视频不能为空哦~');
    }

    if (imageSource.length > 0) {
      const isImageLoading = imageSource.every(v => v.id);
      if (!isImageLoading) {
        return Toast.show('图片正在上传中');
      }
    }

    if (videoSource.length > 0) {
      if (!videoSource[0].id) {
        return Toast.show('视频正在上传中');
      }
    }

    if (savetopic.node && !savetopic.node.id) {
      navigation.navigate('AddNode');
    }

    const data = {
      type: 'single',
      medias: imageSource.map(v => v.url),
      video_content: videoSource.length > 0 ? videoSource[0].url : '',
      plain_content: savetopic.plan_content,
      mention_ids: savetopic.mention.map(v => v.id).join(),
      node_id: savetopic.node ? savetopic.node.id : '',
      space_id: savetopic.space ? savetopic.space.id : '',
    };
    Toast.showLoading('正在发布中...');
    const res = await createTopic(data);
    Toast.hide();
    navigation.navigate('TopicDetail', {topicId: res.id});
    dispatch({type: action.SAVE_NEW_TOPIC, value: {}});
  };

  useEffect(() => {
    setContent(savetopic.plan_content);
  }, [savetopic]);

  const closeBut = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
      headerLeft: () => <Button onPress={() => closeBut()} title="关闭" color="#000" />,
      headerRight: () => <Button onPress={onSubmit} title="发布" color="#000" />,
    });
  }, [navigation, imageSource, savetopic]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.mediaCon}>
        {/* picture */}
        {videoSource.length === 0 && (
          <TouchableOpacity onPress={onImagePicker}>
            <Image style={styles.mediaWrap} source={require('@/assets/images/add-photo.png')} />
          </TouchableOpacity>
        )}

        {imageSource.map((v, index) => (
          <View style={styles.mediaWrap} key={index}>
            {v.id ? (
              <Image key={index} style={styles.media} source={{uri: v.url}} />
            ) : (
              <Image
                key={index}
                style={styles.media}
                source={require('@/assets/images/loading.gif')}
              />
            )}
            <TouchableOpacity onPress={() => deleteMedia(index)} style={styles.mediaClose}>
              <Image style={styles.mediaClose} source={require('@/assets/images/close.png')} />
            </TouchableOpacity>
          </View>
        ))}

        {/* video */}
        {imageSource.length === 0 && videoSource.length === 0 && (
          <TouchableOpacity onPress={onVideoPicker}>
            <Image style={styles.mediaWrap} source={require('@/assets/images/add-video.png')} />
          </TouchableOpacity>
        )}

        {videoSource.map((v, index) => (
          <View style={styles.mediaWrap} key={index}>
            {v.id ? (
              <Video
                style={styles.media}
                source={{uri: v.url}}
                posterResizeMode={'center'}
                controls
                reportBandwidth
                repeat
              />
            ) : (
              <View style={[styles.media, styles.progress]}>
                <View style={styles.progressWrap}>
                  <Text style={styles.proNum}>{uploadProgress}</Text>
                  <Text style={styles.proPercent}>%</Text>
                </View>
              </View>
            )}

            <TouchableOpacity onPress={() => deleteMedia(0)} style={styles.mediaClose}>
              <Image style={styles.mediaClose} source={require('@/assets/images/close.png')} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TextInput
        style={styles.content}
        multiline
        textAlignVertical="top"
        placeholder="记录与分享"
        onChangeText={onChangeContent}
        value={content}
      />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.addTextName} onPress={() => navigation.navigate('AddHashTag')}>
          # 话题
        </Text>
        <Text style={styles.addTextName} onPress={() => navigation.navigate('AddMentionAccount')}>
          @ 顽友
        </Text>
      </View>
      <View style={styles.addWrapper}>
        <TouchableOpacity style={styles.addSlide} onPress={() => navigation.navigate('AddNode')}>
          <IconFont name="node-solid" color={savetopic.node ? '#000' : '#c2c2c2'} />
          <Text style={[styles.addText, savetopic.node && styles.selectText]}>
            {savetopic.node ? savetopic.node.name : '选择圈子（必选）'}
          </Text>
          <IconFont name="fanhui1" size={14} style={styles.backarrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addSlide} onPress={() => navigation.navigate('AddSpace')}>
          <IconFont name="space-point" color={savetopic.space ? '#000' : '#c2c2c2'} />
          <Text style={[styles.addText, savetopic.space && styles.selectText]}>
            {savetopic.space ? savetopic.space.name : '选择场地'}
          </Text>
          <IconFont name="fanhui1" size={14} style={styles.backarrow} />
        </TouchableOpacity>
      </View>
    </View>
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
  },
  mediaWrap: {
    position: 'relative',
    width: 71,
    height: 71,
    marginRight: 10,
    marginBottom: 10,
  },
  media: {
    width: 71,
    height: 71,
  },
  mediaClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 15,
    height: 15,
  },
  progress: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  proNum: {
    color: '#fff',
    fontSize: 21,
  },
  proPercent: {
    color: '#fff',
    fontSize: 10,
    position: 'absolute',
    right: -10,
    bottom: 4,
  },
  content: {
    minHeight: 90,
  },
  addTextName: {
    width: 63,
    height: 30,
    lineHeight: 30,
    borderColor: '#cfd1dd',
    borderWidth: 1,
    textAlign: 'center',
    marginRight: 12,
  },
  addWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#ebebeb',
    marginTop: 24,
  },
  addSlide: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    paddingLeft: 7,
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
  },
  submitBtn: {
    fontWeight: '500',
  },
});

export default MediasPicker(NewTopic);
