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

  const chooseNode = item => {
    const topics = {...home.savetopic, node: item};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.goBack();
  };

  const goNodeDetail = () => {
    if (props.type === 'add-node') {
      return false;
    }

    if (props.type === '') {
      navigation.navigate('NodeDetail', {nodeId: node.id});
    }
  };

  return (
    <TouchableOpacity onPress={goNodeDetail}>
      <View style={[styles.nodeItem, props.style]}>
        <Image style={styles.nodeImg} source={{uri: node.cover_url || defaultCoverUrl}} />
        <View style={styles.nodeInfo}>
          <View style={{marginRight: 'auto'}}>
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
          {props.type === 'add-node' && (
            <TouchableOpacity onPress={() => chooseNode(node)}>
              {home.savetopic.node && home.savetopic.node.id === node.id ? (
                <IconFont name="chose-success" size={16} color={'#000'} style={styles.icon} />
              ) : (
                <IconFont name="tianjia1" size={16} color={'#000'} style={styles.icon} />
              )}
            </TouchableOpacity>
          )}
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
    backgroundColor: '#fff',
  },
  nodeImg: {
    width: 50,
    height: 50,
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
    paddingTop: 5,
    flex: 1,
  },
  nodeName: {
    height: 20,
    lineHeight: 20,
    fontSize: 15,
  },
  nodeDesc: {
    height: 20,
    lineHeight: 20,
    fontSize: 11,
    color: '#bdbdbd',
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 22,
  },
});

export default NodeItem;
