import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import IconFont from '@/iconfont';

const Search = props => {
  return (
    <View style={[styles.wrapper, props.style]}>
      <View style={styles.inputContent}>
        <IconFont name="sousuo" size={12} color={'#7f7f81'} style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
        />
      </View>
      <Text style={styles.cancel} onPress={props.onCancel}>
        取消
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingBottom: 6,
  },
  inputContent: {
    height: 30,
    flex: 1,
    position: 'relative',
    backgroundColor: '#ebebeb',
    borderRadius: 5,
  },
  icon: {
    zIndex: 2,
    position: 'absolute',
    top: '50%',
    marginTop: -6,
    left: 10,
    fontSize: 10,
  },
  textInput: {
    height: 30,
    backgroundColor: '#ebebeb',
    borderRadius: 5,
    paddingLeft: 38,
    fontSize: 12,
  },
  cancel: {
    width: 66,
    lineHeight: 30,
    textAlign: 'center',
    fontSize: 15,
    color: '#bdbdbd',
  },
});

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Search;
