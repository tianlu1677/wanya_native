import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import * as action from '@/redux/constants';
import ScrollList from '@/components/ScrollList';
import {RFValue} from '@/utils/response-fontsize';

const levelData = [
  {key: 'small', title: '初级'},
  {key: 'middle', title: '中极'},
  {key: 'high', title: '高级'},
];

const BaseMovement = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {savetopic} = useSelector(state => state.home);
  const {
    data: {name, category_subset_name, level},
  } = props;

  const levelText = levelData.find(v => v.key === level)?.title;

  const handleClick = () => {
    const params = {
      shop_store_ids: [],
      shop_brand_ids: [],
      movement_ids: [{...props.data, levelText}],
    };
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
    navigation.goBack();
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleClick}>
      <View style={styles.info}>
        <Text style={styles.name}>{name.trim()}</Text>
        <Text style={styles.intro}>
          {category_subset_name} · {levelText}技能
        </Text>
      </View>
    </Pressable>
  );
};

const BaseShopStore = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {savetopic} = useSelector(state => state.home);
  const {
    data: {name},
  } = props;

  const handleClick = () => {
    const params = {movement_ids: [], shop_brand_ids: [], shop_store_ids: [props.data]};
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
    navigation.goBack();
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleClick}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.intro}>滑板 · 初级技能</Text>
      </View>
    </Pressable>
  );
};

const BaseShopBrand = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {savetopic} = useSelector(state => state.home);
  const {
    data: {name},
  } = props;

  const handleClick = () => {
    const params = {movement_ids: [], shop_store_ids: [], shop_brand_ids: [props.data]};
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
    navigation.goBack();
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleClick}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.intro}>滑板 · 初级技能</Text>
      </View>
    </Pressable>
  );
};

const RelatedList = props => {
  const {type} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    switch (type) {
      case 'movement':
        return <BaseMovement data={item} />;
      case 'shop_store':
        return <BaseShopStore data={item} />;
      case 'shop_brand':
        return <BaseShopBrand data={item} />;
      default:
        return <View />;
    }
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page, per_page: 50});
    setHeaders(res.headers);
    setListData(page === 1 ? res.data.items : [...listData, ...res.data.items]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      enableRefresh={false}
      enableLoadMore={false}
      renderSeparator={() => <View style={styles.separator} />}
    />
  );
};

RelatedList.propTypes = {
  request: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    height: RFValue(66),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  info: {
    marginRight: 'auto',
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
  },
  intro: {
    fontSize: 11,
    color: '#BDBDBD',
    lineHeight: 20,
    marginTop: RFValue(5),
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 14,
  },
});

export default RelatedList;
