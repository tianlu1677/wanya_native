import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import IconFont from '@/iconfont';
import * as action from '@/redux/constants';
import {JoinButton} from '@/components/NodeComponents';
import {followItem, unfollowItem} from '@/api/mine_api';

const defaultCoverUrl =
  'http://file.meirixinxue.com/assets/2020/964cc82f-09d1-4561-b415-8fa58e29c817.png';

const NodeItem = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  const [followed, setFollowed] = useState(props.node.followed);

  const {node} = props;

  const onFollowNode = async () => {
    if (node.followed) {
      await unfollowItem({followable_type: 'Node', followable_id: node.id});
    } else {
      await followItem({followable_type: 'Node', followable_id: node.id});
    }
    setFollowed(!followed);
  };

  const goNodeDetail = () => {
    if (props.type === 'add-node') {
      const topics = {...home.savetopic, node};
      dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
      navigation.goBack();
    }

    if (props.type === 'list') {
      navigation.push('NodeDetail', {nodeId: node.id});
    }
  };

  return (
    <TouchableOpacity onPress={goNodeDetail}>
      <View style={[styles.nodeItem, props.style]}>
        <Image style={styles.nodeImg} source={{uri: node.cover_url || defaultCoverUrl}} />
        <View style={styles.nodeInfo}>
          <View style={styles.nodeNameWrap}>
            <Text style={styles.nodeName}>{node.name}</Text>
            <Text style={styles.nodeDesc}>
              {node.topics_count}篇帖子 · {node.accounts_count}位{node.nickname || '圈友'}
            </Text>
          </View>

          {/* list */}
          {props.type === 'list' && (
            <JoinButton
              join={followed}
              text={followed ? '已加入' : '加入'}
              onPress={onFollowNode}
            />
          )}

          {/* addnode */}
          {props.type === 'add-node' &&
            (home.savetopic.node && home.savetopic.node.id === node.id ? (
              <IconFont name="chose-success" size={15} color={'#000'} style={{}} />
            ) : (
              <IconFont name="tianjia1" size={15} color={'#000'} style={styles.icon} />
            ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nodeItem: {
    flex: 1,
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
