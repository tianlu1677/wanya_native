import React from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {personalImg, brandlImg} from '@/utils/default-image';

const Avator = props => {
  const imagestyle = {
    width: props.size,
    height: props.size,
  };

  const iconStyle = {
    width: Number(props.size / 3),
    height: Number(props.size / 3),
  };

  return (
    <View style={{...imagestyle, position: 'relative'}}>
      <Image
        style={{...imagestyle, borderRadius: Number(props.size / 2), display: 'flex'}}
        source={{uri: props.account.avatar_url}}
      />
      {props.account.settled_type !== 'single' && (
        <Image
          style={{...iconStyle, position: 'absolute', right: 0, bottom: 0}}
          source={{uri: props.account.settled_type === 'personal' ? personalImg : brandlImg}}
        />
      )}
    </View>
  );
};

Avator.propTypes = {
  size: PropTypes.number.isRequired, //宽高尺寸
};

export default Avator;
