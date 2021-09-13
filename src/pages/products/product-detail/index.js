import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Loading} from '@/components';
import CommentList from '@/components/List/comment-list';
import {deleteComment, getCommentList} from '@/api/comment_api';
import {getProducts} from '@/api/product_api';
import ProductInfo from './product-info';
import ProductFooter from './product-footer';

const ProductDetail = props => {
  const {route} = props;
  const productId = useState(route.params.productId);
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);

  const deleteTopicComment = async id => {
    await deleteComment(id);
    loadData();
  };

  const loadData = async () => {
    const res = await getProducts(productId);
    setDetail(res.data.product);
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <>
      <CommentList
        type="Topic"
        detail={detail}
        enableLoadMore={false}
        changeVisible={value => setVisible(value)}
        deleteComment={deleteTopicComment}
        request={{api: getCommentList, params: {item_id: detail.id, item_type: 'Product'}}}
        ListHeaderComponent={
          <>
            <ProductInfo detail={detail} />
            <View>
              <Text>顽物讨论</Text>
            </View>
          </>
        }
      />
      <ProductFooter detail={detail} {...props} />
    </>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({});

export default ProductDetail;
