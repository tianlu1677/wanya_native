import React, {useLayoutEffect} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import Toast from '@/components/Toast';
import NodeIndexComponent from '@/components/NodeIndex';

const NodeIndex = ({navigation}) => {
  const onCreateNode = () => {
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
