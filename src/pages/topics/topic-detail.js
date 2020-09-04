import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {PublishAccount, PublishRelated, CommentList} from '@/components/Item/post-detail-item';
import {getTopic} from '@/api/topic_api';

const TopicDetail = ({navigation, route}) => {
  const [detail, setDetail] = useState(null);

  const laodData = async () => {
    const res = await getTopic(7 || navigation.params.id);
    console.log(res);
    setDetail(res.data.topic);
  };

  useEffect(() => {
    laodData();
  }, []);

  return (
    <View>
      {/* <Text></Text> */}
      {/* <View> */}
      {/* {content_style === 'img' && <FastImg source={{uri: medias[0]}} style={{height: 300}} />}

      {content_style === 'video' && (
        <Video
          style={{height: 300}}
          source={{uri: video_content_m3u8}}
          posterResizeMode={'center'}
          // onBuffer={this.onBuffer}
          // onError={this.videoError}
          controls
          reportBandwidth
          repeat
        />
      )}

      <View style={{paddingLeft: 16, paddingRight: 16, marginTop: 20}}>
        <Header data={props.data} />
        <BaseTopicContent data={props.data} style={{marginBottom: 16}} />
      </View>
    </View>
     */}
      <PublishAccount />
      <Text>文章内容</Text>
      <PublishRelated />
      {/* <CommentList /> */}
    </View>
  );
};
export default TopicDetail;
