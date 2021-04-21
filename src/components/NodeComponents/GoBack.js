import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import {useNavigation} from '@react-navigation/native';
import {SAFE_TOP} from '@/utils/navbar';

export const GoBack = props => {
  const navigation = useNavigation();
  let name = props.name || 'arrow-left';
  let color = props.color || 'white';
  const {report} = props; // 投诉信息
  const handleClick = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Recommend'}],
      });
    }
  };

  return (
    <>
      <Pressable
        onPress={() => {
          handleClick();
        }}
        style={{...styles.goBackWrap, top: props.top || SAFE_TOP}}>
        <IconFont
          name={navigation.canGoBack() ? 'arrow-left' : 'home-recommend'}
          color={color}
          size={15}
        />
      </Pressable>
      {report && (
        <Pressable
          onPress={props.onReportClick}
          style={{...styles.report, top: props.top || SAFE_TOP}}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <IconFont name="gengduo" color="#fff" size={20} />
        </Pressable>
      )}
      {props.rightBtn && (
        <Pressable
          onPress={props.onHandleRight}
          style={{...styles.report, top: props.top || SAFE_TOP}}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          {props.rightBtn}
        </Pressable>
      )}
    </>
  );
};

GoBack.propTypes = {
  // type: PropTypes.string.isRequired, // 具体类型
  // text: PropTypes.string.isRequired, // 文字
};

export default GoBack;

const styles = StyleSheet.create({
  goBackWrap: {
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 34,
    width: 44,
    lineHeight: 34,
    flexDirection: 'row',
    color: 'white',
    // backgroundColor: 'red',
  },

  report: {
    position: 'absolute',
    right: 16,
    height: 34,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },

  button: {
    color: 'white',
  },
  centerText: {
    paddingLeft: 13,
    fontSize: 14,
    letterSpacing: 1,
    color: 'white',
    fontWeight: '500',
  },
});
