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
          multiline
          blurOnSubmit={true}
          editable={!enabled}
          placeholder={placeholder}
          placeholderTextColor="#5f5d70"
          onContentSizeChange={onContentSizeChange}
          underlineColorAndroid="transparent"
          onChangeText={textChange}
          value={messageContent}
          onSubmitEditing={this.props.onSubmitEditing}
          returnKeyLabel={'发送'}
          returnKeyType={'send'}
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
    paddingTop: Platform.OS === 'ios' ? 8 : 0,
  },
});
