import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {dispatchTopicDetail} from '@/redux/actions';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {PlainContent} from '@/components/Item/single-list-item';
import {PublishAccount, PublishRelated} from '@/components/Item/single-detail-item';

const RenderLink = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const {detail} = props;

  const onGoDetail = () => {
    dispatch(dispatchTopicDetail(null));
    navigation.push('TopicLinkDetail', {topicId: detail.id});
  };

  return (
    <>
      <PublishAccount data={detail} showFollow={currentAccount.id !== detail.account_id} />
      <Pressable onPress={onGoDetail}>
        <View style={styles.linkWrapper}>
          <View style={styles.linkImageWrap}>
            <FastImg
              source={{uri: detail.topic_link.cover_url}}
              mode={'cover'}
              style={{width: 45, height: 45}}
            />
            {detail.topic_link.outlink_type === 'music' && (
              <IconFont name="sanjiaoxing" size="12" style={styles.linkImage} />
            )}
          </View>
          <Text style={styles.linkText} numberOfLines={2}>
            {detail.topic_link.title || detail.topic_link.raw_link}
          </Text>
        </View>
      </Pressable>
      {detail.plain_content ? (
        <View style={styles.content}>
          <PlainContent data={detail} style={styles.multiLineText} numberOfLines={0} />
        </View>
      ) : null}
      <PublishRelated data={detail} type="topic" />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 15,
    paddingRight: 24,
    paddingBottom: 10,
  },
  multiLineText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#000',
  },
  linkWrapper: {
    flex: 1,
    backgroundColor: '#F2F3F5',
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    marginLeft: 14,
    marginRight: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  linkImageWrap: {
    position: 'relative',
  },
  linkImage: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -6,
    marginLeft: -6,
  },
  linkText: {
    fontSize: 13,
    lineHeight: 20,
    marginVertical: 3,
    color: '#3F3F3F',
    marginLeft: 10,
    textAlign: 'justify',
    flex: 1,
  },
});

export default RenderLink;
