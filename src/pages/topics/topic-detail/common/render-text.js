import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PlainContent, RateRelated, RateRelatedText} from '@/components/Item/single-list-item';
import {PublishRelated, RelatedComponent} from '@/components/Item/single-detail-item';

const RenderText = props => {
  const {
    detail: {plain_content, space, location},
  } = props;

  console.log(props.detail);
  return (
    <>
      <RelatedComponent data={props.detail} />
      {plain_content ? (
        <View style={styles.content}>
          <PlainContent data={props.detail} style={styles.multiLineText} />
        </View>
      ) : null}

      {/* 为评价时显示场地、顽士多列 */}
      <>
        <RateRelatedText data={props.detail} />
        <RateRelated data={props.detail} style={{marginHorizontal: 14}} />
      </>

      <PublishRelated data={props.detail} type="topic" space={space} location={location} />
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
