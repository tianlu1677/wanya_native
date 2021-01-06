import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TopHeaderView from '@/components/TopHeadView';
import {NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT} from '@/utils/navbar';
import IconFont from '@/iconfont';
import * as action from '@/redux/constants';
import {getCheckNodes} from '@/api/node_api';

import {CategoryDrawer} from '@/components/NodeComponents';

import {RFValue} from '@/utils/response-fontsize';
import {ScrollView} from 'react-native-gesture-handler';

const CreateNodeType = props => {
  const {createNode} = useSelector(state => state.node);
  console.log('createNode', createNode);

  const [visible, setVisible] = useState(false);
  const [type, setType] = useState(null);
  const [address, setaddress] = useState(null);
  const [values, setValues] = useState({cover: '', name: '', desc: '', nickname: ''});

  const onCreateClick = async () => {
    const params = {...createNode, category_id: type.id};
    console.log('params', params);
    const res = await getCheckNodes(params);
    console.log('res', res);
  };

  const onChooseType = () => {
    setVisible(true);
  };

  const onChooseValue = value => {
    setVisible(false);
    setType(value);
  };

  return (
    <View style={styles.wrapper}>
      <TopHeaderView Title={'选择圈子分类或位置'} leftButtonColor={'black'} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <Pressable style={styles.slideView} onPress={onChooseType}>
            <Text style={[styles.slidetext, {color: type ? '#000' : '#bdbdbd'}]}>
              {type ? type.name : '请选择圈子所属分类（必填）'}
            </Text>
            <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
          </Pressable>
          <Pressable style={[styles.slideView, {marginBottom: 0}]} onPress={onChooseType}>
            <Text style={[styles.slidetext, {color: address ? '#000' : '#bdbdbd'}]}>
              {address ? address.name : '可选择圈子所在位置（选填）'}
            </Text>
            <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
          </Pressable>
          <Text style={styles.introText}>选择所在位置后，将方便附近顽友发现该圈子</Text>
          <Text
            style={[styles.surebtn, type ? styles.canClick : styles.disabled]}
            onPress={onCreateClick}>
            确认创建
          </Text>
          {visible && <CategoryDrawer current={type} onChooseValue={onChooseValue} />}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
  container: {
    flex: 1,
    paddingHorizontal: RFValue(30),
    paddingTop: RFValue(65),
    // justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  slideView: {
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: RFValue(15),
    paddingRight: 15,
    marginBottom: RFValue(20),
    fontSize: 12,
    ...boxShadow,
  },
  slidetext: {
    fontSize: 14,
  },
  introText: {
    color: '#bdbdbd',
    marginTop: RFValue(12),
    fontSize: 12,
  },
  surebtn: {
    height: RFValue(50),
    lineHeight: RFValue(50),
    textAlign: 'center',
    marginTop: RFValue(80),
    borderRadius: 4,
    fontWeight: '500',
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

export default CreateNodeType;
