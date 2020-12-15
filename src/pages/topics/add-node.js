import React, {useLayoutEffect} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import NodeIndexComponent from '@/components/NodeIndex';

const NodeIndex = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '选择圈子',
      headerLeft: () => null,
      headerRight: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>取消</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return <NodeIndexComponent type="add-node" />;
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
