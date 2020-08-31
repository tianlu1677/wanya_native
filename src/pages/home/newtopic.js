import React, {useState, useEffect} from 'react';
import {View, Image, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import MediasPicker from '@/components/MediasPicker';

const loadingImg =
  'http://file.meirixinxue.com/assets/2020/76272587-9bd6-48e9-b182-692b9ca73e89.gif';

const NewTopic = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);
  const [source, setSource] = useState([]);
  const [content, setContent] = useState(savetopic.plan_content);

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

    const res = await props.imagePick();
    // setSource([...source, res]);
    console.log([...source, res]);
    // const res = await props.imagePick();

    // console.log([...source, res]);
    props.imagePick(res => {
      console.log(res);
      setSource([...source, res]);
    });

  };

  const onSubmit = () => {
    console.log(savetopic);
    // 先上传资源
    const params = {
      type: 'single',
      plan_content: savetopic.plan_content,
      mention_ids: savetopic.mention.map(v => v.id),
      node_id: savetopic.node.id,
      space_id: savetopic.space.id,
    };
    console.log(params);
  };

  useEffect(() => {
    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    console.log(savetopic);
    setContent(savetopic.plan_content);
  }, [savetopic]);

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.mediaCon}>
        <TouchableOpacity onPress={onImagePicker}>
          <Image style={styles.media} source={require('@/assets/images/add-photo.png')} />
        </TouchableOpacity>
        {source.map(v => (
          <Image key={v.uri} style={styles.media} source={v} />
        ))}
        <Image style={styles.media} source={require('@/assets/images/add-video.png')} />
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
