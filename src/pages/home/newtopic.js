import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import Toast from 'react-native-root-toast';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import MediasPicker from '@/components/MediasPicker';
import {getUploadFileToken, saveToAsset} from "@/api/settings_api"
import {createTopic} from '@/api/topic_api';
import Upload from 'react-native-background-upload';
import Modal from 'react-native-modal';

const loadingImg =
  'http://file.meirixinxue.com/assets/2020/76272587-9bd6-48e9-b182-692b9ca73e89.gif';

const NewTopic = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);
  const [imageSource, setImageSource] = useState([]);
  const [content, setContent] = useState(savetopic.plan_content);
  const [videoSource, setVideoSource] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true);

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
      setImageSource([...imageSource, ...res]);
    });
  };

  const onVideoPicker = async () => {
    const token_res = await getUploadFileToken({ftype: 'mp4'})
    let upload_token = token_res.token
    props.videoPick({}, (err, res) => {
      console.log('res', res)
      if (err) {
        return;
      }
      let filePath = res[0].uri
      let defaultOptions = {
        url: token_res.qiniu_region,
        path: filePath,
        method: 'POST',
        type: 'multipart',
        field: 'file',
        parameters: {
          token: upload_token, key: token_res.file_key,
          name: 'file'
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
          });
        })
        .catch(err => {
          console.log('Upload error!', err);
        });

      console.log(res[0]);

      setVideoSource(res[0]);
    });
  };

  const onSubmit = async () => {
    let mediasImg = [];

    if (imageSource.length > 0) {
      await Promise.all(
        imageSource.map(async file => {
          const res = await props.upload({uploadType: 'multipart', ...file});
          mediasImg = [...mediasImg, res.asset];
        })
      );
    }

    let video_content = '';
    if (videoSource) {
      const res = await props.upload({uploadType: 'raw', ...videoSource});
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
  };

  useEffect(() => {
    console.log(props);

    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    console.log(videoSource);
  }, [videoSource]);

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
      <View style={styles.mediaCon}>
        {/* picture */}
        {!videoSource && (
          <TouchableOpacity onPress={onImagePicker}>
            <Image style={styles.media} source={require('@/assets/images/add-photo.png')} />
          </TouchableOpacity>
        )}
        {imageSource.map((v, index) => (
          <Image key={index} style={styles.media} source={v} />
        ))}

        {/* video */}
        {imageSource.length === 0 && !videoSource && (
          <TouchableOpacity onPress={onVideoPicker}>
            <Image style={styles.media} source={require('@/assets/images/add-video.png')} />
          </TouchableOpacity>
        )}
        {videoSource && (
          <Video
            style={styles.media}
            source={videoSource}
            posterResizeMode={'center'}
            controls
            reportBandwidth
            repeat
          />
        )}
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
        <Text style={styles.addTextName} onPress={() => navigation.navigate('TopicIndex')}>
          # 话题
        </Text>
        <Text style={styles.addTextName} onPress={() => navigation.navigate('MentionAccounts')}>
          @ 顽友
        </Text>
      </View>
      <View style={styles.addWrapper}>
        <TouchableOpacity style={styles.addSlide} onPress={() => navigation.navigate('NodeIndex')}>
          <IconFont name="quanzi1" color={savetopic.node ? '#000' : '#c2c2c2'} />
          <Text style={[styles.addText, savetopic.node && styles.selectText]}>
            {savetopic.node ? savetopic.node.name : '选择圈子（必选）'}
          </Text>
          <IconFont name="fanhui1" size={14} style={styles.backarrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addSlide} onPress={() => navigation.navigate('SpaceIndex')}>
          <IconFont name="changdiweizhi" color={savetopic.space ? '#000' : '#c2c2c2'} />
          <Text style={[styles.addText, savetopic.space && styles.selectText]}>
            {savetopic.space ? savetopic.space.name : '选择场地'}
          </Text>
          <IconFont name="fanhui1" size={14} style={styles.backarrow} />
        </TouchableOpacity>
      </View>
      {/*
      <Text
        onPress={onSubmit}
        style={{
          height: 50,
          width: 100,
          backgroundColor: 'pink',
          textAlign: 'center',
          lineHeight: 50,
        }}>
        发布
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
    // flex: 1,
    paddingTop: 20,
  },
  mediaCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  media: {
    width: 71,
    height: 71,
    marginRight: 10,
    marginBottom: 10,
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
