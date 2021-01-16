import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import MediasPicker from '@/components/MediasPicker';
import {Pressable} from 'react-native';

const {width} = Dimensions.get('window');

const CreateNodeInfo = props => {
  const dispatch = useDispatch();
  const [nodeId] = useState(props.route.params?.nodeId || null);
  const {createNode} = useSelector(state => state.node);

  const chooseImage = () => {
    props.removeAllPhoto();
    const options = {imageCount: 1, isCrop: true, CropW: width, CropH: width, isCamera: false};
    props.imagePick(options, async (err, res) => {
      if (err) {
        return;
      }
      dispatch({type: action.CREATE_NODE, value: {...createNode, cover: res[0]}});
    });
  };

  const onChangeText = (value, key) => {
    dispatch({type: action.CREATE_NODE, value: {...createNode, [key]: value}});
  };

  const isClick = () =>
    createNode && createNode.cover && createNode.name && createNode.desc ? true : false;

  const goStepClick = () => {
    if (isClick()) {
      props.navigation.push('CreateNodeType');
    }
  };

  useEffect(() => {
    if (!nodeId) {
      dispatch({type: action.CREATE_NODE, value: {}});
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Pressable onPress={chooseImage} style={styles.addphoto}>
            <FastImg
              style={styles.addphoto}
              source={
                createNode.cover
                  ? {uri: createNode.cover.uri || createNode.cover.cover_url}
                  : require('@/assets/images/avator_upload.png')
              }
              resizeMode={'cover'}
            />
          </Pressable>
          <TextInput
            style={styles.textInput}
            value={createNode.name || ''}
            selectionColor={'#ff193a'}
            placeholderTextColor={'#bdbdbd'}
            placeholder="请输入圈子名称（20字以内）"
            maxLength={20}
            onChangeText={text => onChangeText(text, 'name')}
          />
          <TextInput
            style={[styles.textInput, styles.introInput]}
            value={createNode.desc || ''}
            selectionColor={'#ff193a'}
            placeholderTextColor={'#bdbdbd'}
            placeholder="请输入圈子简介（50字以内）"
            maxLength={50}
            multiline
            onChangeText={text => onChangeText(text, 'desc')}
          />
          <View>
            <TextInput
              style={[styles.textInput, {marginBottom: 0}]}
              value={createNode.nickname || ''}
              selectionColor={'#ff193a'}
              placeholderTextColor={'#bdbdbd'}
              placeholder="请输入圈子成员昵称，默认「顽友」"
              onChangeText={text => onChangeText(text, 'nickname')}
            />
            <Text style={styles.introText}>例如：输入「板友」，则圈子成员统称为「板友」</Text>
          </View>
          <Pressable style={styles.surebtnWrap} onPress={goStepClick}>
            <Text style={[styles.surebtn, isClick() ? styles.canClick : styles.disabled]}>
              下一步
            </Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const boxShadow = {
  shadowColor: '#bdbdbd',
  shadowRadius: 3,
  shadowOpacity: 0.5,
  shadowOffset: {width: 1, height: 2},
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: RFValue(35),
    paddingHorizontal: RFValue(30),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  addphoto: {
    width: RFValue(71),
    height: RFValue(71),
    marginBottom: RFValue(45),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textInput: {
    height: RFValue(50),
    backgroundColor: '#fff',
    paddingLeft: RFValue(15),
    marginBottom: RFValue(20),
    fontSize: 14,
    ...boxShadow,
  },
  introInput: {
    minHeight: RFValue(93),
    paddingTop: RFValue(15),
    paddingBottom: RFValue(15),
    lineHeight: RFValue(17),
  },
  introText: {
    color: '#bdbdbd',
    marginTop: RFValue(12),
    fontSize: 12,
    lineHeight: RFValue(20),
  },
  surebtnWrap: {
    ...boxShadow,
  },
  surebtn: {
    height: RFValue(50),
    lineHeight: RFValue(50),
    textAlign: 'center',
    borderRadius: 3,
    overflow: 'hidden',
    fontWeight: '500',
    fontSize: 16,
    marginTop: RFValue(60),
  },
  canClick: {
    backgroundColor: '#000',
    color: '#fff',
  },
  disabled: {
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
  },
});

export default MediasPicker(CreateNodeInfo);
