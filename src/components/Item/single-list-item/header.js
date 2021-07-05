import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';
import LocationBar from '@/components/LocationBar';
import {VWValue} from '@/utils/response-fontsize';
import {deleteTopic} from '@/api/topic_api';
import {deleteTheory} from '@/api/theory_api';
import ActionSheet from '@/components/ActionSheet';
import {cancelAction, createAction} from '@/api/action_api';

export const Header = props => {
  const {
    typeHeader,
    data: {id, account, node_id, node_name, published_at_text, space, distance, location},
  } = props;
  const navigation = useNavigation();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const [star, setstar] = useState(props.data.star);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionItems, setActionItems] = useState([]);

  const goAccountDetail = () => {
    navigation.push('AccountDetail', {accountId: account.id});
  };

  const onStar = async () => {
    const item_type = props.type.replace(/^\S/, s => s.toUpperCase());
    const actionData = {target_id: id, target_type: item_type, type: 'star'};
    switch (item_type) {
      case 'Topic':
      case 'Article':
      case 'Theory':
        if (star) {
          await cancelAction(actionData);
        } else {
          await createAction(actionData);
        }
        break;
    }
    setstar(!star);
    Toast.showError(star ? '已取消收藏' : '已收藏');
  };

  const onReportClick = () => {
    const isCurrentSelf = account.id === currentAccount.id;
    let options = [];

    if (isCurrentSelf) {
      options = [
        {id: 1, label: star ? '取消收藏' : '收藏', onPress: async () => onStar()},
        {
          id: 2,
          label: '删除',
          onPress: async () => {
            try {
              await deleteTopic(id);
              Toast.showError('已删除');
              props.onRemove();
            } catch (err) {
              Toast.error('删除失败，请稍后再试');
            }
          },
        },
      ];
    }

    if (isCurrentSelf) {
      switch (props.type) {
        case 'topic':
          options = [
            {id: 1, label: star ? '取消收藏' : '收藏', onPress: async () => onStar()},
            {
              id: 2,
              label: '删除',
              onPress: async () => {
                try {
                  await deleteTopic(id);
                  Toast.showError('已删除');
                  props.onRemove();
                } catch (err) {
                  Toast.error('删除失败，请稍后再试');
                }
              },
            },
          ];
          break;
        case 'article':
          options = [{id: 1, label: star ? '取消收藏' : '收藏', onPress: async () => onStar()}];
          break;
        case 'theory':
          options = [
            {id: 1, label: star ? '取消收藏' : '收藏', onPress: async () => onStar()},
            {
              id: 2,
              label: '删除',
              onPress: async () => {
                try {
                  await deleteTheory(id);
                  Toast.showError('已删除');
                  props.onRemove();
                } catch (err) {
                  Toast.error('删除失败，请稍后再试');
                }
              },
            },
          ];
          break;
      }
    } else {
      options = [
        {id: 1, label: star ? '取消收藏' : '收藏', onPress: async () => onStar()},
        {
          id: 2,
          label: '投诉',
          onPress: async () => {
            navigation.push('Report', {report_type: props.type, report_type_id: id});
          },
        },
      ];
    }
    setActionItems(options);
    setShowActionSheet(true);
  };

  const CommomHeader = () => {
    return (
      <>
        <Avator account={account} size={40} />
        <View style={hstyles.content}>
          <Pressable onPress={goAccountDetail}>
            <Text style={hstyles.nameText}>{account.nickname}</Text>
            <View style={hstyles.info}>
              <Text style={hstyles.timeText}>{published_at_text}</Text>
              <LocationBar space={space} location={location} />
              {distance && distance > 0 && (
                <Text style={hstyles.spaceText}>· {(distance / 1000).toFixed(1)}km</Text>
              )}
            </View>
          </Pressable>
        </View>
      </>
    );
  };

  const NodeHeader = () => {
    const goNodeDetail = () => {
      navigation.push('NodeDetail', {nodeId: node_id});
    };

    return (
      <>
        <Pressable onPress={goNodeDetail}>
          <FastImg source={{uri: account.avatar_url}} style={styles.nodeImage} />
        </Pressable>
        <Pressable style={styles.content} onPress={goAccountDetail}>
          <Text style={styles.nameText}>{node_name}</Text>
          <Pressable style={styles.infoWrapper} onPress={goAccountDetail}>
            <Avator account={account} size={VWValue(17)} />
            <Text style={styles.nickname}>{account.nickname}</Text>
            <Text style={styles.timeText}>{published_at_text}</Text>
          </Pressable>
        </Pressable>
      </>
    );
  };

  return (
    <View style={hstyles.headerView}>
      {typeHeader === 'recommend-node' ? <NodeHeader /> : <CommomHeader />}
      <Pressable
        onPress={onReportClick}
        hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
        style={{marginLeft: 'auto'}}>
        <IconFont name="gengduo" color="#bdbdbd" size={20} />
      </Pressable>

      <ActionSheet
        actionItems={actionItems}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
      />
    </View>
  );
};

const hstyles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 12,
    paddingTop: 4,
  },
  nameText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#1F1F1F',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timeText: {
    color: '#bdbdbd',
    fontSize: 11,
  },
  spaceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  spaceText: {
    color: '#9C9C9C',
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '400',
  },
});

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodeImage: {
    width: VWValue(40),
    height: VWValue(40),
  },
  content: {
    height: VWValue(40),
    marginLeft: 12,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1F1F1F',
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  nickname: {
    fontSize: 11,
    color: '#3C3C3C',
    marginHorizontal: VWValue(5),
  },
  timeText: {
    fontSize: 11,
    color: '#bdbdbd',
  },
});

export default Header;
