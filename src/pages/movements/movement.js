import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import {SelectListHeader} from '@/components/NodeComponents';
import MovementList from '@/components/List/movement-list';
import {getMovements} from '@/api/movement_api';
import {getCategoryProfile} from '@/api/category_api';

const Movement = props => {
  const {navigation} = props;
  const {category} = props.route.params;
  const {categoryList} = useSelector(state => state.home);
  const categoryId = categoryList.find(item => item.name === category).id;
  const [detail, setDetail] = useState(null);
  const [request, setRequest] = useState(null);

  const loadData = async () => {
    const res = await getCategoryProfile(categoryId);
    setDetail(res.category.movement_search);
  };

  const getParams = value => {
    const query = `q[category_id_eq]=${categoryId}&${value}`;
    setRequest({api: getMovements, apiPath: query});
  };

  useEffect(() => {
    loadData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${category}顽招`,
      headerRight: () => (
        <Pressable
          onPress={() => navigation.push('SearchIndex', {key: 'movement'})}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <IconFont name="search" size={16} />
        </Pressable>
      ),
    });
  }, [navigation]);

  return detail ? (
    <View style={styles.wrapper}>
      <SelectListHeader data={detail} getParams={getParams} />
      <View style={styles.speator} />
      {request && <MovementList request={request} type="list" />}
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  speator: {
    height: 9,
  },
});

export default Movement;
