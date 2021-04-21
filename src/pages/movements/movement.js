import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Loading from '@/components/Loading';
import {SelectListHeader} from '@/components/NodeComponents';
import MovementList from '@/components/List/movement-list';
import {getMovements} from '@/api/movement_api';
import {getCategoryProfile} from '@/api/category_api';

const Movement = props => {
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
