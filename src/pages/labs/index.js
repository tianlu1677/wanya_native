import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet,Pressable, Button, FlatList, ScrollView, View, Text} from 'react-native';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import {getRecommendPosts, getFollowedPosts} from '@/api/home_api';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import Video from 'react-native-video'
// import VideoPlayerContent from '@/components/react-native-video-player';

import RenderItemMemo from './memItem';
// const HEADER_HEIGHT = 144;
// import { VLCPlayer } from 'react-native-vlc-media-player';
// import VideoVLC from "@/components/VLCPlayer/VideoVLC"
const TAB_BAR_HEIGHT = 55;

const CollapsibleHeaderExample = props => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(1);

  let data1 = [
    {
      id: 1,
      content: 'aa',
    },
    {
      id: 2,
      content: 'aa',
    },
    {
      id: 3,
      content: 'aa',
    },
    {
      id: 4,
      content: 'aa',
    },
    {
      id: 5,
      content: 'aa',
    },
    {
      id: 6,
      content: 'aa',
    },
    {
      id: 7,
      content: 'aa',
    },
    {
      id: 8,
      content: 'aa',
    },
    {
      id: 9,
      content: 'aa',
    },
    {
      id: 10,
      content: 'aa',
    },
  ];

  useEffect(() => {
    setData(data1);
  }, []);

  const add = () => {
    const newdata = [
      {
        id: Math.random(),
        content: Math.random(),
      },
    ];
    setData([...data, ...newdata]);
  };

  // function renderItem({item}) {
  //   console.log('reding', item);
  //   return (
  //     <View style={{height: 100, backgroundColor: 'green'}}>
  //       <Text>{item.content}</Text>
  //
  //     </View>
  //   );
  // }

  const renderItem1 = useCallback(({item}) => {
    return <Child item={item} />;
  }, []);
  const renderItem = ({item}) => {
    return <RenderItemMemo item={item} ></RenderItemMemo>
  }

  const Child1 = ({item}) => {
    console.log('ite', item.id)
    return (
      <View style={{height: 100, backgroundColor: 'green'}}>
        <Text>{item.content}</Text>
        <Button
          title={'add'}
          onPress={() => {
            // add();
            setNumber(number + 1);
          }}
          style={{marginTop: 100, backgroundColor: 'white'}}
        />
      </View>
    );
  };

  const Child = React.memo(({item}) => {
    console.log('item', item.id);
    return (
      <View style={{height: 100, backgroundColor: 'green'}}>
        <Text>{item.content}</Text>
        <Button
          title={'add'}
          onPress={() => {
            add();
            // setNumber(number + 1);
          }}
          style={{marginTop: 100, backgroundColor: 'white'}}
        />
      </View>
    );
  });

  // const keyExtractor = useCallback(item => item.id, []);
  const keyExtractor = (item) => {
    return item.id
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
      <Video
        style={{height: 350, width: 400}}
        autoplay
        repeat
        controls
        source={{uri: 'https://file.meirixinxue.com/assets/126a2cab32a121cb6c24dd4caceba755.m3u8'}}>
      </Video>

        {/*<VideoVLC*/}
        {/*  customStyles={{ height: 200, width: 200}}*/}
        {/*  videoWidth={375}*/}
        {/*  videoHeight={350}*/}

        {/*  video={{uri: 'https://file.meirixinxue.com/assets/126a2cab32a121cb6c24dd4caceba755.mp4'}}*/}
        {/*  // videoWidth={videoWidth}*/}
        {/*  // videoHeight={videoHeight}*/}
        {/*  // poster={`${detail.video_content_m3u8}?vframe/jpg/offset/0/rotate/auto`}*/}
        {/*  posterResizeMode={'contain'}*/}
        {/*  hideControlsOnStart*/}
        {/*  pauseOnPress*/}
        {/*  muted={false}*/}
        {/*  resizeMode={'cover'}*/}
        {/*  autoplay={true}*/}
        {/*  loop={true}*/}
        {/*/>*/}


        {/*<VLCPlayer*/}
        {/*  source={{*/}
        {/*    initType: 2,*/}
        {/*    hwDecoderEnabled: 1,*/}
        {/*    hwDecoderForced: 1,*/}
        {/*    uri:*/}
        {/*      'https://file.meirixinxue.com/assets/126a2cab32a121cb6c24dd4caceba755.mp4',*/}
        {/*    initOptions: [*/}
        {/*      '--rtsp-tcp',*/}
        {/*      '--network-caching=150',*/}
        {/*      '--rtsp-caching=150',*/}
        {/*      '--no-stats',*/}
        {/*      '--tcp-caching=150',*/}
        {/*      '--realrtsp-caching=150',*/}
        {/*    ],*/}
        {/*  }}*/}
        {/*  autoplay={true}*/}
        {/*  autoAspectRatio={true}*/}
        {/*  resizeMode="cover"*/}
        {/*  // videoAspectRatio={"4:3"}*/}
        {/*  isLive={true}*/}
        {/*  autoReloadLive={true}*/}
        {/*  style={{ height: 400, marginTop: 30}}*/}
        {/*/>*/}


        {/*<Video*/}
        {/*  style={{height: 400, width: 300}}*/}
        {/*  autoplay={false}*/}
        {/*  repeat*/}
        {/*  source={{uri: 'https://file.meirixinxue.com/assets/126a2cab32a121cb6c24dd4caceba755.mp4'}}>*/}
        {/*</Video>*/}


        {/*<FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor}  style={{marginTop: 100}}/>*/}
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#3f51b5',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    fontWeight: '400',
  },
  headerRow: {
    // height: HEADER_HEIGHT,
    flexDirection: 'row',
    backgroundColor: '#429BB8',
  },
  headerCol: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
  },
});

export default CollapsibleHeaderExample;
