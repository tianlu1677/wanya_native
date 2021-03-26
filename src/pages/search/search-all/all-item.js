import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NodeItem from '@/components/Item/node-item';
import BaseSpace from '@/components/Item/base-space';
import BaseHashtag from '@/components/Item/base-hashtag';
import BaseAccount from '@/components/Item/base-account';
import BaseTheory from '@/components/Item/base-theory';
import BaseLongVideo from '@/components/Item/base-long-video';
import BaseArticle from '@/components/Item/base-article';
import BaseTopic from '@/components/Item/base-topic';
import {RFValue} from '@/utils/response-fontsize';
import IconFont from '@/iconfont';
import {Type} from './search-all-list';

// const SearchCommon = props => {
//   const {total_count} = props;
//   return (
//     <>
//       {total_count > 3 ? (
//         <View style={styles.search}>
//           <IconFont name="sousuo" size={13} color="#bdbdbd" />
//           <Text style={styles.searchText}>查看更多搜索结果</Text>
//         </View>
//       ) : (
//         <View />
//       )}
//     </>
//   );
// };

// export const NodeItemContent = props => {
//   const {type, data} = props;
//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>圈子</Text>
//       {data.items.map(item => (
//         <View key={item.id}>
//           <NodeItem node={item} type="node-list" />
//           <Text style={styles.nodeSeparator} />
//         </View>
//       ))}
//       <SearchCommon total_count={data.meta.total_count} />
//     </View>
//   );
// };

// export const SpaceItemContent = props => {
//   const {type, data} = props;

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>场地</Text>
//       {data.items.map(item => (
//         <View key={item.id}>
//           <BaseSpace data={item} />
//           <Text style={styles.nodeSeparator} />
//         </View>
//       ))}
//       <SearchCommon total_count={data.meta.total_count} />
//     </View>
//   );
// };

// export const HashtagItemContent = props => {
//   const {type, data} = props;

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>话题</Text>
//       {data.items.map(item => (
//         <View key={item.name}>
//           <BaseHashtag data={item} />
//           <Text style={styles.nodeSeparator} />
//         </View>
//       ))}
//       <SearchCommon total_count={data.meta.total_count} />
//     </View>
//   );
// };

// export const AccountItemContent = props => {
//   const {type, data} = props;

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>用户</Text>
//       {data.items.map(item => (
//         <View key={item.id}>
//           <BaseAccount data={item} />
//           <Text style={styles.nodeSeparator} />
//         </View>
//       ))}
//       <SearchCommon total_count={data.meta.total_count} />
//     </View>
//   );
// };

// export const TheoryItemContent = props => {
//   const {type, data} = props;

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>长视频</Text>
//       {data.items.map(item => (
//         <View key={item.id}>
//           <BaseTheory data={item} />
//           <Text style={styles.nodeSeparator} />
//         </View>
//       ))}
//       <SearchCommon total_count={data.meta.total_count} />
//     </View>
//   );
// };

// export const LongVideoTopicItemContent = props => {
//   const {type, data} = props;

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>长视频</Text>
//       {data.items.map(item => (
//         <View key={item.id}>
//           <BaseLongVideo data={item} />
//           <Text style={styles.nodeSeparator} />
//         </View>
//       ))}
//       <SearchCommon total_count={data.meta.total_count} />
//     </View>
//   );
// };

// export const ArticleItemContent = props => {
//   const {type, data} = props;

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>长视频</Text>
//       {data.items.map(item => (
//         <View key={item.id}>
//           <BaseArticle data={item} />
//           <Text style={styles.nodeSeparator} />
//         </View>
//       ))}
//       <SearchCommon total_count={data.meta.total_count} />
//     </View>
//   );
// };

// export const TopicItemContent = props => {
//   const {type, data} = props;

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>长视频</Text>
//       {data.items.map(item => (
//         <View key={item.id}>
//           <BaseTopic data={item} />
//           <Text style={styles.nodeSeparator} />
//         </View>
//       ))}
//       <SearchCommon total_count={data.meta.total_count} />
//     </View>
//   );
// };

const Node = props => (
  <View key={props.item.id}>
    <NodeItem node={props.item} type="node-list" />
    <Text style={styles.nodeSeparator} />
  </View>
);

const Space = props => (
  <View key={props.item.id}>
    <BaseSpace data={props.item} />
    <Text style={styles.nodeSeparator} />
  </View>
);

const Hashtag = props => (
  <View key={props.item.name}>
    <BaseHashtag data={props.item} />
    <Text style={styles.nodeSeparator} />
  </View>
);

const Account = props => (
  <View key={props.item.id}>
    <BaseAccount data={props.item} />
    <Text style={styles.nodeSeparator} />
  </View>
);

const Theory = props => (
  <View key={props.item.id}>
    <BaseTheory data={props.item} />
    <Text style={styles.nodeSeparator} />
  </View>
);

const LongVideoTopic = props => (
  <View key={props.item.id}>
    <BaseLongVideo data={props.item} />
    <Text style={styles.nodeSeparator} />
  </View>
);

const Article = props => (
  <View key={props.item.id}>
    <BaseArticle data={props.item} />
    <Text style={styles.nodeSeparator} />
  </View>
);

const Topic = props => (
  <View key={props.item.id}>
    <BaseTopic data={props.item} />
    <Text style={styles.nodeSeparator} />
  </View>
);

const AllItem = props => {
  const {type, key, title, data} = props;
  console.log('props', props);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      {data.items.map(item => {
        switch (type) {
          case Type.node:
            return <Node item={item} />;
          case Type.space:
            return <Space item={item} />;
          case Type.hashtag:
            return <Hashtag item={item} />;
          case Type.account:
            return <Account item={item} />;
          case Type.theory:
            return <Theory item={item} />;
          case Type.longTopic:
            return <LongVideoTopic item={item} />;
          case Type.article:
            return <Article item={item} />;
          case Type.topic:
            return <Topic item={item} />;
        }
      })}
      {data.meta.total_count > 3 ? (
        <View style={styles.search}>
          <IconFont name="sousuo" size={13} color="#bdbdbd" />
          <Text style={styles.searchText}>查看更多搜索结果</Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
  },
  title: {
    height: RFValue(30),
    lineHeight: RFValue(30),
    color: '#BDBDBD',
    backgroundColor: '#FAFAFA',
    fontSize: 12,
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
    marginLeft: 60,
  },
});

export default AllItem;
