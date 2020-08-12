import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';

import styled from 'styled-components/native';

class InviteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView>
          <CardView>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/images/social-login.jpg')}
                style={{width: 42, height: 42, borderRadius: 21, marginRight: 10}}
              />
              <CardTitleText>我的邀请码</CardTitleText>
            </View>

            <CardCodeText>9HHHKKL</CardCodeText>
            <CardCopyText>复制</CardCopyText>
          </CardView>

          <View>
            <Text>向朋友发送社区体验邀请</Text>
            <Text>与朋友共建青年社区文化。</Text>
          </View>

          <View>
            <View></View>

            <Text>已邀请6位</Text>
          </View>
        </SafeAreaView>
        <Button
          title="微信分享"
          titleStyle={{fontSize: 16, fontWeight: '500'}}
          buttonStyle={{height: 50, backgroundColor: 'black'}}
          containerStyle={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
          }}
        />
      </View>
    );
  }
}

const CardView = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 21px 25px 31px 25px;
  height: 290px;
  border-radius: 3px;
  background: black;
  border-radius: 6px;
`;

const CardTitleText = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: rgba(189, 189, 189, 1);
  line-height: 43px;
  letter-spacing: 1px;
`;

const CardCodeText = styled(Text)`
  color: white;
  font-weight: 600;
  font-size: 28px;
  letter-spacing: 1px;
`;

const CardCopyText = styled(Text)`
  color: #bdbdbd;
`;

const DescView = styled(View)``;

const DescText = styled(Text)``;

export default InviteDetail;
