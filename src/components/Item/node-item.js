import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import IconFont from '@/iconfont';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import * as action from '@/redux/constants';
const defaultCoverUrl =
  'http://file.meirixinxue.com/assets/2020/964cc82f-09d1-4561-b415-8fa58e29c817.png';

const NodeItem = props => {
  const home = useSelector(state => state.home);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const chooseNode = node => {
    const topics = {...home.savetopic, node: node};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.goBack();
  };

  const {node} = props;
  return (
    <TouchableWithoutFeedback key={node.id} onPress={() => chooseNode(node)}>
      <View style={styles.nodeItem}>
        <Image style={styles.nodeImg} source={{uri: node.cover_url || defaultCoverUrl}} />
        <View style={styles.nodeInfo}>
          <View>
            <Text style={styles.nodeName}>{node.name}</Text>
            <Text style={styles.nodeDesc}>
              {node.topics_count}篇帖子 · {node.accounts_count}位{node.nickname || '圈友'}
            </Text>
          </View>
          {home.savetopic.node && home.savetopic.node.id === node.id ? (
            <IconFont name="duigou1" size={16} color={'#000'} style={styles.icon} />
          ) : (
            <IconFont name="tianjia1" size={16} color={'#000'} style={styles.icon} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  nodeItem: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
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
    paddingBottom: 18,
    paddingTop: 5,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
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
