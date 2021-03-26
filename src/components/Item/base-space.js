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
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    height: RFValue(65),
  },
  name: {
    fontSize: 15,
  },
  address: {
    fontSize: 11,
    marginTop: 8,
    color: '#bdbdbd',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 14,
  },
});

export default BaseSpace;
