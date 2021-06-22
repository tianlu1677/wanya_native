import React, {PureComponent} from 'react';
import {Platform, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

class Input extends PureComponent {
  render() {
    const {
      enabled,
      onFocus,
      placeholder,
      onContentSizeChange,
      textChange,
      messageContent,
      inputHeightFix,
      inputChangeSize,
      inputStyle,
    } = this.props;
    return (
      <TouchableOpacity
        disabled={!enabled}
        activeOpacity={1}
        onPress={() => {
          onFocus();
        }}>
        <TextInput
          // ref={e => (this.input = e)}
          ref={this.props.getRef}
          multiline={false}
          blurOnSubmit={false}
          editable={!enabled}
          placeholder={placeholder}
          placeholderTextColor="#bdbdbd"
          selectionColor={'#ff193a'}
          onContentSizeChange={onContentSizeChange}
          underlineColorAndroid="transparent"
          onChangeText={textChange}
          value={messageContent}
          onSubmitEditing={this.props.onSubmitEditing}
          // onKeyPress={({ nativeEvent: { key: keyValue } }) => {
          //   console.log('keyValue', keyValue)
          //   if(keyValue === 'Enter') {
          //     this.props.onSubmitEditing()
          //   }
          // }}
          returnKeyLabel={'发送'}
          returnKeyType={'send'}
          textAlignVertical={'top'}
          style={[
            styles.commentBar__input,
            {height: Math.max(35 + inputHeightFix, inputChangeSize)},
            inputStyle,
          ]}
        />
      </TouchableOpacity>
    );
  }
}

export default Input;

const styles = StyleSheet.create({
  commentBar__input: {
    borderRadius: 18,
    width: '100%',
    padding: 0,
    paddingHorizontal: 16,
    // paddingTop: Platform.OS === 'ios' ? 8 : 0,
    fontSize: 13,
    // borderColor: '#ebebeb',
    borderColor: '#ccc',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
