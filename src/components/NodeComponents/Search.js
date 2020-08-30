import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import IconFont from '@/iconfont';

const Search = props => {
  return (
    <View style={[styles.wrapper, props.style]}>
      <View style={styles.inputContent}>
        <IconFont name="sousuo" size={10} color={'#7f7f81'} style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
        />
      </View>
      <Text style={styles.cancel}>取消</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  inputContent: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ebebeb',
  },
  icon: {
    zIndex: 2,
    position: 'absolute',
    top: '50%',
    marginTop: -5,
    left: 10,
    fontSize: 10,
  },
  textInput: {
    height: 30,
    backgroundColor: '#ebebeb',
    borderRadius: 5,
    paddingLeft: 30,
    color: '#7f7f81',
    fontSize: 12,
  },
  cancel: {
    width: 66,
    lineHeight: 30,
    textAlign: 'center',
  },
});

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Search;
