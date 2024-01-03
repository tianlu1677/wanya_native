import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';

const Search = props => {
  const {height, cancelWidth, placeholderTextColor} = props;

  return (
    <View style={[styles.wrapper, props.style]}>
      {props.prefix ? props.prefix : null}
      <View style={[styles.inputContent, props.inputStyle, {height: height}]}>
        <IconFont name="sousuo" size={14} color={placeholderTextColor} style={styles.icon} />
        <TextInput
          ref={props.getRef}
          multiline={false}
          style={[styles.textInput, {height: height}]}
          placeholder={props.placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={props.onChangeText}
          onFocus={props.onFocus}
          autoFocus={props.autoFocus}
          selectionColor={'#ff193a'}
          clearButtonMode={'always'}
          textAlign={'left'}
          returnKeyType={'search'}
        />
      </View>

      {props.cancel && (
        <Text
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
          style={[styles.cancel, {width: cancelWidth, height: height, lineHeight: height}]}
          onPress={props.onCancel}>
          取消
        </Text>
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
  cancel: PropTypes.bool,
  prefix: PropTypes.object,
  suffix: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#fff',
    paddingTop: RFValue(6),
    paddingBottom: RFValue(6),
    paddingLeft: 14,
    backgroundColor: 'white',
  },
  inputContent: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  icon: {
    zIndex: 2,
    position: 'absolute',
    top: '50%',
    marginTop: -7,
    left: RFValue(13),
  },
  textInput: {
    paddingLeft: RFValue(35),
    fontSize: 14,
    color: '#000',
    paddingTop: 0,
    paddingBottom: 0,
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
