import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';

const PublishRelated = props => {
  const navigation = useNavigation();
  const {data} = props;

  const goNodeDetail = () => {
    navigation.push('NodeDetail', {nodeId: data.node.id});
  };

  return (
    <>
      {/*{data.tag_list.length > 0 && (*/}
      {/*  <View style={styles.tagsWrapper}>*/}
      {/*    {data.tag_list.map((v, index) => (*/}
      {/*      <Text style={styles.tagsText} key={index}>*/}
      {/*        {v}*/}
      {/*      </Text>*/}
      {/*    ))}*/}
      {/*  </View>*/}
      {/*)}*/}
      {data.node && (
        <Pressable style={styles.fromWrapper} onPress={goNodeDetail}>
          <View>
            <View style={styles.formTitleWrap}>
              <Text style={styles.formTitle}>来自</Text>
              <IconFont name="node-solid" size={16} color={'#FFE30A'} style={styles.formIcon} />
              <Text style={styles.formTitle}>{data.node.name}</Text>
            </View>
            <Text style={styles.formInfo}>
              {props.type === 'topic' &&
                data.node &&
                data.node.topics_count > 0 &&
                `${data.node.topics_count}篇帖子 · `}
              {data.node.accounts_count}位{data.node.nickname || '圈友'}
            </Text>
          </View>
          <Image style={styles.formImage} source={{uri: data.node.cover_url}} />
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 15,
    paddingRight: 53,
    marginTop: 16,
  },
  tagsText: {
    paddingLeft: 9,
    paddingRight: 9,
    lineHeight: 24,
    backgroundColor: '#f2f3f5',
    marginRight: 8,
    marginBottom: 8,
    fontSize: 11,
    fontWeight: '300',
  },
  fromWrapper: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 19,
    alignItems: 'center',
    marginTop: RFValue(16),
  },
  formTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginBottom: 7,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  formIcon: {
    marginLeft: 10,
    marginRight: 3,
  },
  formInfo: {
    fontSize: 12,
    lineHeight: 20,
  },
  formImage: {
    width: 55,
    height: 55,
    marginLeft: 'auto',
    borderRadius: 5,
  },
});

export default PublishRelated;
