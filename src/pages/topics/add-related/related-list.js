import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import {RFValue} from '@/utils/response-fontsize';

const BaseMovement = props => {
  const goDetail = () => {};

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      <View style={styles.info}>
        <Text style={styles.name}>323232</Text>
        <Text style={styles.intro}>滑板 · 初级技能</Text>
      </View>
    </Pressable>
  );
};

const BaseShopStore = props => {
  const goDetail = () => {};

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      <View style={styles.info}>
        <Text style={styles.name}>323232</Text>
        <Text style={styles.intro}>滑板 · 初级技能</Text>
      </View>
    </Pressable>
  );
};

const BaseShopBrand = props => {
  const goDetail = () => {};

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      <View style={styles.info}>
        <Text style={styles.name}>323232</Text>
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

  console.log('props', props);
  const renderItem = ({item}) => {
    switch (type) {
      case 'movement':
        return <BaseMovement data={item.item} />;
      case 'shop_store':
        return <BaseShopStore data={item.item} />;
      case 'shop_brand':
        return <BaseShopBrand data={item.item} />;
      default:
        return <View />;
    }
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page, per_page: 50});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.spaces;
    setHeaders(res.headers);
    setListData([1, 2]);
    // setListData(page === 1 ? data : [...listData, ...data]);
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
