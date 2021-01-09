import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {getCheckNodesDetail} from '@/api/node_api';

const CreateNodeResult = props => {
  const navigation = props.navigation
  const dispatch = useDispatch();
  const [nodeId] = useState(props.route.params.nodeId);
  const [detail, setDetail] = useState(null);

  const loadData = async () => {
    const res = await getCheckNodesDetail(nodeId);
    console.log('nodeId', nodeId, res.data);
    setDetail(res.data.check_node);
  };

  const onEditNode = () => {
    dispatch({
      type: action.CREATE_NODE,
      value: {...detail, cover: {cover_id: detail.cover_id, cover_url: detail.cover_url}},
    });
    navigation.navigate('CreateNodeInfo', {nodeId});
  };

  const onShare = () => {
    navigation.navigate('InviteDetail');
  };

  useEffect(() => {
    loadData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({headerTitle: detail ? detail.name : ''});
  }, [navigation, detail]);

  console.log('detail result', detail);

  return detail ? (
    <View style={styles.wrapper}>
      <View style={styles.imageWrap}>
        <FastImg style={styles.image} mode={'cover'} source={{uri: detail.cover_url}} />
        <View style={styles.imageInfo}>
          <Text style={styles.text}>{detail.audit_status_text}</Text>
          <Text style={styles.time}>{detail.response_reason}</Text>
        </View>
      </View>
      <Text style={styles.tips}>满足以下条件即可开始审核你所创建的圈子哦~</Text>
      {detail.permissions.map((item, index) => (
        <View style={styles.slideView} key={index}>
          <View style={styles.textWrap}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDesc}>{item.desc}</Text>
          </View>
          {item.is_reach ? (
            <IconFont name="check" size={30} />
          ) : index === 0 ? (
            <Text style={styles.error} onPress={() => navigation.navigate('NewTopic')}>去发帖</Text>
          ) : index === 1 ? (
            <Text style={styles.error} onPress={onShare}>去邀请</Text>
          ) : index === 2 ? (
            <IconFont name="closed" size={30} />
          ) : null}
        </View>
      ))}
      <Text style={styles.introText}>
        申请成功后，你将成为该圈子的圈主。将拥有管理该圈子的权限，同时将优先享有圈子相关功能体验福利
      </Text>
      <Pressable style={styles.surebtnWrap}>
        {/* 审核中不可以编辑 */}
        {detail.audit_status !== 'auditing' && (
          <Text style={styles.surebtn} onPress={onEditNode}>
            编辑圈子
          </Text>
        )}
        <Text
          style={[styles.surebtn, {marginLeft: detail.audit_status !== 'auditing' ? 5 : 0}]}
          onPress={onShare}>
          邀请小伙伴
        </Text>
      </Pressable>
    </View>
  ) : (
    <Loading />
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
    paddingHorizontal: RFValue(30),
    paddingTop: RFValue(30),
  },
  imageWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: RFValue(71),
    height: RFValue(71),
  },
  imageInfo: {
    marginLeft: RFValue(18),
  },
  text: {
    color: '#7F7F81',
    fontSize: 14,
  },
  time: {
    color: '#BDBDBD',
    fontSize: 12,
    marginTop: 5,
  },
  tips: {
    marginTop: RFValue(25),
    fontSize: 14,
    marginBottom: RFValue(20),
  },
  slideView: {
    height: RFValue(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(10),
    marginBottom: RFValue(15),
    ...boxShadow,
  },
  textWrap: {
    justifyContent: 'space-between',
  },
  slideTitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  slideDesc: {
    fontSize: 12,
    color: '#BDBDBD',
    lineHeight: 20,
  },
  introText: {
    color: '#bdbdbd',
    fontSize: 12,
    lineHeight: RFValue(17),
  },
  error: {
    color: '#FF2242',
    fontSize: 14,
  },
  surebtnWrap: {
    ...boxShadow,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  surebtn: {
    height: RFValue(50),
    lineHeight: RFValue(50),
    textAlign: 'center',
    borderRadius: 3,
    overflow: 'hidden',
    fontWeight: '500',
    fontSize: 16,
    marginTop: RFValue(60),
    backgroundColor: '#000',
    color: '#fff',
    flex: 1,
  },
});

export default CreateNodeResult;
