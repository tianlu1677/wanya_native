import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';

import styled from 'styled-components/native';
import InvitePosterImg from '../../../assets/images/invite-poster.jpg';

class InvitePoster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareModelVisible: false,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          // source={{uri: InvitePosterImg}}
          source={require('../../../assets/images/invite-poster.jpg')}
          style={{width: '100%', height: '100%'}}
          resizeMode={'cover'}>
          <CardView>
            <VerifyCodeText>UUUUUU</VerifyCodeText>
          </CardView>
        </ImageBackground>
      </View>
    );
  }
}

const CardView = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 430px;
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
