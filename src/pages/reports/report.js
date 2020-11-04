import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {Pressable, ScrollView, StyleSheet, View, TextInput, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {reportContent} from '@/api/secure_check';
import SafeAreaPlus from '@/components/SafeAreaPlus';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';

const Report = ({navigation, route}) => {
  const [report_type] = useState(route.params?.report_type); // 传递过来的
  const [report_type_id] = useState(route.params?.report_type_id); // 传递过来的

  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [moreReason, setMoreReason] = useState('');
  const dispatch = useDispatch();

  const messages = [
    '垃圾广告',
    '色情低俗',
    '和话题氛围不符',
    '攻击谩骂',
    '内容不适合未成年观看',
    '内容侵权',
    '诈骗信息',
    '政治敏感',
    '血腥暴力',
    '赌博',
    '故意引起冲突',
    '其他问题',
  ];
  const messagesLength = messages.length;
  const otherMessage = messages[messagesLength - 1];

  const onSubmit = async () => {
    console.log('onSubmit', reason);
    if (!reason) {
      Toast.showError('请选择一个选项，进行举报');
    }

    const data = {
      reason: reason,
      more_reason: moreReason,
      report_type: 'Topic',
      report_type_id: '1',
    };
    const res = await reportContent(data);
    console.log('res', res);
    Toast.showError('反馈成功');
    setTimeout(() => {
      navigation.goBack()
    }, 500)
  };
  return (
    <View style={styles.container}>
      <View style={{height: 10, backgroundColor: '#FAFAFA'}} />
      <ScrollView
        keyboardDismissMode={'on-drag'}
        keyboardShouldPersistTaps='never'
      >
        {messages.map((message, index) => {
          return (
            <View key={message}>
              <Pressable
                onPress={() => {
                  setReason(message);
                }}
                style={{
                  ...styles.cell,
                  borderBottomWidth:
                    reason === otherMessage && (messagesLength - 1)===index ? 0 : StyleSheet.hairlineWidth,
                }}>
                <View>
                  <Text style={styles.text}>{message}</Text>
                </View>
                <View style={{justifyContent: 'center', marginRight: 14}}>
                  {message === reason ? <IconFont name={'chose-success'} size={16} /> : <Text />}
                </View>
              </Pressable>
            </View>
          );
        })}
        {reason === messages[messages.length - 1] && (
          <TextInput
            caretHidden={false}
            selectionColor={'#ff193a'}
            maxLength={100}
            onChangeText={text => {
              setMoreReason(text);
            }}
            multiline
            numberOfLines={10}
            placeholder={'输入举报理由，100字以内'}
            placeholderTextColor={'#C2C2C2'}
            defaultValue={''}
            style={{marginLeft: 14, marginRight: 14}}
          />
        )}
      </ScrollView>

      <Pressable style={styles.saveBtn} onPress={onSubmit}>
        <Text style={styles.saveBtnText}>确定</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  //底部默认样式
  container: {
    paddingTop: 10,
    letterSpacing: 1,
    backgroundColor: 'white',
    position: 'relative',
    flex: 1,
    paddingBottom: 100
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    height: 50,
    marginLeft: 14,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 50,
  },
  saveBtn: {
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
  saveBtnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
    fontWeight: '500',
  },
});

export default Report;
