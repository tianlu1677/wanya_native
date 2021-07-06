import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {VWValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';

const CodeComponent = props => {
  const {style, getCode, keyboardType, textContentType} = props;
  const defaultSize = Array(6).fill(null);
  const [codeValue, setCodeValue] = useState('');

  const onChangeText = text => {
    setCodeValue(text);
  };

  useEffect(() => {
    getCode(codeValue);
  }, [codeValue]);

  return (
    <View style={[style, styles.inputContent]}>
      {defaultSize.map((item, index) => (
        <Text
          key={index}
          style={[
            styles.codeText,
            codeValue.length === index ? styles.codeTextActive : styles.codeTextNormal,
          ]}>
          {codeValue[index]}
        </Text>
      ))}

      <TextInput
        autoFocus={true}
        maxLength={6}
        keyboardType={keyboardType}
        textContentType={textContentType}
        // selectionColor="#ff193a"
        selectionColor="transparent"
        style={styles.inputItem}
        value={null}
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
};

const innerWidth = SCREEN_WIDTH - VWValue(50 * 2);
const styles = StyleSheet.create({
  codeText: {
    width: (innerWidth - VWValue(17) * 5) / 6,
    height: VWValue(45),
    lineHeight: VWValue(45),
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  codeTextActive: {
    borderColor: '#ff193a',
  },
  codeTextNormal: {
    borderColor: '#353535',
  },

  inputContent: {
    height: VWValue(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  inputItem: {
    // width: innerWidth - VWValue(17),
    position: 'absolute',
    height: VWValue(45),
    left: 0,
    right: 0,
    // backgroundColor: 'pink',
    bottom: 0,
    zIndex: -1,
    // width: (innerWidth - VWValue(17) * 5) / 6,
    // height: VWValue(45),
    // fontSize: 20,
    // color: '#fff',
    // fontWeight: '600',
    // textAlign: 'center',
    // borderBottomColor: '#353535',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

CodeComponent.propTypes = {
  keyboardType: PropTypes.string.isRequired,
  textContentType: PropTypes.string.isRequired,
  getCode: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default CodeComponent;
