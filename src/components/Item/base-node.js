import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import * as action from '@/redux/constants';
import {JoinButton} from '@/components/NodeComponents';
import {followItem, unfollowItem} from '@/api/mine_api';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';

const BaseNode = props => {
  const {data, type} = props;
  const [followed, setFollowed] = useState(data.followed);

  const onFollow = async () => {
    const params = {followable_type: 'Node', followable_id: data.id};
    const res = followed ? await unfollowItem(params) : await followItem(params);
    Toast.show(res.followed ? '已成功加入' : '已取消加入', {duration: 500});
    setFollowed(res.followed);
  };

  return (
    <Pressable style={[styles.dataItem]}>
      <FastImg style={styles.dataImg} source={{uri: data.cover_url}} />
      <View style={styles.dataInfo}>
        <View style={styles.dataNameWrap}>
          <Text style={styles.dataName}>{data.name}</Text>
          <Text style={styles.dataDesc}>
            {data.topics_count}篇帖子 · {data.accounts_count}位{data.nickname || '圈友'}
          </Text>
        </View>

        {/* add-data */}
        {/* {props.type === 'add-data' &&
            (home.savetopic.data && home.savetopic.data.id === data.id ? (
              <IconFont name="chose-success" size={15} color={'#000'} style={styles.icon} />
            ) : (
              <IconFont name="tianjia1" size={15} color={'#000'} style={styles.icon} />
            ))} */}

        {/* data-index-mine */}
        {/* {props.type === 'data-index-mine' && (
            <View style={{marginRight: 20}}>
              <Pressable onPress={godataResult}>
                {data.audit_status === 'new' && <JoinButton join={true} text="未审核" />}
                {data.audit_status === 'auditing' && <JoinButton join={true} text="审核中" />}
                {data.audit_status === 'failed' && <JoinButton join={true} text="未通过" />}
                {data.audit_status === 'success' && <JoinButton join={true} text="管理" />}
              </Pressable>
            </View>
          )} */}

        {/* list */}
        {type === 'list' && (
          <View style={{marginRight: props.type === 'data-index' ? 20 : 0}}>
            <JoinButton join={followed} text={followed ? '已加入' : '加入'} onPress={onFollow} />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dataItem: {
    flexDirection: 'row',
    padding: 14,
  },
  dataImg: {
    width: 49,
    height: 49,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ffff00',
    marginRight: 10,
  },
  cateTitle: {
    paddingBottom: 13,
    paddingTop: 15,
    color: '#7f7f81',
  },
  dataInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dataNameWrap: {
    marginRight: 'auto',
    height: 49,
    flex: 1,
    paddingTop: 5,
  },
  dataName: {
    lineHeight: 20,
    fontSize: 15,
    fontWeight: '500',
  },
  dataDesc: {
    fontSize: 11,
    color: '#bdbdbd',
    marginTop: 5,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 20,
  },
});

export default BaseNode;
