import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import * as action from '@/redux/constants';
import {JoinButton} from '@/components/NodeComponents';
import {followItem, unfollowItem} from '@/api/mine_api';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';

// add-node  创建帖子圈子选择
// mine-node 全部圈子 我创建
// list      圈子列表
const BaseNode = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic} = useSelector(state => state.home);

  const {data, type} = props;
  const [followed, setFollowed] = useState(data.followed);

  const onFollow = async () => {
    const params = {followable_type: 'Node', followable_id: data.id};
    const res = followed ? await unfollowItem(params) : await followItem(params);
    Toast.show(res.followed ? '已成功加入' : '已取消加入', {duration: 500});
    setFollowed(res.followed);
  };

  const goNodeResult = () => {
    navigation.push('CreateNodeResult', {nodeId: data.id});
  };

  const goNodeDetail = () => {
    if (type === 'list') {
      navigation.push('NodeDetail', {nodeId: data.id});
    }

    if (type === 'add-node') {
      const topics = {...savetopic, node: data};
      dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
      navigation.goBack();
    }

    if (type === 'mine-node') {
      if (data.audit_status === 'success') {
        navigation.push('NodeDetail', {nodeId: data.node_id});
      } else {
        goNodeResult();
      }
    }
  };

  return (
    <Pressable style={[styles.dataItem, props.style]} onPress={goNodeDetail}>
      <FastImg style={styles.dataImg} source={{uri: data.cover_url}} />
      <View style={styles.dataInfo}>
        <View style={styles.dataNameWrap}>
          <Text style={styles.dataName}>{data.name}</Text>
          <Text style={styles.dataDesc}>
            {data.topics_count}篇帖子 · {data.accounts_count}位{data.nickname || '圈友'}
          </Text>
        </View>

        {/* list */}
        {type === 'list' && (
          <View style={{marginRight: props.type === 'data-index' ? 20 : 0}}>
            <JoinButton join={followed} text={followed ? '已加入' : '加入'} onPress={onFollow} />
          </View>
        )}

        {/* add-node */}
        {type === 'add-node' && (
          <IconFont
            name={savetopic.node && savetopic.node.id === data.id ? 'chose-success' : 'tianjia1'}
            size={15}
            color={'#000'}
            style={styles.icon}
          />
        )}

        {/* mine-node */}
        {type === 'mine-node' && (
          <Pressable onPress={goNodeResult}>
            {data.audit_status === 'new' && <JoinButton join={true} text="未审核" />}
            {data.audit_status === 'auditing' && <JoinButton join={true} text="审核中" />}
            {data.audit_status === 'failed' && <JoinButton join={true} text="未通过" />}
            {data.audit_status === 'success' && <JoinButton join={true} text="管理" />}
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dataItem: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: '#fff',
  },
  dataImg: {
    width: 49,
    height: 49,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ffff00',
  },
  dataInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  dataNameWrap: {
    marginRight: 'auto',
    height: 49,
    flex: 1,
    paddingTop: 5,
  },
  dataName: {
    lineHeight: 20,
    fontSize: 15,
    fontWeight: '500',
  },
  dataDesc: {
    fontSize: 11,
    color: '#bdbdbd',
    marginTop: 5,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 22,
  },
});

export default BaseNode;
