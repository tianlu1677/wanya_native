import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import {RFValue} from '@/utils/response-fontsize';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import MediasPicker from '@/components/MediasPicker';
import {CategoryDrawer} from '@/components/NodeComponents';
import {getCheckNodes, editCheckNodes} from '@/api/node_api';

const CreateNodeType = props => {
  const categories = useSelector(state => state.home.categoryList);
  const {createNode} = useSelector(state => state.node);
  const nodeId = createNode.id || null;
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState(null);
  const [address, setaddress] = useState(null);

  const onCreateClick = async () => {
    const {name, desc, nickname, cover} = createNode;
    Toast.showLoading(nodeId ? '编辑中' : '创建中');
    let cover_id = cover.cover_id || null;
    if (cover.uri) {
      const result = await props.uploadImage({uploadType: 'multipart', ...cover});
      cover_id = result.asset.id;
    }
    const params = {name, desc, nickname, category_id: type.id, cover_id};
    let res = null;
    if (nodeId) {
      res = await editCheckNodes({check_node: params}, nodeId);
    } else {
      res = await getCheckNodes({check_node: params});
    }
    Toast.showError(nodeId ? '编辑成功' : '创建成功');
    props.navigation.push('CreateNodeResult', {nodeId: res.data.check_node.id});
  };

  const onChooseType = () => {
    setVisible(true);
  };

  const onChooseValue = value => {
    setVisible(false);
    setType(value);
  };

  useEffect(() => {
    if (createNode.category_id) {
      const defaultType = categories.find(item => item.id === createNode.category_id);
      setType(defaultType);
    }
  }, [createNode]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Pressable style={styles.slideView} onPress={onChooseType}>
            <Text style={[styles.slidetext, {color: type ? '#000' : '#bdbdbd'}]}>
              {type ? type.name : '请选择圈子所属分类（必填）'}
            </Text>
            <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
          </Pressable>
          <Pressable style={[styles.slideView, {marginBottom: 0}]} onPress={onChooseType}>
            <Text style={[styles.slidetext, {color: address ? '#000' : '#bdbdbd'}]}>
              {address ? address.name : '可选择圈子所在位置（选填）'}
            </Text>
            <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
          </Pressable>
          <Text style={styles.introText}>选择所在位置后，将方便附近顽友发现该圈子</Text>
          <Pressable style={styles.surebtnWrap} onPress={onCreateClick}>
            <Text style={[styles.surebtn, type ? styles.canClick : styles.disabled]}>确认创建</Text>
          </Pressable>
          {visible && (
            <CategoryDrawer currentId={type ? type.id : null} onChooseValue={onChooseValue} />
          )}
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
    paddingTop: RFValue(65),
    paddingHorizontal: RFValue(30),
    overflow: 'hidden',
    position: 'relative',
  },
  slideView: {
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: RFValue(15),
    paddingRight: 15,
    marginBottom: RFValue(20),
    fontSize: 12,
    ...boxShadow,
  },
  slidetext: {
    fontSize: 14,
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
    marginTop: RFValue(80),
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

export default MediasPicker(CreateNodeType);
