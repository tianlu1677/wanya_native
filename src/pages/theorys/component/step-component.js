import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';

export const defaultProps = {
  autoCorrect: false,
  autoComplete: false,
  caretHidden: false,
  selectionColor: '#ff193a',
  placeholderTextColor: '#9F9F9F',
};

const StepCompoment = props => {
  const {data, index, change} = props;

  const onChangeText = (value, attr) => {
    change({...data, [attr]: value}, index);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrap}>
        <Text style={styles.titleText}>第{index + 1}步</Text>
        <TextInput
          {...defaultProps}
          value={data.title}
          maxLength={30}
          style={styles.titleInput}
          onChangeText={text => onChangeText(text, 'title')}
        />
      </View>
      <View style={styles.mediaWrap}>
        <IconFont name={'shangchuan'} size={18} color="#9F9F9F" />
        <Text style={styles.mediaText}>上传步骤图/视频/GIF</Text>
      </View>
      <TextInput
        {...defaultProps}
        multiline
        value={data.intro}
        maxLength={30}
        style={styles.stepIntro}
        onChangeText={text => onChangeText(text, 'intro')}
      />
    </View>
  );
};

const greyColor = {backgroundColor: '#fafafa'};
const blackText = {fontWeight: '500', fontSize: 16, color: '#000'};
const greyText = {fontWeight: '300', fontSize: 14, color: '#9F9F9F'};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: RFValue(25),
  },
  titleWrap: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 5,
    ...greyColor,
  },
  titleText: {
    height: RFValue(45),
    lineHeight: RFValue(45),
    ...blackText,
    ...greyColor,
  },
  titleInput: {
    flex: 1,
    marginLeft: 10,
    ...blackText,
  },
  mediaWrap: {
    height: RFValue(120),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: RFValue(10),
    ...greyColor,
  },
  mediaText: {
    marginLeft: 5,
    ...greyText,
  },
  stepIntro: {
    minHeight: RFValue(45),
    lineHeight: RFValue(20),
    paddingHorizontal: RFValue(15),
    paddingTop: RFValue(5),
    paddingBottom: RFValue(10),
    borderRadius: 5,
    marginTop: RFValue(10),
    ...greyText,
    ...greyColor,
  },
});

export default StepCompoment;
