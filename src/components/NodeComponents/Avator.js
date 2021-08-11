import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import FastImg from '@/components/FastImg';
import PersonImg from '@/assets/images/personal.png';
import BrandImg from '@/assets/images/brand.png';

const Avator = props => {
  const navigation = useNavigation();
  const {size, account, isShowSettledIcon, containerStyle, handleClick} = props;
  const [isShow] = useState(isShowSettledIcon === false ? false : true);
  const currentAccountId = useSelector(state => state.account.currentAccount.id);

  const imagestyle = {width: size, height: size, borderRadius: Number(size / 2)};
  const iconStyle = {width: Number(size / 3), height: Number(size / 3)};

  const goAccountDetail = () => {
    if (handleClick) {
      handleClick();
      return;
    }

    if (account && account.id) {
      navigation.navigate('AccountDetail', {accountId: account.id});
      if (currentAccountId && currentAccountId === account.id) {
        navigation.push('MineDetail');
      } else {
        navigation.navigate('AccountDetail', {accountId: account.id});
      }
    }
  };

  return (
    <Pressable
      style={[imagestyle, containerStyle, {position: 'relative', flexShrink: 0}]}
      onPress={goAccountDetail}>
      <FastImg style={imagestyle} source={{uri: account.avatar_url}} />
      {isShow && !!account.settled_type && account.settled_type !== 'single' && (
        <FastImg
          style={{...iconStyle, position: 'absolute', right: 0, bottom: 0}}
          source={account.settled_type === 'personal' ? PersonImg : BrandImg}
        />
      )}
    </Pressable>
  );
};

Avator.propTypes = {
  size: PropTypes.number.isRequired, //宽高尺寸
  account: PropTypes.object.isRequired, //用户信息
  isShowSettledIcon: PropTypes.bool, //是否展示加v
  containerStyle: PropTypes.object,
  handleClick: PropTypes.func,
};

export default Avator;
