import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Platform, ScrollView, Pressable, StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {nodeAction} from '@/redux/actions';
import {throttle} from 'lodash';
import FastImg from '@/components/FastImg';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import {AllNodeImg} from '@/utils/default-image';
import {getFollowedNodePosts} from '@/api/home_api';
import {ListEmpty as lstyles} from '@/styles/baseCommon';

export const NodeScrollView = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const {homeNodes} = useSelector(state => state.node);

  useFocusEffect(
    useCallback(() => {
      dispatch(nodeAction.dispatchUpdateHomeNodes(currentAccount.id));
    }, [])
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.nodeView}>
      <Pressable style={styles.nodeWrap} onPress={() => navigation.navigate('NodeIndex')}>
        <FastImg style={styles.nodeImg} source={{uri: AllNodeImg}} />
        <Text style={styles.nodeName} minimumFontScale={1} numberOfLines={1}>
          全部圈子
        </Text>
      </Pressable>
      {homeNodes &&
        homeNodes.length > 0 &&
        homeNodes.map(node => {
          return (
            <Pressable
              key={node.id}
              style={styles.nodeWrap}
              onPress={() => navigation.push('NodeDetail', {nodeId: node.id})}>
              <View style={{position: 'relative'}}>
                <FastImg style={styles.nodeImg} source={{uri: node.cover_url}} />
                {node.role === 'super_admin' && <Text style={styles.nodeSelf}>圈主</Text>}
              </View>
              <Text
                style={styles.nodeName}
                adjustsFontSizeToFit={false}
                minimumFontScale={1}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {node.name}
              </Text>
            </Pressable>
          );
        })}
    </ScrollView>
  );
};

const NodeListPost = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const RenderItem = React.memo(({item, index}) =>
    item.item_type === 'Topic' ? (
      <BaseTopic data={item.item} onRemove={() => onRemove(index)} />
    ) : (
      <BaseArticle data={item.item} />
    )
  );

  const renderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, [listData]);

  const onRefresh = (page = 1) => {
    loadData(page);
  };

  const loadData = async (page = 1, params) => {
    if (page === 1) {
      setLoading(true);
    }
    const res = await getFollowedNodePosts({page, ...params});
    setListData(page === 1 ? res.data.posts : [...listData, ...res.data.posts]);
    setLoading(false);
    setHeaders(res.headers);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={throttle(onRefresh, 300)}
      headers={headers}
      renderItem={renderItemMemo}
      initialNumToRender={6}
      onEndReachedThreshold={0.25}
      windowSize={Platform.OS === 'ios' ? 8 : 20}
      ListHeaderComponent={
        <>
          <NodeScrollView />
          <View style={styles.separator} />
        </>
      }
      renderEmpty={
        <View style={lstyles.emptyWrap}>
          <View style={lstyles.emptyTextWrap}>
            <Text style={lstyles.emptyText}>你还没有加入圈子</Text>
            <Text style={lstyles.emptyText}>点击发现更多圈子</Text>
          </View>
          <Text style={lstyles.moreNode} onPress={() => navigation.navigate('NodeIndex')}>
            发现更多圈子
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  nodeView: {
    backgroundColor: '#fff',
    paddingLeft: 14,
    paddingTop: 12,
    paddingBottom: 9,
  },
  nodeWrap: {
    width: 57,
    marginRight: 15,
  },
  nodeImg: {
    width: 57,
    height: 57,
  },
  nodeName: {
    fontSize: 11,
    marginTop: 5,
    maxHeight: 18,
    minHeight: 16,
    height: 18,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '300',
  },
  nodeSelf: {
    width: 34,
    height: 18,
    lineHeight: 18,
    textAlign: 'center',
    borderRadius: 9,
    overflow: 'hidden',
    backgroundColor: '#000',
    opacity: 0.7,
    color: '#FFFF00',
    fontSize: 10,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -17,
  },
  separator: {
    backgroundColor: '#FAFAFA',
    height: 9,
  },
});

export default NodeListPost;
