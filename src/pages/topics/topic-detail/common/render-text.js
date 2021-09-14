import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PlainContent} from '@/components/Item/single-list-item';
import {PublishRelated, RelatedComponent} from '@/components/Item/single-detail-item';

const RenderText = props => {
  const {detail} = props;

  return (
    <>
      <RelatedComponent data={detail} />
      {detail.plain_content ? (
        <View style={styles.content}>
          <PlainContent data={detail} style={styles.multiLineText} />
        </View>
      ) : null}
      <PublishRelated data={detail} type="topic" space={detail.space} location={detail.location} />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 14,
    paddingBottom: 0,
    marginTop: 15,
  },
  multiLineText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#000',
  },
});

export default RenderText;
