import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Loading} from '@/components';
import {RFValue} from '@/utils/response-fontsize';
import BaseComment from '@/components/Item/base-comment';
import BaseTopic from '@/components/Item/base-topic';
import {getCommentList} from '@/api/comment_api';
import {getProductsDetail} from '@/api/product_api';
import {getPosts} from '@/api/movement_api';
import ProductInfo from './product-info';
import ProductFooter from './product-footer';
import IconFont from "@/iconfont"

const ProductDetail = props => {
  const {route, navigation} = props;
  const {productId} = route.params;

  const [detail, setDetail] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const onOpenPost = () => {
    navigation.navigate('ProductPostList', {productId});
  };

  const onOpenComment = () => {
    navigation.navigate('ProductCommentList', {productId});
  };

  const handlePraise = (item, index) => {
    comments[index] = item;
    setComments([...comments]);
  };

  const handleClickReply = () => {
    navigation.navigate('ProductCommentList', {productId});
  };

  const loadComments = (id = productId) => {
    const params = {item_id: id, item_type: 'Product', page: 1, per_page: 2};
    getCommentList(params).then(ret => {
      setComments(ret.data.comments);
    });
  };

  const loadPosts = (id = productId) => {
    const apiPath = `q[item_type_eq]=Topic&q[item_of_Topic_type_products_id_eq]=${id}`;
    getPosts({page: 1, per_page: 1}, apiPath).then(ret => {
      setPosts(ret.data.posts);
    });
  };

  const loadData = async () => {
    const res = await getProductsDetail(productId);
    setDetail(res.data.product);
    loadComments(productId);
    loadPosts(productId);

  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollWrapper}>
        <ProductInfo detail={detail} {...props} />

        {posts.length > 0 ? (
          <View style={styles.slideView}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>晒顽物</Text>
              <Text style={styles.discuss} onPress={onOpenPost}>
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
              <View key={item.id}>
                <BaseComment
                  index={index}
                  data={item}
                  handlePraise={handlePraise}
                  loadData={loadComments}
                  handleClickReply={handleClickReply}
                  topicId={productId}
                  commentable_type="Product"
                  style={{paddingHorizontal: 0}}
                  type="product-detail"
                />
                {comments.length - 1 !== index && <View style={styles.separator} />}
              </View>
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
  titleWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  discuss: {
    fontSize: 12,
    color: '#AAAAAA',
    fontWeight: '300',
    marginLeft: 'auto',
  },
  separator: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 49 - 16,
  },
});

export default ProductDetail;
