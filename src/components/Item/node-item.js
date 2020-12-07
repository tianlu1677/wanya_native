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

// type [node-index, add-node, list]
const NodeItem = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {node, type} = props;

  const home = useSelector(state => state.home);
  const [followed, setFollowed] = useState(props.node.followed);

  const onFollowNode = async () => {
    if (node.followed) {
      await unfollowItem({followable_type: 'Node', followable_id: node.id});
    } else {
      await followItem({followable_type: 'Node', followable_id: node.id});
    }

    if (type === 'node-index') {
      if (followed) {
        Toast.show('已取消加入', {duration: 500});
      } else {
        Toast.show('已成功加入', {duration: 500});
      }
    }

    setFollowed(!followed);
  };

  const goNodeDetail = () => {
    if (props.type === 'add-node') {
      const topics = {...home.savetopic, node};
      dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
      navigation.goBack();
    }

    if (props.type === 'list' || props.type === 'node-index') {
      navigation.push('NodeDetail', {nodeId: node.id});
    }
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

          {/* node-index */}
          {props.type === 'node-index' && (
            <View style={{marginRight: 20}}>
              <JoinButton
                join={followed}
                text={followed ? '已加入' : '加入'}
                onPress={onFollowNode}
              />
            </View>
          )}

          {/* add-node */}
          {props.type === 'add-node' &&
            (home.savetopic.node && home.savetopic.node.id === node.id ? (
              <IconFont name="chose-success" size={15} color={'#000'} style={styles.icon} />
            ) : (
              <IconFont name="tianjia1" size={15} color={'#000'} style={styles.icon} />
            ))}

          {/* list */}
          {props.type === 'list' && (
            <JoinButton
              join={followed}
              text={followed ? '已加入' : '加入'}
              onPress={onFollowNode}
            />
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
