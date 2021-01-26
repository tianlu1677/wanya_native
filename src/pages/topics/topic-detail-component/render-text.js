import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {PlainContent} from '@/components/Item/single-list-item';
import {PublishAccount, PublishRelated} from '@/components/Item/single-detail-item';

const RenderText = props => {
  const currentAccount = useSelector(state => state.account.currentAccount);
  const {detail} = props;

  return (
    <>
      <PublishAccount data={detail} showFollow={currentAccount.id !== detail.account_id} />
      {detail.plain_content ? (
        <View style={styles.content}>
          <PlainContent data={detail} style={styles.multiLineText} numberOfLines={0} />
        </View>
      ) : null}
      <PublishRelated data={detail} />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 15,
    paddingRight: 24,
    paddingBottom: 0,
  },
  multiLineText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#000',
  },
});

export default RenderText;
