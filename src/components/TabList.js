import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, TouchableOpacity, View, Text, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

const deviceWidth = Dimensions.get('window').width;

const data = [
  {
    key: '1',
    value: '分类'
  },
  {
    key: '2',
    value: '分类二'
  },
  {
    key: '3',
    value: '分类三三'
  },
  {
    key: '4',
    value: '分类4'
  },
  {
    key: '5',
    value: '分类5'
  },
  {
    key: '6',
    value: '分类6'
  },
  {
    key: '7',
    value: '分类7'
  }
];

const TablList = props => {
  const current = props.current ? props.data.findIndex(v => v.key === props.current) : null;
  const [currentIndex, setCurrentIndex] = useState(current || 0);
  const [center] = useState(true || props.center);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [layoutList, setLayoutList] = useState([]);

  const scrollRef = useRef(null);

  const setIndex = index => {
    setCurrentIndex(index);
    setContentWidth(0);
    if (!scrollEnabled) {
      return;
    }
    let layout = layoutList[index];
    let rx = deviceWidth / 2;
    let sx = layout.x - rx + layout.width / 2;
    if (sx < 0) {
      sx = 0;
    }
    sx < contentWidth - deviceWidth && scrollRef.current.scrollTo({x: sx, animated: true});
    sx >= contentWidth - deviceWidth && scrollRef.current.scrollToEnd({animated: true});
  };

  const setLaout = (layout, index) => {
    const totalWidth = contentWidth + layout.width;
    setContentWidth(totalWidth);
    layoutList[index] = layout;
    const list = JSON.parse(JSON.stringify(layoutList));
    setLayoutList(list);
  };

  useEffect(() => {
    if (contentWidth > deviceWidth) {
      setScrollEnabled(true);
    }
  }, [contentWidth]);

  return (
    <View style={[tabBarStyle.tab, props.bottomLine && tabBarStyle.bottomLine]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        ref={scrollRef}
        centerContent={center}
        scrollEnabled={scrollEnabled}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setIndex(index)}
              onLayout={e => setLaout(e.nativeEvent.layout, index)}
              key={item.key}
              style={tabBarStyle.tabItem}>
              <Text
                style={[tabBarStyle.tabItemText, currentIndex === index && tabBarStyle.textActive]}>
                {item.value}
              </Text>
              <View
                style={[tabBarStyle.tabItemLine, currentIndex === index && tabBarStyle.lineActive]}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const tabBarStyle = StyleSheet.create({
  tab: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
  bottomLine: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2
  },
  tabItem: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabItemText: {
    fontSize: 15,
    color: '#7F7F81'
  },
  tabItemLine: {
    width: 22,
    height: 2,
    backgroundColor: 'transparent',
    marginTop: 10
  },
  textActive: {
    fontSize: 18,
    color: '#000'
  },
  lineActive: {
    backgroundColor: '#000'
  }
});

TablList.propTypes = {
  current: PropTypes.string, // 默认高亮第几项key
  data: PropTypes.array, //List接收的数据
  center: PropTypes.bool, // 是否居中显示
  bottomLine: PropTypes.bool //是否显示底部分界线
};

export default TablList;
