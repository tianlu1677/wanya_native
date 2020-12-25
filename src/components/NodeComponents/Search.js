import React, {useRef} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import IconFont from '@/iconfont';

const Search = props => {
  const {height, cancelWidth, placeholderTextColor} = props;
  return (
    <View style={[styles.wrapper, props.style]}>
      <View style={[styles.inputContent, props.inputStyle, {height: height}]}>
        <IconFont name="sousuo" size={12} color={placeholderTextColor} style={styles.icon} />
        <TextInput
          ref={props.getRef}
          style={[styles.textInput, {height: height}]}
          placeholder={props.placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={props.onChangeText}
          onFocus={props.onFocus}
          selectionColor={'#ff193a'}
          clearButtonMode={'always'}
          textAlign={'left'}
          returnKeyType={'search'}
        />
      </View>
      {props.children ? (
        props.children
      ) : (
        <Pressable onPress={props.onCancel}>
          <Text style={[styles.cancel, {width: cancelWidth, height: height, lineHeight: height}]}>
            取消
          </Text>
        </Pressable>
      )}
    </View>
  );
};

Search.propTypes = {
  height: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  placeholderTextColor: PropTypes.string.isRequired,
  inputStyle: PropTypes.object.isRequired,
  style: PropTypes.object,
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func,
  cancelWidth: PropTypes.number,
  getRef: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 14,
  },
  inputContent: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  icon: {
    zIndex: 2,
    position: 'absolute',
    top: '50%',
    marginTop: -6,
    left: 14,
    fontSize: 10,
  },
  textInput: {
    padding: 0,
    paddingLeft: 36,
    fontSize: 13,
    fontWeight: '300',
    color: '#000',
  },
  cancel: {
    textAlign: 'center',
    fontSize: 15,
    color: '#bdbdbd',
  },
});

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Search;
