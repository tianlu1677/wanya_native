import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BaseComment from '@/components/Item/base-comment';
import {deleteComment, getCommentList} from '@/api/comment_api';

const ProductComment = props => {
  const {detail, navigation} = props;
  const [data, setData] = useState([]);

  const loadData = async () => {
    const params = {item_id: detail.id, item_type: 'Product'};
    const res = await getCommentList(params);
  };

  const onOpenComment = () => {
    navigation.navigate('ProductCommentList', {productId: detail.id});
  };

  useEffect(() => {
    loadData();
  });

  return (
    <View style={styles.slideView}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>顽物讨论</Text>
        <Text style={styles.discuss} onPress={onOpenComment}>
          全部讨论
        </Text>
      </View>
      {/* <BaseComment /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  slideView: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 10,
  },
  titleWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    color: '#3D3D3D',
    fontWeight: '500',
  },
  discuss: {
    fontSize: 12,
    color: '#AAAAAA',
    fontWeight: '300',
    marginLeft: 'auto',
  },
});

export default ProductComment;
