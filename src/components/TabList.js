import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, Pressable, View, Text, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
const deviceWidth = Dimensions.get('window').width;

const TabList = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [center] = useState(props.center === false ? false : true);
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
        tabBarStyle.tabWrap,
        tabBarStyle[`tab${size}`],
        bottomLine ? tabBarStyle.bottomLine : null,
        {
          alignItems: center ? 'center' : 'flex-start',
        },
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
              <Pressable
                onPress={() => setIndex(item, index)}
                onLayout={e => setLayout(e.nativeEvent.layout, index)}
                key={item.key}
                style={[tabBarStyle.tabItem]}>
                <Text
                  style={[
                    tabBarStyle.textActive,
                    tabBarStyle[`tabItemText${size}`],
                    currentIndex === index && tabBarStyle[`textActive${size}`],
                  ]}>
                  {item.title}
                </Text>
                {currentIndex === index && (
                  <View
                    style={[
                      tabBarStyle.tabLine,
                      currentIndex === index && tabBarStyle[`lineActive${size}`],
                    ]}
                  />
                )}
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
};

// middle 45
const tabBarStyle = StyleSheet.create({
  tabWrap: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  tabbig: {
    height: 50,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  tabmiddle: {
    height: 50,
  },
  tabsmall: {
    height: 33,
  },
  bottomLine: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tabItem: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabItemTextbig: {
    fontSize: 15,
    color: '#7f7f81',
  },
  tabItemTextmiddle: {
    fontSize: 14,
    color: '#7f7f81',
  },
  tabItemTextsmall: {
    fontSize: 15,
    color: '#000',
    fontWeight: '300',
  },
  textActive: {
    fontWeight: '500',
    color: '#000',
  },
  textActivebig: {
    fontSize: 18,
    color: '#fff',
  },
  textActivemiddle: {
    fontSize: 16,
  },
  textActivesmall: {
    fontSize: 16,
    fontWeight: '500',
  },
  tabLine: {
    position: 'absolute',
    bottom: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#000',
    height: 3,
  },
  lineActivebig: {
    width: 22,
    marginTop: 6,
    backgroundColor: '#fff',
  },
  lineActivemiddle: {
    width: 14,
    marginTop: 5,
  },
  lineActivesmall: {
    width: 18,
    position: 'absolute',
    bottom: 0,
  },
  separator: {
    borderBottomColor: '#FAFAFA',
    borderBottomWidth: 9,
  },
});

TabList.propTypes = {
  data: PropTypes.array.isRequired, //tabList接收的数据
  tabChange: PropTypes.func.isRequired, //onChange 返回item
  current: PropTypes.string, // 默认高亮第几项key
  center: PropTypes.bool, // 是否居中显示
  bottomLine: PropTypes.bool, //是否显示底部线
  separator: PropTypes.bool, //是否显示底部分界线
};

export default TabList;
