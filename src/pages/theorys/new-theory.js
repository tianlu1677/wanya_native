import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import Toast from '@/components/Toast';

const NewTheory = props => {
  const {navigation} = props;
  const [textValue, setTextValue] = useState();

  useLayoutEffect(() => {
    const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};

    const onSubmit = () => {
      if (!textValue) {
        Toast.show('顽法名称不能为空哦~');
        return false;
      }
      navigation.navigate('NewTheoryContent');
    };

    navigation.setOptions({
      headerTitle: '写顽法',
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} hitSlop={hitSlop}>
          <IconFont name={'close'} size={14} />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={onSubmit}>
          <Text style={{fontSize: 15, color: textValue ? '#000' : '#bdbdbd'}}>下一步</Text>
        </Pressable>
      ),
    });
  }, [navigation, textValue]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={styles.inputContent}
            autoFocus
            autoCorrect={false}
            autoComplete={false}
            caretHidden={false}
            selectionColor={'#ff193a'}
            placeholderTextColor={'#9F9F9F'}
            placeholder="添加顽法名称"
            maxLength={30}
            value={textValue}
            onChangeText={value => setTextValue(value)}
          />
          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>💡提示</Text>
            <Text style={styles.tipsText}>
              1.好的顽法标题应该包含准确的技巧名称，比如：kickflip的奇妙顽法，落叶飘这样顽最简单
            </Text>
            <Text style={styles.tipsText}>
              2.顽法标题也可以添加兴趣名称，将更有利推荐和搜索，比如：长板carving如何飘逸的关键所在
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingTop: RFValue(90),
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
  },
  inputContent: {
    paddingTop: RFValue(10),
    paddingBottom: RFValue(10),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
  },
  tips: {
    marginTop: RFValue(20),
  },
  tipsTitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: RFValue(10),
    color: '#9F9F9F',
  },
  tipsText: {
    fontSize: 12,
    lineHeight: 20,
    marginBottom: RFValue(8),
    color: '#9F9F9F',
    fontWeight: '300',
  },
});

export default NewTheory;
