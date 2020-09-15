import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, TouchableOpacity, View, Text, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
const deviceWidth = Dimensions.get('window').width;

const TabList = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [center] = useState(true || props.center);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [layoutList, setLayoutList] = useState([]);
  const [size] = useState(props.size || 'middle');
  const [bottomLine] = useState(props.bottomLine ? true : false);

  const scrollRef = useRef(null);

  const setIndex = (item, index) => {
    props.tabChange(item, index);

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

  const setLayout = (layout, index) => {
    const totalWidth = contentWidth + layout.width;
    setContentWidth(totalWidth);
    layoutList[index] = layout;
    const list = JSON.parse(JSON.stringify(layoutList));
    setLayoutList(list);
  };

  useEffect(() => {
    if (props.current) {
      const index = props.data.findIndex(v => v.key === props.current);
      setCurrentIndex(index);
    }
  }, []);

  useEffect(() => {
    const index = props.data.findIndex(v => v.key === props.current);
    setCurrentIndex(index);
  }, [props.current]);

  useEffect(() => {
    if (contentWidth > deviceWidth) {
      setScrollEnabled(true);
    }
  }, [contentWidth]);

  return (
    <View
      style={[
        tabBarStyle.tab,
        tabBarStyle[`tab${size}`],
        bottomLine ? tabBarStyle.bottomLine : null,
      ]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        ref={scrollRef}
        centerContent={center}
        scrollEnabled={scrollEnabled}>
        {props.data.length > 0 &&
          props.data.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => setIndex(item, index)}
                onLayout={e => setLayout(e.nativeEvent.layout, index)}
                key={item.key}
                style={tabBarStyle.tabItem}>
                <Text
                  style={[
                    tabBarStyle.tabItemText,
                    tabBarStyle[`tabItemText${size}`],
                    currentIndex === index && tabBarStyle.textActive,
                  ]}>
                  {item.title}
                </Text>
                <View
                  style={[
                    tabBarStyle.tabItemLine,
                    tabBarStyle[`tabItemLine${size}`],
                    currentIndex === index && tabBarStyle.lineActive,
                  ]}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  tabmiddle: {
    height: 45,
  },
  tabsmall: {
    height: 45,
  },
  bottomLine: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
  },
  tabItem: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  tabItemText: {
    lineHeight: 20,
    height: 20,
    color: '#7F7F81',
    fontWeight: '500',
  },
  tabItemTextmiddle: {
    fontSize: 15,
  },
  tabItemTextsmall: {
    fontSize: 14,
  },
  textActive: {
    color: '#000',
  },
  textActivemiddle: {
    fontSize: 18,
  },
  textActivesmall: {
    fontSize: 14,
  },
  lineActive: {
    backgroundColor: '#000',
  },
  tabItemLine: {
    backgroundColor: 'transparent',
    marginTop: 5,
  },
  tabItemLinemiddle: {
    width: 22,
    height: 3,
  },
  tabItemLinesmall: {
    width: 15,
    height: 3,
  },
});

TabList.propTypes = {
  data: PropTypes.array.isRequired, //tabList接收的数据
  tabChange: PropTypes.func.isRequired, //onChange 返回item
  current: PropTypes.string, // 默认高亮第几项key
  center: PropTypes.bool, // 是否居中显示
  bottomLine: PropTypes.bool, //是否显示底部分界线
};

export default TabList;
