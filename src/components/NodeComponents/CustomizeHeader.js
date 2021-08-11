import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {dispatchShareItem} from '@/redux/actions';
import IconFont from '@/iconfont';
import {SAFE_TOP} from '@/utils/navbar';

const CustomizeHeader = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const hitSlop = {top: 20, bottom: 20, left: 20, right: 20};

  const canGoBack = navigation.canGoBack();

  const handleBackClick = () => {
    if (canGoBack) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Recommend'}],
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* 返回 */}
      {props.back ? (
        <Pressable onPress={handleBackClick} hitSlop={hitSlop}>
          <IconFont
            name={canGoBack ? 'arrow-left' : 'home-recommend'}
            color={props.back.color || 'white'}
            size={15}
          />
        </Pressable>
      ) : null}

      {props.children}

      {props.rightButton}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: SAFE_TOP,
    left: 0,
    right: 0,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
});

export default CustomizeHeader;
