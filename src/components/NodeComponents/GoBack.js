import React from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import Icon from 'react-native-vector-icons/Ionicons';
// import { Icon } from 'react-native-elements'

import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import { SAFE_TOP } from '@/utils/navbar';

export const GoBack = props => {
  const navigation = useNavigation();
  let name = props.name || 'arrow-left';
  let color = props.color || 'white';
  const {report} = props; // 举报信息
  const handleClick = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Recommend'}],
      });
      // navigation.navigate('Recommend');
      // console.log('no go');
    }
  };

  return (
    <>
      <Pressable
        onPress={() => {
          handleClick();
        }}
        style={{...styles.goBackWrap, top: SAFE_TOP}}>
        <IconFont name={name} color={color} size={15} />
      </Pressable>
      {report && (
        <Pressable
          onPress={() => {
            navigation.push('Report', {
              report_type: report.report_type,
              report_type_id: report.report_id,
            });
          }}
          style={{...styles.report, top: SAFE_TOP}}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <IconFont name="ziyuan" color="#fff" size={20} />
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
    height: 44,
    width: 44,
    lineHeight: 44,
    flexDirection: 'row',
    color: 'white',
    // backgroundColor: 'red',
  },

  report: {
    position: 'absolute',
    right: 16,
    height: 44,
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
