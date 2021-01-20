import React from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';

const Search = props => {
  const {height, cancelWidth, placeholderTextColor} = props;
  return (
    <View style={[styles.wrapper, props.style]}>
      {props.prefix ? props.prefix : null}
      <View style={[styles.inputContent, props.inputStyle, {height: height}]}>
        <IconFont
          name="sousuo"
          size={RFValue(14)}
          color={placeholderTextColor}
          style={styles.icon}
        />
        <TextInput
          ref={props.getRef}
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
    paddingTop: RFValue(6),
    paddingBottom: RFValue(6),
    paddingLeft: RFValue(14),
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
    marginTop: RFValue(-7),
    left: RFValue(13),
    fontSize: 10,
  },
  textInput: {
    paddingLeft: RFValue(35),
    fontSize: 14,
    color: '#000',
    fontWeight: '300',
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
