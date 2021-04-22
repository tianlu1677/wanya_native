import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';

const TopBack = props => {
  const {top, color, handleShare, onReportClick} = props;
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.goBack();
  };

  const hitSlop = {left: 10, right: 10, top: 10, bottom: 10};

  return (
    <>
      <Pressable onPress={handleClick} style={[styles.backWrap, {top: top}]} hitSlop={hitSlop}>
        <IconFont name={'arrow-left'} color={color || '#fff'} size={15} />
      </Pressable>

      {/* 分享 */}
      {handleShare && (
        <Pressable onPress={handleShare} style={[styles.shareWrap, {top: top}]} hitSlop={hitSlop}>
          <IconFont name={'zhuanfa'} color={color || '#fff'} size={17} />
        </Pressable>
      )}

      {/* 举报 */}
      {onReportClick && (
        <Pressable onPress={onReportClick} style={[styles.shareWrap, {top: top}]} hitSlop={hitSlop}>
          <IconFont name={'gengduo'} color={color || '#fff'} size={20} />
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: RFValue(40),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backWrap: {
    position: 'absolute',
    zIndex: 2,
    left: 14,
  },
  shareWrap: {
    position: 'absolute',
    zIndex: 2,
    right: 14,
  },
});

TopBack.propTypes = {
  top: PropTypes.number.isRequired,
  color: PropTypes.string,
  handleShare: PropTypes.func,
};

export default TopBack;
