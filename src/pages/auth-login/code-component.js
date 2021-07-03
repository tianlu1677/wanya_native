import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {VWValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';

const inputRefData = Array(6).fill(null);

const CodeComponent = props => {
  const {style, getCode} = props;
  const [codeData, setCodeData] = useState(Array(6).fill(null));

  const onChangeText = (text, index) => {
    codeData[index] = text;
    setCodeData([...codeData]);

    if (text) {
      if (index === 5) {
        return;
      }
      inputRefData[index + 1].focus();
    } else {
      if (index === 0) {
        return;
      }
      inputRefData[index - 1].focus();
    }
  };

  useEffect(() => {
    inputRefData[0].focus();
  }, []);

  useEffect(() => {
    getCode(codeData);
  }, [codeData]);

  return (
    <View style={[style, styles.inputContent]}>
      {codeData.map((item, index) => (
        <TextInput
          ref={e => (inputRefData[index] = e)}
          key={index}
          value={item}
          caretHidden={false}
          maxLength={1}
          keyboardType="numeric"
          selectionColor="#ff193a"
          style={styles.inputItem}
          onChangeText={text => onChangeText(text, index)}
        />
      ))}
    </View>
  );
};

const innerWidth = SCREEN_WIDTH - VWValue(50 * 2);
const styles = StyleSheet.create({
  inputContent: {
    height: VWValue(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputItem: {
    width: (innerWidth - VWValue(17) * 5) / 6,
    height: VWValue(45),
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    borderBottomColor: '#353535',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default CodeComponent;
