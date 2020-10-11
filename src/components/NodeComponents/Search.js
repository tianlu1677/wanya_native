import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import IconFont from '@/iconfont';

const Search = props => {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // setFocus(true)
      console.log('inputRef', inputRef)
      inputRef.current.focus()
    }, 500)
    return () => {
      // setFocus(false)
    };
  }, []);

  return (
    <View style={[styles.wrapper, props.style]}>
      <View style={styles.inputContent}>
        <IconFont name="sousuo" size={12} color={'#7f7f81'} style={styles.icon} />
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          selectionColor={'#ff193a'}
          // autoFocus={true}
          clearButtonMode={'always'}
          textAlign={'left'}
          returnKeyType={'search'}
        />
      </View>
      <Pressable onPress={props.onCancel}>
        <Text style={styles.cancel}>取消</Text>
      </Pressable>
    </View>
  );
};;

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
    left: 14,
    fontSize: 10,
  },
  textInput: {
    height: 30,
    backgroundColor: '#ebebeb',
    borderRadius: 5,
    paddingLeft: 36,
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
