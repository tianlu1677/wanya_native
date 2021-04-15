import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Avator from './Avator';

const JoinAccounts = props => {
  const {size} = props;
  const sizeStyle = {width: size, height: size, borderRadius: Number(size / 2)};
  return (
    <View style={styles.wrapper}>
      {props.accounts.map((item, index) => (
        <View style={styles.content} key={index}>
          <Avator account={item} size={props.size} />
          {index === 3 && <Text style={[styles.opacity, styles.textCenter, sizeStyle]} />}
          {index === 3 && <Text style={[styles.textCenter, sizeStyle]}>...</Text>}
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
    opacity: 0.2,
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
