import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import * as action from '@/redux/constants';
import {JoinButton} from '@/components/NodeComponents';
import {followItem, unfollowItem} from '@/api/mine_api';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';

// type （node-index || node-index-mine） add-node node-list
const NodeItem = props => {
  const {node, type} = props;
  const home = useSelector(state => state.home);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(node.followed);

  const onFollowNode = async () => {
    let followed_res = {};
    if (followed) {
      followed_res = await unfollowItem({followable_type: 'Node', followable_id: node.id});
    } else {
      followed_res = await followItem({followable_type: 'Node', followable_id: node.id});
    }
    setFollowed(followed_res.followed);
    if (followed_res.followed) {
      Toast.show('已成功加入', {duration: 500});
    } else {
      Toast.show('已取消加入', {duration: 500});
    }
  };

  const goNodeDetail = () => {
    if (props.type === 'add-node') {
      const topics = {...home.savetopic, node};
      dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
      navigation.goBack();
    }

    if (type === 'node-list' || type === 'node-index') {
      navigation.push('NodeDetail', {nodeId: node.id});
    }

    if (type === 'node-index-mine') {
      if (node.audit_status === 'success') {
        navigation.push('NodeDetail', {nodeId: node.node_id});
      } else {
        goNodeResult();
      }
    }
  };

  const goNodeResult = () => {
    navigation.push('CreateNodeResult', {nodeId: node.id});
  };

  useEffect(() => {
    setFollowed(props.node.followed);
  }, [props]);

  return (
    <Pressable onPress={goNodeDetail}>
      <View style={[styles.nodeItem, props.style]}>
        <FastImg style={styles.nodeImg} source={{uri: node.cover_url}} />
        <View style={styles.nodeInfo}>
          <View style={styles.nodeNameWrap}>
            <Text style={styles.nodeName}>{node.name}</Text>
            <Text style={styles.nodeDesc}>
              {node.topics_count}篇帖子 · {node.accounts_count}位{node.nickname || '圈友'}
            </Text>
          </View>

          {/* add-node */}
          {props.type === 'add-node' &&
            (home.savetopic.node && home.savetopic.node.id === node.id ? (
              <IconFont name="chose-success" size={15} color={'#000'} style={styles.icon} />
            ) : (
              <IconFont name="tianjia1" size={15} color={'#000'} style={styles.icon} />
            ))}

          {/* node-index-mine */}
          {props.type === 'node-index-mine' && (
            <View style={{marginRight: 20}}>
              <Pressable onPress={goNodeResult}>
                {node.audit_status === 'new' && <JoinButton join={true} text="未审核" />}
                {node.audit_status === 'auditing' && <JoinButton join={true} text="审核中" />}
                {node.audit_status === 'failed' && <JoinButton join={true} text="未通过" />}
                {node.audit_status === 'success' && <JoinButton join={true} text="管理" />}
              </Pressable>
            </View>
          )}

          {/* node-index node-list */}
          {(props.type === 'node-index' || props.type === 'node-list') && (
            <View style={{marginRight: props.type === 'node-index' ? 20 : 0}}>
              <JoinButton
                join={followed}
                text={followed ? '已加入' : '加入'}
                onPress={onFollowNode}
              />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  nodeItem: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
  },
  nodeImg: {
    width: 49,
    height: 49,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ffff00',
    marginRight: 10,
  },
  cateTitle: {
    paddingBottom: 13,
    paddingTop: 15,
    color: '#7f7f81',
  },
  nodeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nodeNameWrap: {
    marginRight: 'auto',
    height: 49,
    flex: 1,
    paddingTop: 5,
  },
  nodeName: {
    lineHeight: 20,
    fontSize: 15,
    fontWeight: '500',
  },
  nodeDesc: {
    fontSize: 11,
    color: '#bdbdbd',
    marginTop: 5,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 20,
  },
});

export default NodeItem;
