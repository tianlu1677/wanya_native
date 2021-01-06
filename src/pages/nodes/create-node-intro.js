import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';

const {width} = Dimensions.get('window');

const CreateNodeIntro = ({navigation}) => {
  const [check, setcheck] = useState(false);

  return (
    <View style={styles.wrapper}>
      <FastImg
        source={require('../../assets/images/node-intro.png')}
        style={{width: width, height: (width * 2434) / 1500}}
      />
      <View style={styles.bottom}>
        <View style={styles.ruleWrapper}>
          <Pressable
            style={styles.checkbox}
            hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
            onPress={() => setcheck(!check)}>
            {check && <IconFont name="yixuan" size={16} color="#000" />}
          </Pressable>
          <Text style={styles.ruletext}>所建圈子符合将符合法律和社区规范</Text>
        </View>
        <Pressable
          style={styles.surebtnWrap}
          onPress={() => (check ? navigation.push('CreateNodeInfo') : {})}>
          <Text style={[styles.surebtn, check ? styles.canClick : styles.disabled]}>开始创建</Text>
        </Pressable>
      </View>
    </View>
  );
};

const boxShadow = {
  shadowColor: '#bdbdbd',
  shadowRadius: 3,
  shadowOpacity: 0.5,
  shadowOffset: {width: 1, height: 2},
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottom: {
    position: 'absolute',
    bottom: RFValue(70),
    left: RFValue(30),
    right: RFValue(30),
  },
  ruleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: RFValue(15),
    height: RFValue(15),
    borderColor: '#bdbdbd',
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruletext: {
    color: '#BDBDBD',
  },
  surebtnWrap: {
    ...boxShadow,
  },
  surebtn: {
    height: RFValue(50),
    lineHeight: RFValue(50),
    textAlign: 'center',
    borderRadius: 3,
    overflow: 'hidden',
    fontWeight: '500',
    fontSize: 16,
    marginTop: RFValue(18),
    ...boxShadow,
  },
  canClick: {
    backgroundColor: '#000',
    color: '#fff',
  },
  disabled: {
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
  },
});

export default CreateNodeIntro;
