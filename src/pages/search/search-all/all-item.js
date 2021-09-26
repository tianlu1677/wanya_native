import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import BaseNode from '@/components/Item/base-node';
import BaseMovement from '@/components/Item/base-movement';
import BaseSpace from '@/components/Item/base-space';
import BaseActivity from '@/components/Item/base-activity';
import BaseShopStore from '@/components/Item/base-shop-store';
import BaseShopBrand from '@/components/Item/base-shop-brand';
import {BaseSingleProduct} from '@/components/List/product-single-list';
import BaseHashtag from '@/components/Item/base-hashtag';
import BaseAccount from '@/components/Item/base-account';
import BaseTheory from '@/components/Item/base-theory';
import BaseLongVideo from '@/components/Item/base-long-video';
import BaseArticle from '@/components/Item/base-article';
import BaseTopic from '@/components/Item/base-topic';
import {RFValue} from '@/utils/response-fontsize';
import IconFont from '@/iconfont';
import {Type} from './meta';

const Node = props => (
  <View key={props.item.id}>
    <BaseNode data={props.item} type="list" />
    {props.meta.total_count >= 3 && <Text style={styles.nodeSeparator} />}
  </View>
);

const Movement = props => (
  <View key={props.item.id}>
    <BaseMovement data={props.item} type="list" />
    {props.meta.total_count >= 3 && <Text style={styles.separator} />}
  </View>
);

const Space = props => (
  <View key={props.item.id}>
    <BaseSpace data={props.item} type="list" />
    {props.meta.total_count >= 3 && <Text style={styles.separator} />}
  </View>
);

const Activity = props => (
  <View key={props.item.id}>
    <BaseActivity data={props.item} type="list" />
    {props.meta.total_count >= 3 && <Text style={styles.separator} />}
  </View>
);

const ShopStore = props => (
  <View key={props.item.id}>
    <BaseShopStore data={props.item} type="list" />
    {props.meta.total_count >= 3 && <Text style={styles.separator} />}
  </View>
);

const ShopBrand = props => <BaseShopBrand data={props.item} key={props.item.id} type="list" />;

const Product = props => (
  <View key={props.item.id}>
    <BaseSingleProduct data={props.item} type="list" />
    {props.meta.total_count >= 3 && <Text style={styles.productSeparator} />}
  </View>
);

const Hashtag = props => (
  <View key={props.item.name}>
    <BaseHashtag data={props.item} type="list" />
    {props.meta.total_count >= 3 && <View style={styles.separator} />}
  </View>
);

const Account = props => (
  <View key={props.item.id}>
    <BaseAccount data={props.item} type="list" />
    {props.meta.total_count >= 3 && <Text style={styles.separator} />}
  </View>
);

const Theory = props => (
  <View key={props.item.id}>
    <BaseTheory data={props.item} />
    {props.meta.total_count >= 3 && <Text style={styles.separator} />}
  </View>
);

const LongVideoTopic = props => (
  <View key={props.item.id}>
    <BaseLongVideo data={props.item} />
    {props.meta.total_count >= 3 && <Text style={styles.separator} />}
  </View>
);

const Article = props => (
  <View key={props.item.id}>
    <BaseArticle data={props.item} />
    {props.meta.total_count >= 3 && <Text style={styles.separator} />}
  </View>
);

const Topic = props => (
  <View key={props.item.id}>
    <BaseTopic data={props.item} />
    {props.meta.total_count >= 3 && <Text style={styles.separator} />}
  </View>
);

const AllItem = props => {
  const {type, title, data} = props;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={type === Type.shopBrand ? styles.contentShopBrand : styles.content}>
        {data.items.map((item, index) => {
          switch (type) {
            case Type.node:
              return <Node item={item} key={index} meta={data.meta} />;
            case Type.movement:
              return <Movement item={item} key={index} meta={data.meta} />;
            case Type.space:
              return <Space item={item} key={index} meta={data.meta} />;
            case Type.activity:
              return <Activity item={item} key={index} meta={data.meta} />;
            case Type.shopStore:
              return <ShopStore item={item} key={index} meta={data.meta} />;
            case Type.shopBrand:
              return <ShopBrand item={item} key={index} meta={data.meta} />;
            case Type.product:
              return <Product item={item} key={index} meta={data.meta} />;
            case Type.hashtag:
              return <Hashtag item={item} key={index} meta={data.meta} />;
            case Type.account:
              return <Account item={item} key={index} meta={data.meta} />;
            case Type.theory:
              return <Theory item={item} key={index} meta={data.meta} />;
            case Type.longTopic:
              return <LongVideoTopic item={item} key={index} meta={data.meta} />;
            case Type.article:
              return <Article item={item} key={index} meta={data.meta} />;
            case Type.topic:
              return <Topic item={item} key={index} meta={data.meta} />;
            default:
              return <View key={index} />;
          }
        })}
      </View>

      {type === Type.shopBrand && data.meta.total_count >= 3 && (
        <Text style={styles.shopBrandseparator} />
      )}

      {data.meta.total_count > 3 ? (
        <Pressable style={styles.search} onPress={props.onPress}>
          <IconFont name="sousuo" size={13} color="#bdbdbd" />
          <Text style={styles.searchText}>查看更多搜索结果</Text>
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    height: RFValue(38),
    lineHeight: RFValue(38),
    color: '#BDBDBD',
    backgroundColor: '#FAFAFA',
    fontSize: 12,
    paddingLeft: 14,
  },
  content: {
    flexDirection: 'column',
  },
  contentShopBrand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  search: {
    height: RFValue(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    color: '#BDBDBD',
    marginLeft: 5,
    fontSize: 13,
  },
  nodeSeparator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginLeft: 14 + 49 + 10,
  },
  shopBrandseparator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 14,
  },
  productSeparator: {
    height: 9,
    marginHorizontal: 14,
  },
  separator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginLeft: 14,
  },
});

export default AllItem;
