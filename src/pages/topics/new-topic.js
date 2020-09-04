import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import MediasPicker from '@/components/MediasPicker';
import {getUploadFileToken, saveToAsset} from '@/api/settings_api';
import {createTopic} from '@/api/topic_api';
import Upload from 'react-native-background-upload';
import {ModalLoading} from '@/components/NodeComponents';

const NewTopic = props => {
  console.log(props);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);
  const [imageSource, setImageSource] = useState([]);
  const [content, setContent] = useState(savetopic.plan_content);
  const [videoSource, setVideoSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangeContent = text => {
    setContent(text);
    const topics = {...savetopic, plan_content: text};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
  };

  const onImagePicker = async () => {
    const options = {
      imageCount: 9 - imageSource.length,
    };
    props.imagePick(options, (err, res) => {
      if (err) {
        return;
      }
      setImageSource(res);
    });
  };

  const onVideoPicker = async () => {
    const token_res = await getUploadFileToken({ftype: 'mp4'});
    let upload_token = token_res.token;
    props.videoPick({}, (err, res) => {
      setVideoSource(res);
      if (err) {
        return;
      }
      let filePath = res[0].uri;
      let defaultOptions = {
        url: token_res.qiniu_region,
        path: filePath,
        method: 'POST',
        type: 'multipart',
        field: 'file',
        parameters: {
          token: upload_token,
          key: token_res.file_key,
          name: 'file',
        },
        maxRetries: 2, // set retry count (Android only). Default 2
        headers: {
          'content-type': 'application/octet-stream',
        },

        // Below are options only supported on Android
        notification: {
          enabled: true,
        },
        useUtf8Charset: true,
      };
      let uploadOptions = {...defaultOptions};

      console.log('uploadOptions', uploadOptions);
      Upload.startUpload(uploadOptions)
        .then(uploadId => {
          console.log('Upload started');
          Upload.addListener('progress', uploadId, data => {
            // console.log(`Progress: ${data.progress}%`);
          });
          Upload.addListener('error', uploadId, data => {
            console.log(`Error: ${data.error}%`);
          });
          Upload.addListener('cancelled', uploadId, data => {
            console.log('Cancelled!');
          });
          Upload.addListener('completed', uploadId, data => {
            // data includes responseCode: number and responseBody: Object
            console.log('Completed!');
            console.log(data);
            let upload_res = JSON.parse(data.responseBody);
            if (upload_res.key) {
              let video_m3u8 = upload_res.key.replace('mp4', 'm3u8');
              let body = {
                asset: {
                  file_key: upload_res.key,
                  fname: upload_res.key,
                  // 获取到这些填写宽高以及尺寸
                  // width: videoRes.width,
                  // height: videoRes.height,
                  // fsize: videoRes.size,
                  // seconds: videoRes.duration,
                  category: 'video',
                  video_m3u8: video_m3u8,

                  // seconds: videoRes.duration
                  // errMsg: "chooseVideo:ok"
                  // height: 960
                  // size: 1382371
                  // tempFilePath: "http://tmp/wxee56e8f240c9e89b.o6zAJs5U5gQmjzIncsPzpCrNt7DE.kQ9QwnJr20ry3adb3207a9a3a9d7f6b95e9ee7777e94.mp4"
                  // thumbTempFilePath: "http://tmp/wxee56e8f240c9e89b.o6zAJs5U5gQmjzIncsPzpCrNt7DE.jxUlqGJ7Pgww849b80f49b079e0b6a0792f1ae4f7602.jpg"
                  // width: 544
                },
              };
              saveToAsset(body).then(res => {
                console.log(res);
              });
            }
          });
        })
        .catch(err => {
          console.log('Upload error!', err);
        });
    });
  };

  const deleteMedia = index => {
    props.removeImage(index);
    const image = imageSource.filter((v, i) => i !== index);
    const video = videoSource.filter((v, i) => i !== index);

    setImageSource(image);
    setVideoSource(video);
  };

  const onSubmit = async () => {
    setLoading(true);
    let mediasImg = [];
    if (imageSource.length > 0) {
      await Promise.all(
        imageSource.map(async file => {
          const res = await props.uploadImage({uploadType: 'multipart', ...file});
          mediasImg = [...mediasImg, res.asset];
        })
      );
    }

    let video_content = '';
    if (videoSource) {
      const res = await props.uploadImage({uploadType: 'raw', ...videoSource});
      console.log(res);
      video_content = res.asset;
    }
    console.log(video_content);

    // 先上传资源
    const data = {
      type: 'single',
      medias: mediasImg.map(v => v.url),
      plain_content: savetopic.plan_content,
      mention_ids: savetopic.mention.map(v => v.id).join(),
      node_id: savetopic.node ? savetopic.node.id : '',
      space_id: savetopic.node ? savetopic.space.id : '',
    };
    const res = await createTopic(data);
    console.log(res);
    setLoading(false);
  };

  useEffect(() => {
    setContent(savetopic.plan_content);
  }, [savetopic]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
      headerLeft: () => <Button onPress={() => navigation.goBack()} title="关闭" color="#000" />,
      headerRight: () => <Button onPress={onSubmit} title="发布" color="#000" />,
    });
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      {loading && <ModalLoading title="正在发布中" />}
      <View style={styles.mediaCon}>
        {/* picture */}
        {videoSource.length === 0 && (
          <TouchableOpacity onPress={onImagePicker}>
            <Image style={styles.mediaWrap} source={require('@/assets/images/add-photo.png')} />
          </TouchableOpacity>
        )}

        {imageSource.map((v, index) => (
          <View style={styles.mediaWrap} key={index}>
            <Image key={index} style={styles.media} source={v} />
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
            <Video
              style={styles.media}
              source={v}
              posterResizeMode={'center'}
              controls
              reportBandwidth
              repeat
            />
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
          <IconFont name="quanzi1" color={savetopic.node ? '#000' : '#c2c2c2'} />
          <Text style={[styles.addText, savetopic.node && styles.selectText]}>
            {savetopic.node ? savetopic.node.name : '选择圈子（必选）'}
          </Text>
          <IconFont name="fanhui1" size={14} style={styles.backarrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addSlide} onPress={() => navigation.navigate('AddSpace')}>
          <IconFont name="changdiweizhi" color={savetopic.space ? '#000' : '#c2c2c2'} />
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
