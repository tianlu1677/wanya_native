import React, {Component, useState, useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import SafeAreaPlus from '@/components/SafeAreaPlus';
import {sendPhoneCode, verifyPhoneCode} from '../../api/phone_sign_api';
import {getCurrentAccount} from '@/api/mine_api';
import Toast from 'react-native-root-toast';
import styled from 'styled-components/native';
import Helper from '../../utils/helper';
import {dispatchSetAuthToken} from '@/redux/actions';
import {CityList} from '@/components/NodeComponents'

const StorageIndex = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [selectedCity, setselectedCity] = useState('');
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerBackTitleVisible: false,
      // headerTintColor: 'white',
      // title: '',
      // headerStyle: {
      //   backgroundColor: 'black',
      //   elevation: 0,
      //   shadowOpacity: 0,
      //   borderBottomWidth: 0,
      //   // color: 'white',
      // },
      // headerRight: () => (
      //   <Button
      //     onPress={() => {
      //       onVerifyPhoneCode();
      //     }}
      //     title="确定"
      //     color={phoneCode.length === 6 ? 'white' : '#353535'}
      //   />
      // ),
    });
  }, [navigation]);

  const listAllStorage = async () => {
    const keys = await Helper.getAllKeys();
    const result = await Helper.multiGet(keys);
    console.log('keys', keys);
    console.log('result', result);
    setData(result);
    // return result.map(req => JSON.parse(req)).forEach((x) =>console.log(x));
  };

  return (
    <SafeAreaPlus>
      <Text
        onPress={() => {
          listAllStorage();
        }}>
        点击显示全部
      </Text>

      <CityList
        selectCity={(item) => {setselectedCity(item.name)}}
        cancelCity={() => {}}
        selectedName={selectedCity}
      />
      {data.map(r => {
        return (
          <View>
            <Text>
              {r[0]} => {r[1]}
            </Text>
          </View>
        );
      })}
    </SafeAreaPlus>
  );
};

const styles = StyleSheet.create({
  //底部默认样式
  phoneContainer: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 30,
    letterSpacing: 1,
  },
});

const TitleText = styled(Text)`
  letter-spacing: 1px;
  font-size: 27px;
  color: white;
  font-weight: 600;
`;

export default StorageIndex;
