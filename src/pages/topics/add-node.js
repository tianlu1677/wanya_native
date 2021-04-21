import React, {useLayoutEffect} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import NodeIndexComponent from '@/components/NodeIndex';

const NodeIndex = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '选择圈子',
      headerLeft: () => null,
      headerRight: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <Text style={styles.cancel}>取消</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return <NodeIndexComponent type="add-node" />;
};

const styles = StyleSheet.create({
  cancel: {
    textAlign: 'center',
    fontSize: 15,
    color: '#bdbdbd',
  },
});

export default NodeIndex;
