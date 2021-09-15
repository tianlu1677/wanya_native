import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Loading} from '@/components';
import CommentList from '@/components/List/comment-list';
import {deleteComment, getCommentList} from '@/api/comment_api';
import {getProducts} from '@/api/product_api';
import {getRecommendPosts} from '@/api/home_api';
import {RFValue, VWValue} from '@/utils/response-fontsize';

import ProductInfo from './product-info';
import ProductComment from './product-comment';
import BaseComment from '@/components/Item/base-comment';
import BaseTopic from '@/components/Item/base-topic';

import ProductFooter from './product-footer';

const ProductDetail = props => {
  const {route, navigation} = props;
  const productId = useState(route.params.productId);
  const [detail, setDetail] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const [visible, setVisible] = useState(false);

  const onOpenComment = () => {
    navigation.navigate('ProductCommentList', {productId: detail.id});
  };

  const loadData = async () => {
    const params = {item_id: detail.id, item_type: 'Product', page: 1, per_page: 2};
    getCommentList(params).then(res => {
      setComments(res.data.comments);
    });

    getRecommendPosts({page: 1, per_page: 1}).then(res => {
      console.log('323232', res);
      setPosts(res.data.posts);
    });
  };

  const loadDetail = async () => {
    const res = await getProducts(productId);
    setDetail(res.data.product);
  };

  useEffect(() => {
    loadData();
    loadDetail();
  }, []);

  console.log('detail', posts, comments);

  return detail ? (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollWrapper}>
        <ProductInfo detail={detail} {...props} />

        {posts.length > 0 ? (
          <View style={styles.slideView}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>晒顽物</Text>
              <Text style={styles.discuss} onPress={onOpenComment}>
                查看全部
              </Text>
            </View>
            {posts.map((item, index) => (
              <BaseTopic data={item.item} key={index} style={{paddingHorizontal: 0}} />
            ))}
          </View>
        ) : null}

        {comments.length > 0 ? (
          <View style={styles.slideView}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>顽物讨论</Text>
              <Text style={styles.discuss} onPress={onOpenComment}>
                全部讨论
              </Text>
            </View>
            {comments.map((item, index) => (
              <BaseComment data={item} key={index} />
            ))}
          </View>
        ) : null}
      </ScrollView>

      <ProductFooter detail={detail} {...props} />
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollWrapper: {
    marginBottom: RFValue(60) + 10,
    paddingBottom: RFValue(60) + 10,
  },
  slideView: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 10,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  symbol: {
    fontSize: 16,
    color: '#FF2242',
    fontWeight: '500',
  },
  price: {
    fontSize: 23,
    color: '#FF2242',
    fontWeight: '500',
    marginBottom: -3,
    marginLeft: 3,
    marginRight: 8,
  },
  tags: {
    fontSize: 12,
    color: '#FF2242',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FF2242',
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 2,
    marginRight: 6,
  },
  discuss: {
    fontSize: 12,
    color: '#AAAAAA',
    fontWeight: '300',
    marginLeft: 'auto',
  },
  name: {
    fontSize: 16,
    lineHeight: 26,
    color: '#3D3D3D',
    marginTop: 12,
  },
  shopBrandWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandImage: {
    width: VWValue(45),
    height: VWValue(45),
    marginRight: 10,
  },
  brandInfo: {},
  brandName: {
    fontSize: 14,
    color: '#3D3D3D',
    fontWeight: '500',
  },
  branddiscuss: {
    fontSize: 10,
    color: '#BDBDBD',
    fontWeight: '300',
    marginTop: 6,
  },
});

export default ProductDetail;
