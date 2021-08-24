import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Pressable, StatusBar, StyleSheet, AppState} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import ScrollList from '@/components/ScrollList';
import BaseNode from '@/components/Item/base-node';
import {RFValue} from '@/utils/response-fontsize';
import {ListEmpty as lstyles} from '@/styles/baseCommon';
import {loadLocation} from '@/utils/get-location';
import {getNodeIndex} from '@/api/node_api';

const RenderPermission = () => {
  const dispatch = useDispatch();

  const onOpenLocation = () => {
    loadLocation(dispatch);
  };

  return (
    <View style={lstyles.emptyWrap}>
      <View style={[lstyles.emptyTextWrap, {marginTop: RFValue(165)}]}>
        <Text style={lstyles.emptyText}>你还没有授权地理位置权限</Text>
        <Text style={lstyles.emptyText}>授权后可看到更多本地圈子</Text>
      </View>
      <Text style={lstyles.moreNode} onPress={onOpenLocation}>
        授权地理位置权限
      </Text>
    </View>
  );
};

const RenderEmpty = () => {
  const navigation = useNavigation();

  return (
    <Pressable style={lstyles.emptyWrap}>
      <View style={[lstyles.emptyTextWrap, {marginTop: RFValue(165)}]}>
        <Text style={lstyles.emptyText}>所在地区还没有青年社区</Text>
        <Text style={lstyles.emptyText}>你可以创建当地首个圈子</Text>
      </View>
      <Text style={lstyles.moreNode} onPress={() => navigation.navigate('CreateNodeIntro')}>
        开始创建本地圈子
      </Text>
    </Pressable>
  );
};

const NearbyNodes = () => {
  const dispatch = useDispatch();
  const {home} = useSelector(state => state);
  const openAddress = home.location.latitude && home.location.longitude ? true : false;

  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const RenderItem = ({item}) => {
    return <BaseNode data={item} type="nearby" />;
  };

  const loadData = async (page = 1, params) => {
    if (page === 1) {
      setLoading(true);
    }
    const res = await getNodeIndex({page, ...params});
    setListData(page === 1 ? res.data.nodes : [...listData, ...res.data.nodes]);
    setLoading(false);
    setHeaders(res.headers);
  };

  const handleAppStateChange = nextAppState => {
    console.log(nextAppState === 'active');
    if (nextAppState === 'active') {
      // console.log(3232);
      loadLocation(dispatch);
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    if (openAddress) {
      const {latitude, longitude} = home.location;
      loadData(1, {latitude, longitude, type: 'nearby'});
    }
  }, [openAddress]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      {openAddress ? (
        <ScrollList
          data={listData}
          loading={loading}
          onRefresh={loadData}
          headers={headers}
          renderItem={RenderItem}
          renderSeparator={() => <Text style={styles.separator} />}
          enableRefresh={false}
          renderEmpty={<RenderEmpty />}
        />
      ) : (
        <RenderPermission />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#fafafa',
    marginLeft: 14 + 49 + 10,
  },
});

export default NearbyNodes;
