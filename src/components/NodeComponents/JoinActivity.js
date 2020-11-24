import React from 'react';
import {Text, View, Image, PixelRatio, StyleSheet, Pressable} from 'react-native';
// import {BlurView, VibrancyView} from '@react-native-community/blur';
import IconFont from '@/iconfont';
import PropTypes from 'prop-types';
import BlurView from './BlurViewComponent';
// import {BlurView} from '@/components/NodeComponents';

export const JoinActivity = props => {
  let type = props.type || 'photo';

  const handleClick = () => {
    // console.log('handleClick');
    props.handleClick && props.handleClick();
  };

  return (
    <BlurView
      style={styles.joinWrapper}
      blurType="dark"
      blurAmount={80}
      reducedTransparencyFallbackColor="black">
      <Pressable
        onPress={() => {
          handleClick();
        }}
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          height: '100%',
        }}>
        {type === 'node' && <IconFont name={'takephoto'} size={22} color="white" />}
        <Text style={styles.centerText}>{props.text || '参与活动'}</Text>
      </Pressable>
    </BlurView>
  );
};

JoinActivity.propTypes = {
  type: PropTypes.string.isRequired, // 具体类型
  text: PropTypes.string.isRequired, // 文字
};

export default JoinActivity;
const styles = StyleSheet.create({
  joinWrapper: {
    position: 'absolute',
    bottom: 25,
    left: '32%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 140,
    borderRadius: 22,
    flexDirection: 'row',
    overflow: 'hidden'
  },

  leftBtn: {
    width: 22,
    height: 22,
  },

  centerText: {
    paddingLeft: 13,
    fontSize: 14,
    letterSpacing: 1,
    color: 'white',
    fontWeight: '500',
  },
});
