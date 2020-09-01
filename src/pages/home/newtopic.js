import React, {useState, useEffect} from 'react';
import {View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import MediasPicker from '@/components/MediasPicker';
import {createTopic} from '@/api/topic_api';
import Modal from 'react-native-modal';

const loadingImg =
  'http://file.meirixinxue.com/assets/2020/76272587-9bd6-48e9-b182-692b9ca73e89.gif';

const NewTopic = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);
  const [source, setSource] = useState([]);
  const [content, setContent] = useState(savetopic.plan_content);

  const [isModalVisible, setModalVisible] = useState(true);
  const choose = async () => {
    const res = await props.chooseImage();
    setSource([...source, res]);
    // const res = await uploadMultiImage(img);
  };

  const onChangeContent = text => {
    setContent(text);
    const topics = {...savetopic, plan_content: text};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
  };

  const onImagePicker = async () => {
    const options = {
      imageCount: 9 - source.length,
    };
    props.imagePick(options, (err, res) => {
      if (err) {
        return;
      }
      setSource([...source, ...res]);
    });
  };

  const onVideoPicker = async () => {
    props.videoPick((err, res) => {
      if (err) {
        return;
      }
      console.log(res);

      // setSource([...source, ...res]);
    });
  };

  const onSubmit = async () => {
    let mediasImg = [];
    await Promise.all(
      source.map(async file => {
        const res = await props.upload(file);
        console.log(res);
        mediasImg = [...mediasImg, res.asset];
      })
    );
    console.log(mediasImg);
    console.log(mediasImg.map(v => v.url));

    // 先上传资源
    const data = {
      type: 'single',
      medias: mediasImg.map(v => v.url),
      plain_content: savetopic.plan_content,
      mention_ids: savetopic.mention.map(v => v.id).join(),
      node_id: savetopic.node ? savetopic.node.id : '',
      space_id: savetopic.node ? savetopic.space.id : '',
    };
    console.log(data);

    const res = await createTopic(data);
    console.log(res);
  };

  useEffect(() => {
    console.log(props);
    let toast = Toast.show('This is a message', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: 'pink',
      shadowColor: true,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    // setTimeout(function () {
    //   Toast.hide(toast);
    // }, 500);

    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    // console.log(savetopic);
    setContent(savetopic.plan_content);
  }, [savetopic]);

  useEffect(() => {
    // console.log(content);
  }, [content]);

  useEffect(() => {
    console.log(source);
  }, [source]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.mediaCon}>
        <TouchableOpacity onPress={onImagePicker}>
          <Image style={styles.media} source={require('@/assets/images/add-photo.png')} />
        </TouchableOpacity>
        {source.map((v, index) => (
          <Image key={index} style={styles.media} source={v} />
        ))}
        <TouchableOpacity onPress={onVideoPicker}>
          <Image style={styles.media} source={require('@/assets/images/add-video.png')} />
        </TouchableOpacity>
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
      </Text>
      {/* <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text style={{color: '#fff'}}>Hello!3232324343534543534534534543534</Text>
          <Button title="Hide modal" onPress={() => setModalVisible(false)} />
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 80,
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
    // backgroundColor: 'pink',
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
});

export default MediasPicker(NewTopic);
