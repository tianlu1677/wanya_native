import React, {useLayoutEffect, useEffect} from 'react';
import {Text, StyleSheet, Pressable, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispathUpdateNodes} from '@/redux/actions';
import Toast from '@/components/Toast';
import NodeIndexComponent from '@/components/NodeIndex';
import PushUtil from '@/utils/umeng_analytics_util';

const NodeIndex = ({navigation}) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentBaseInfo);

  const onCreateNode = () => {
    PushUtil.onEventObject('click_create_node', {
      account_id: currentAccount.id,
      account_nickname: currentAccount.nickname,
    });
    Toast.showError('敬请期待', {duration: 1000});
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '全部圈子',
      headerBackImage: () => (
        <Image source={require('../../assets/images/back.png')} style={{width: 9, height: 15}} />
      ),
      headerRight: () => (
        <Pressable onPress={onCreateNode}>
          <Text style={styles.cancel}>创建圈子</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    return () => {
      dispatch(dispathUpdateNodes(currentAccount.id));
    };
  }, []);

  return <NodeIndexComponent type="node-index" />;
};

const styles = StyleSheet.create({
  cancel: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    fontSize: 15,
    height: 18,
    lineHeight: 18,
    color: '#bdbdbd',
  },
});

export default NodeIndex;
