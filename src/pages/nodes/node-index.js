import React, {useLayoutEffect} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import Toast from '@/components/Toast';
import NodeIndexComponent from '@/components/NodeIndex';
import PushUtil from '@/utils/umeng_analytics_util';

const NodeIndex = ({navigation}) => {
  const currentAccount = useSelector(state => state.account.currentBaseInfo);

  const onCreateNode = () => {
    PushUtil.onEventObject('click_create_node', {
      account_id: currentAccount.id,
      account_nickname: currentAccount.nickname,
    });
    Toast.show('敬请期待');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '全部圈子',
      headerRight: () => (
        <Pressable onPress={onCreateNode}>
          <Text style={styles.cancel}>创建圈子</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return <NodeIndexComponent type="node-index" />;
};

const styles = StyleSheet.create({
  cancel: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    fontSize: 15,
    color: '#bdbdbd',
  },
});

export default NodeIndex;
