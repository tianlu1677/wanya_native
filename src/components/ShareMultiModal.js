import React, {Component, useState, useLayoutEffect, useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal, {
  ModalTitle,
  ModalFooter,
  ModalButton,
  BottomModal,
  ModalContent,
} from 'react-native-modals';
import * as WeChat from 'react-native-wechat-lib';
import {SCREEN_WIDTH} from '@/utils/navbar';
import {dispatchShareItem} from '@/redux/actions';
import FastImg from '@/components/FastImg';
import ShareFriendImg from '@/assets/images/sharewchatfrient.png';
import ShareTimeImg from '@/assets/images/sharewechattimeline.png';
import {DefaultLog} from '@/utils/default-image';
import IconFont from '@/iconfont';

const ShareMultiModal = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const shareWechatFriend = e => {
    // e.stopPropagation();
    const content = {scene: 0};
    if (content.type === 'link') {
      WeChat.shareWebpage({
        ...content,
        description: '顽鸦APP，新青年文化庇护所',
        scene: 0,
      });
    } else {
      WeChat.shareMiniProgram(content);
    }
  };
  const shareWechatTimeline = () => {
    try {
      const content = {scene: 0};
      if (content.type === 'link') {
        WeChat.shareWebpage({
          ...content,
          scene: 1,
        });
      } else {
        WeChat.shareMiniProgram(content);
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  const shareQQ = () => {};

  const shareQQZone = () => {};

  const shareWeibo = () => {};

  const copyLink = () => {};

  const goWebsite = () => {};

  return (
    <BottomModal
      height={0.4}
      width={1}
      rounded
      useNativeDriver={false}
      containerStyle={{zIndex: 10000, backgroundColor: 'red'}}
      modalStyle={
        {
          // backgroundColor: '#F8F8F8',
        }
      }
      overlayOpacity={0.3}
      visible={true}
      onTouchOutside={() => setVisible(false)}
      onSwipeOut={() => setVisible(false)}
      modalTitle={
        <ModalTitle
          hasTitleBar={false}
          title="分享到"
          style={{backgroundColor: '#F8F8F8'}}
          textStyle={{fontSize: 13, fontWeight: '400', color: '#9C9C9C'}}
        />
      }
      footer={
        <ModalFooter bordered={false}>
          <ModalButton
            text="取消"
            style={{height: 50, lineHeight: 45}}
            textStyle={{fontSize: 15, color: '#9C9C9C', fontWeight: '400'}}
            onPress={() => {}}
          />
        </ModalFooter>
      }>
      <ModalContent style={styles.contentWrap}>
        <View
          style={{
            justifyContent: 'space-between',
            paddingVertical: 0,
            paddingHorizontal: 0,
            flex: 1,
            flexDirection: 'row',
          }}>
          <Pressable style={styles.shareWrap}>
            <FastImg source={{uri: DefaultLog}} style={styles.shareImg} />
            <Text style={styles.shareText}>生成图片</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareWechatFriend}>
            <FastImg source={{uri: DefaultLog}} style={styles.shareImg} />
            <Text style={styles.shareText}>微信</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareWechatTimeline}>
            <FastImg source={{uri: DefaultLog}} style={styles.shareImg} />
            <Text style={styles.shareText}>朋友圈</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareQQ}>
            <FastImg source={{uri: DefaultLog}} style={styles.shareImg} />
            <Text style={styles.shareText}>QQ</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareQQZone}>
            <FastImg source={{uri: DefaultLog}} style={styles.shareImg} />
            <Text style={styles.shareText}>QQ空间</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareWeibo}>
            <FastImg source={{uri: DefaultLog}} style={styles.shareImg} />
            <Text style={styles.shareText}>微博</Text>
          </Pressable>
        </View>

        <View
          style={{
            justifyContent: 'flex-start',
            paddingVertical: 0,
            paddingHorizontal: 0,
            flex: 1,
            flexDirection: 'row',
          }}>
          <Pressable style={styles.secondShareWrap} onPress={copyLink}>
            <FastImg source={{uri: DefaultLog}} style={styles.shareImg} />
            <Text style={styles.shareText}>复制链接</Text>
          </Pressable>
          <Pressable style={styles.secondShareWrap} onPress={goWebsite}>
            <FastImg source={{uri: DefaultLog}} style={styles.shareImg} />
            <Text style={styles.shareText}>浏览器</Text>
          </Pressable>
        </View>
      </ModalContent>
    </BottomModal>
  );
};

export default ShareMultiModal;

const styles = StyleSheet.create({
  contentWrap: {
    flex: 1,
    padding: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#F8F8F8',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: 45,
    // width: '100%',
    // textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#9C9C9C',
  },
  shareWrap: {
    marginTop: 25,
    alignItems: 'center',
    width: SCREEN_WIDTH / 6,
    // backgroundColor: 'red'
  },
  secondShareWrap: {
    alignItems: 'center',
    width: SCREEN_WIDTH / 6,
    // backgroundColor: 'red',
    marginTop: 0,
  },
  shareImg: {
    width: 25,
    height: 25,
  },
  shareText: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: '400',
    color: '#9C9C9C',
    lineHeight: 14,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
// #### ShareMiniProgram(ShareMiniProgramMetadata) 分享小程序
//
// ShareMiniProgram
//
// | name    | type   | description                         |
// |---------|--------|-------------------------------------|
// | title| String | 标题                       |
// | description| String | 描述                       |
// | thumbImageUrl| String | 缩略图地址，本库会自动压缩到32KB |
// | userName| String | 小程序的 userName，填小程序原始id          |
// | path| String | 小程序的页面路径                   |
// | hdImageUrl| String | 小程序新版本的预览图二进制数据，6.5.9及以上版本微信客户端支持 |
// | withShareTicket| String | 是否使用带shareTicket的分享            |
// | miniProgramType| Number | 小程序的类型，默认正式版，1.8.1及以上版本开发者工具包支持分享开发版和体验版小程序 |
// | webpageUrl| String | 兼容低版本的网页链接                   |
// | scene   | Number | 分享到, 0:会话 1:朋友圈 2:收藏 |
