import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Avator from '@/components/NodeComponents/Avator';

const JoinAccounts = props => {
  const sizeStyle = {width: props.size, height: props.size, borderRadius: Number(props.size / 2)};
  return (
    <View style={styles.wrapper}>
      {props.accounts.map((item, index) => (
        <View style={styles.content}>
          <Avator account={item} size={props.size} />
          <Text style={[styles.opacity, styles.textCenter, sizeStyle]} />
          <Text style={[styles.textCenter, sizeStyle]}>...</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  content: {
    position: 'relative',
    marginLeft: -3,
  },
  opacity: {
    backgroundColor: '#000',
    opacity: 0.5,
  },
  textCenter: {
    position: 'absolute',
    color: '#fff',
    textAlign: 'center',
    overflow: 'hidden',
  },
});

JoinAccounts.propTypes = {
  accounts: PropTypes.array.isRequired, // data
  size: PropTypes.number.isRequired, // 宽高尺寸
};

export default JoinAccounts;
