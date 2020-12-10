import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet,Pressable, Button, FlatList, View, Text} from 'react-native';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import {getRecommendPosts, getFollowedPosts} from '@/api/home_api';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import Video from 'react-native-video'
import RenderItemMemo from './memItem';
// const HEADER_HEIGHT = 144;
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
      <Pressable
        title={'add'}
        onPress={() => {
          add();
          // setNumber(number + 1);
        }}
        style={{marginTop: 0, height: 100, backgroundColor: 'red'}}
      />


      <Video
        style={{height: 400}}
        autoplay
        repeat
        source={{uri: 'http://file.meirixinxue.com/assets/126a2cab32a121cb6c24dd4caceba755.m3u8'}}>

      </Video>

      {/*<FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor}  style={{marginTop: 100}}/>*/}
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
