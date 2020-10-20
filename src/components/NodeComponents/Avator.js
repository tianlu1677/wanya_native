import React, {useState} from 'react';
import {Image, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import FastImg from '@/components/FastImg';
import PersonImg from '@/assets/images/personal.png';
import BrandImg from '@/assets/images/brand.png';

const Avator = props => {
  const [isShow] = useState(props.isShowSettledIcon === false ? false : true);
  // const currentAccountId = useSelector(state => state.account.currentAccount.id);

  const navigation = useNavigation();
  const imagestyle = {
    width: props.size,
    height: props.size,
  };

  const iconStyle = {
    width: Number(props.size / 3),
    height: Number(props.size / 3),
  };

  function goAccountDetail() {
    if (props.handleClick) {
      props.handleClick();
      return;
    }

    if (props.account && props.account.id) {
      navigation.navigate('AccountDetail', {accountId: props.account.id});
      // if(currentAccountId && currentAccountId === props.account.id) {
      //   navigation.push('MineDetail');
      // } else {
      //   navigation.navigate('AccountDetail', {accountId: props.account.id});
      // }
    }
  }

  return (
    <Pressable
      style={{...imagestyle, position: 'relative', flexShrink: 0, ...props.containerStyle}}
      onPress={goAccountDetail}>
      <FastImg
        style={{...imagestyle, borderRadius: Number(props.size / 2), display: 'flex'}}
        source={{uri: props.account.avatar_url}}
      />
      {isShow && !!props.account.settled_type && props.account.settled_type !== 'single' && (
        <FastImg
          style={{...iconStyle, position: 'absolute', right: 0, bottom: 0}}
          source={props.account.settled_type === 'personal' ? PersonImg : BrandImg}
        />
      )}
    </Pressable>
  );
};

Avator.propTypes = {
  size: PropTypes.number.isRequired, //宽高尺寸
  account: PropTypes.object.isRequired, //用户信息
  isShowSettledIcon: PropTypes.bool, //是否展示加v
};

export default Avator;
