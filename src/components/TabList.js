import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, Pressable, View, Text, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {RFValue} from '@/utils/response-fontsize';
const DeviceWidth = Dimensions.get('window').width;

const TabList = props => {
  const scrollRef = useRef(null);
  const defaultIndex = props.data.findIndex(v => v.key === props.current);
  const {type, align, bottomLine, activeLineColor, textStyle, separator} = props;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [layoutList, setLayoutList] = useState([]);

  const onScroll = index => {
    const {x, width} = layoutList[index];
    const sx = x - DeviceWidth / 2 + width / 2;
    scrollRef.current.scrollTo({x: sx, animated: true});
  };

  const setIndex = (item, index) => {
    props.tabChange(item, index);
    if (scrollEnabled) {
      onScroll(index);
    }
  };

  const setLayout = (layout, index) => {
    const totalWidth = contentWidth + layout.width;
    setContentWidth(totalWidth);
    layoutList[index] = layout;
    const list = JSON.parse(JSON.stringify(layoutList));
    setLayoutList(list);
  };

  useEffect(() => {
    const isAllLayout =
      layoutList.length === props.data.length && layoutList.every(item => item && item.width);
    if (isAllLayout) {
      const index = props.data.findIndex(v => v.key === props.current);
      setCurrentIndex(index);
      onScroll(index);
    }
  }, [props.current, layoutList]);

  useEffect(() => {
    if (contentWidth > DeviceWidth) {
      setScrollEnabled(true);
    }
  }, [contentWidth]);

  return (
    <>
      <View
        style={[
          styles.tabWrap,
          styles[`tab${type}`],
          styles[`tab${align}`],
          bottomLine && styles.bottomLine,
        ]}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          overScrollMode={'always'}
          centerContent={false}
          style={styles[`tabScroll${type}`]}
          scrollEnabled={scrollEnabled}>
          {props.data.length > 0 &&
            props.data.map((item, index) => {
              return (
                <Pressable
                  key={item.key}
                  onPress={() => setIndex(item, index)}
                  onLayout={e => setLayout(e.nativeEvent.layout, index)}
                  style={styles[`tabItem${type}`]}>
                  <Text
                    style={[
                      textStyle,
                      styles[`tabItemText${type}`],
                      currentIndex === index && styles[`tabItemTextActive${type}`],
                    ]}
                    visit_key={`click_${item.title}`}
                    visit_value={{name: item.title}}>
                    {item.title}
                  </Text>
                  {currentIndex === index && (
                    <View
                      style={[
                        currentIndex === index && styles[`tabLineActive${type}`],
                        {backgroundColor: activeLineColor},
                      ]}
                    />
                  )}
                </Pressable>
              );
            })}
        </ScrollView>
      </View>
      {separator && <View style={styles.separator} />}
    </>
  );
};

const styles = StyleSheet.create({
  tableft: {
    alignItems: 'flex-start',
  },
  tabcenter: {
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separator: {
    borderBottomColor: '#FAFAFA',
    borderBottomWidth: 9,
  },
  // type === index
  tabindex: {
    height: RFValue(33),
    backgroundColor: '#fff',
  },
  tabScrollindex: {
    paddingLeft: RFValue(2),
    textAlign: 'left',
  },
  tabItemindex: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RFValue(8),
    position: 'relative',
  },
  tabItemTextindex: {
    fontSize: 14,
    color: '#aaa',
  },
  tabItemTextActiveindex: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  tabLineActiveindex: {
    position: 'absolute',
    bottom: 0,
    width: RFValue(18),
    height: RFValue(3),
    borderRadius: 4,
  },
});

TabList.propTypes = {
  data: PropTypes.array.isRequired, //tabList接收的数据
  tabChange: PropTypes.func.isRequired, //onChange 返回item
  current: PropTypes.string.isRequired, // 默认高亮第几项key
  type: PropTypes.string.isRequired, // 类型
  align: PropTypes.string.isRequired, //对齐方式
  // bottomLine: PropTypes.bool.isRequired, //是否显示底部分界线
  activeLineColor: PropTypes.string, //active 线颜色
  textStyle: PropTypes.object, //active 线颜色
  separator: PropTypes.bool, //是否显示底部分界线
};

export default TabList;
