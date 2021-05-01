import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {createFeedback} from '@/api/feedback_api';
import {Button} from 'react-native-elements';
import {BOTTOM_HEIGHT} from '@/utils/navbar';
import Toast from '@/components/Toast';
import ChatWoot from '@/components/ChatWoot';

const Feedback = ({navigation, route}) => {
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const [showWidget, toggleWidget] = useState(false);

  const dispatch = useDispatch();

  const sendFeedback = async () => {
    if (content.length < 1) {
      return;
    }
    let data = {
      content: content,
      contact: contact,
      account_id: currentAccount.id,
    };

    // console.log('dda', data);
    await createFeedback(data);
    Toast.showError('反馈成功');
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };
  const validForm = () => {
    return content.length > 1;
  };

  return (
    <View style={{flex: 1}}>
      {/*<StatusBar barStyle="dark-content" backgroundColor={'white'} />*/}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <TitleView>
            <Text style={{fontSize: 14}}>意见与反馈</Text>
          </TitleView>
          <ContentWrapView>
            <ContentInput
              caretHidden={false}
              selectionColor={'#ff193a'}
              maxLength={1000}
              onChangeText={text => {
                setContent(text);
              }}
              multiline
              // numberOfLines={10}
              placeholder={
                '写下你在使用过程中遇到的问题或建议，如卡顿、闪退等，我们将第一时间响应。'
              }
              placeholderTextColor={'#c2c2c2'}
              defaultValue={content}
            />
          </ContentWrapView>

          <TitleView>
            <Text>联系方式</Text>
          </TitleView>

          <ContractWrapView>
            <ContractInput
              caretHidden={false}
              selectionColor={'#ff193a'}
              maxLength={100}
              onChangeText={text => {
                setContact(text);
              }}
              placeholder={'写下您的微信或手机号'}
              placeholderTextColor={'#c2c2c2'}
              defaultValue={contact}
            />
          </ContractWrapView>

          <Button
            containerStyle={{
              ...styles.publicBtnContainer,
            }}
            buttonStyle={{
              ...styles.saveButton,
              backgroundColor: validForm() ? 'black' : '#F8F8F8',
            }}
            titleStyle={validForm() ? styles.validTitle : styles.novalidTitle}
            title="确定"
            onPress={() => {
              sendFeedback();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
      <View>
        <Pressable style={styles.chatButton} onPress={() => toggleWidget(true)}>
          <Text style={styles.chatButtonText}>客服联系</Text>
        </Pressable>
        {<ChatWoot showWidget={showWidget} toggleWidget={toggleWidget} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //底部默认样式
  publicBtnContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: BOTTOM_HEIGHT,
    backgroundColor: 'black',
  },
  saveButton: {
    fontSize: 28,
    color: 'red',
    width: '100%',
    height: 50,
    borderRadius: 2,
  },

  novalidTitle: {
    fontSize: 16,
    color: '#d7d7d7',
  },
  validTitle: {
    fontSize: 16,
    color: 'white',
  },

  chatButton: {
    position: 'absolute',
    height: 80,
    right: 10,
    bottom: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#1F93FF',
    borderRadius: 40,

    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
  },
  chatButtonText: {
    color: 'white',
  }
});

const TitleView = styled(Text)`
  height: 43px;
  padding-left: 15px;
  line-height: 43px;
  font-size: 12px;
  font-weight: 300;
  background-color: #fafafa;
`;

const ContentWrapView = styled(View)`
  background-color: white;
  padding: 13px 15px;
`;

const ContentInput = styled(TextInput)`
  font-size: 15px;
  height: 174px;
  line-height: 16px;
  padding-top: 10px;
  text-align-vertical: top;
`;

const ContractWrapView = styled(View)`
  font-size: 14px;
  font-weight: 400;
  padding-left: 15px;
  background-color: white;
`;

const ContractInput = styled(TextInput)`
  font-size: 15px;
  height: 50px;
  line-height: 16px;
`;

const TitleText = styled(Text)`
  letter-spacing: 1px;
  font-size: 27px;
  color: white;
  font-weight: 600;
`;


export default Feedback;
