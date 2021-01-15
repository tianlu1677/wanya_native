import React, {useState} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {RFValue} from '@/utils/response-fontsize';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import MediasPicker from '@/components/MediasPicker';
import {CategoryDrawer} from '@/components/NodeComponents';
import GetLocation from '@/components/GetLocation';
import {createCheckNodes, editCheckNodes, submitCheckNodes} from '@/api/node_api';
import {getLocation} from '@/api/space_api';

const CreateNodeType = props => {
  const dispatch = useDispatch();
  const {location} = useSelector(state => state.home);
  const {createNode} = useSelector(state => state.node);
  const nodeId = createNode.id || null;
  const [visible, setVisible] = useState(false);

  const getValidateForm = () => {
    const data = {
      name: createNode.name,
      desc: createNode.desc,
      nickname: createNode.nickname,
      category_id: createNode.category.id,
      space_id: createNode.space ? createNode.space.id : '',
      location_id: createNode.location ? createNode.location.id : '',
    };
    return data;
  };

  const onCreateClick = async () => {
    Toast.showLoading();
    const {cover} = createNode;
    let cover_id = cover.cover_id || null;
    if (cover.uri) {
      const result = await props.uploadImage({uploadType: 'multipart', ...cover});
      cover_id = result.asset.id;
    }
    const params = {...getValidateForm(), cover_id};
    let res = null;
    if (nodeId) {
      res = await editCheckNodes({check_node: params}, nodeId);
    } else {
      res = await createCheckNodes({check_node: params});
    }
    await submitCheckNodes(res.data.check_node.id);
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: 'CreateNodeResult',
          params: {nodeId: res.data.check_node.id, prevPage: 'create-node-type'},
        },
      ],
    });
  };

  const getCurrentLocation = async res => {
    if (res === false) {
      // 拒绝权限
      dispatch({type: action.GET_LOCATION, value: {}});
    }

    if (res.position && res.position.coords) {
      // 获取到权限信息
      const {latitude, longitude} = res.position.coords;
      if (
        parseInt(latitude) === parseInt(location.latitude) &&
        parseInt(longitude) === parseInt(location.longitude)
      ) {
        // 相同不需要重新获取位置
        dispatch({type: action.GET_LOCATION, value: {...location}});
      } else {
        const cityData = await getLocation({latitude, longitude});
        const {city} = cityData.data;
        dispatch({
          type: action.GET_LOCATION,
          value: {...location, ...res.position.coords, positionCity: city, chooseCity: city},
        });
      }
      props.navigation.navigate('AddSpace', {type: 'node'});
    }
  };

  const onChooseType = () => {
    if (!nodeId) {
      setVisible(true);
    }
  };

  const onChooseValue = value => {
    setVisible(false);
    dispatch({type: action.CREATE_NODE, value: {...createNode, category: value}});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Pressable style={styles.slideView} onPress={onChooseType}>
            <Text
              style={[
                styles.slidetext,
                {color: createNode.category && !nodeId ? '#000' : '#bdbdbd'},
              ]}>
              {createNode.category?.name || '请选择圈子所属分类（必填）'}
            </Text>
            <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
          </Pressable>
          <GetLocation
            style={[styles.slideView, {marginBottom: 0}]}
            handleClick={getCurrentLocation}>
            <Text
              style={[
                styles.slidetext,
                {color: createNode.space || createNode.location ? '#000' : '#bdbdbd'},
              ]}>
              {createNode.space || createNode.location
                ? createNode.space?.name || createNode.location?.name
                : '可选择圈子所在位置（选填）'}
            </Text>
            <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
          </GetLocation>
          <Text style={styles.introText}>选择所在位置后，将方便附近顽友发现该圈子</Text>
          <Pressable style={styles.surebtnWrap} onPress={onCreateClick}>
            <Text style={[styles.surebtn, createNode.category ? styles.canClick : styles.disabled]}>
              {nodeId ? '确认修改' : '确认创建'}
            </Text>
          </Pressable>

          {visible && (
            <CategoryDrawer
              currentId={createNode.category?.id || null}
              onChooseValue={onChooseValue}
              onCancel={() => setVisible(false)}
            />
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
