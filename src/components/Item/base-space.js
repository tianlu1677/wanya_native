import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {RFValue} from '@/utils/response-fontsize';

const BaseSpace = props => {
  const {data} = props;

  return (
    <Pressable style={styles.spaceWrapper} onPress={() => props.itemOnPress(data)}>
      <Text style={styles.name}>{data.name}</Text>
      {data.address ? <Text style={styles.address}>{data.address}</Text> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  spaceWrapper: {
    height: RFValue(65),
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 15,
  },
  address: {
    fontSize: 11,
    marginTop: 8,
    color: '#bdbdbd',
  },
});

export default BaseSpace;
