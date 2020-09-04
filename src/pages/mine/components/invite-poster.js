import React, {Component} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';

import styled from 'styled-components/native';
import InvitePosterImg from '@/assets/images/invite-poster.jpg';

const InvitePoster = props => {
  return (
    <View style={{flex: 1, height: 300, width: 400, position: 'relative'}}>
      <Image
        source={require('../../../assets/images/invite-poster.jpg')}
        style={{height: 650, width: 400, paddingTop: 10, marginLeft: 5, marginRight: 5}}
        resizeMode={'cover'} />
      <CardView>
        <VerifyCodeText>{props.inviteCode || 'UUUUUU'}</VerifyCodeText>
      </CardView>
    </View>
  );
};
const CardView = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 320;
  left: 0;
  right: 0;
`;

const VerifyCodeText = styled(Text)`
  font-size: 28px;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
`;

export default InvitePoster;
