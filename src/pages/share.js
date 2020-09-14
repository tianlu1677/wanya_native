import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import IconFont from '@/iconfont';

const image =
  'http://xinxuefile.meirixinxue.com/assets/2020/5cd7df33-c0e0-47bf-9ac8-d7479823d211.jpg';
const SharePage = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Image style={styles.avator} source={require('@/assets/images/personal.png')} />
        <View style={styles.headerInfo}>
          <View style={styles.info}>
            <Text style={styles.username}>七分</Text>
            <Text style={styles.time}>刚刚 发布了一篇帖子</Text>
          </View>
          <View style={styles.nodeWrap}>
            <IconFont name="node-solid" size={16} color="#fff" />
            <Text style={styles.nodeName}>滑板大世界</Text>
          </View>
        </View>
        <Image style={styles.image} source={{uri: image}} />
        <Text style={styles.text}>
          "#将小游戏作
          为中心化入口进行分发。在信息流页面中出现了直推的小程序服务。信息流是今日头条核心的流量，通过信息流小程序将有更多的被曝光的机会。将小游戏作为中心化入口。
          化入口进行分发。在信息流页面中出现了直推的小程序服务。信息流是今日头条核心的流量，通过信息流小程序化入口进行分发。在信息流页面中出现了直推的小程序服务。头条核心的流量，通过信息流小程序。化入口进行分发。
        </Text>
        <View style={styles.footer}>
          <Image style={styles.shareLogo} source={require('@/assets/images/share-wanya.png')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ff193a',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
    paddingBottom: 16,
  },
  content: {
    backgroundColor: '#000',
    flex: 1,
    borderRadius: 25,
    position: 'relative',
  },
  avator: {
    width: 45,
    height: 45,
    borderRadius: 22,
    position: 'absolute',
    top: -22,
    left: 18,
  },
  headerInfo: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 31,
    flexDirection: 'row',
    marginBottom: 10,
  },
  info: {
    color: '#fff',
    display: 'flex',
  },
  username: {
    color: '#fff',
    fontWeight: '500',
    lineHeight: 20,
    fontSize: 12,
  },
  time: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 20,
  },
  nodeWrap: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  nodeName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
  },
  image: {
    height: 200,
    backgroundColor: 'pink',
    width: '100%',
  },
  text: {
    color: '#fff',
    lineHeight: 23,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 17,
    marginRight: 17,
    paddingTop: 15,
    textAlign: 'justify',
  },
  footer: {
    marginTop: 35,
    paddingLeft: 17,
    paddingRight: 17,
  },
  shareLogo: {
    width: 216,
    height: 82,
  },
});

export default SharePage;
