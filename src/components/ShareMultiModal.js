import React, {Component, useState, useLayoutEffect, useEffect, useRef} from 'react';
import {StyleSheet, View, Linking, Image, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal, {
  ModalTitle,
  ModalFooter,
  ModalButton,
  BottomModal,
  ModalContent,
} from 'react-native-modals';
import ShareUtil from '@/utils/umeng_share_util';
import * as WeChat from 'react-native-wechat-lib';
import {IsIos, SCREEN_WIDTH} from '@/utils/navbar';
import {dispatchShareItem} from '@/redux/actions';
import {getShareContent} from '@/api/asset_api';
import FastImg from '@/components/FastImg';
import Helper from '@/utils/helper';
import Toast from '@/components/Toast';
import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from '@/navigator/root-navigation';
import IconFont from '@/iconfont';

const ShareMultiModal = () => {
  const dispatch = useDispatch();
  let shareContent = useSelector(state => state.home.shareContent);
  const {item_type, item_id} = shareContent;
  const [share_content, setShareContent] = useState({});

  const shareWechatFriend = e => {
    if (share_content.wechat_type === 'mini') {
      const {thumb_url, title, description, website_url, path} = share_content.miniwechat;
      WeChat.shareMiniProgram({
        title: title,
        userName: 'gh_c2b50fe8e928',
        webpageUrl: website_url,
        thumbImageUrl: thumb_url,
        path: path,
        scene: 0,
      });
    }
    if (share_content.wechat_type === 'website') {
      const {thumb_url, title, description, website_url} = share_content.wechat;
      WeChat.shareWebpage({
        title: title,
        thumbImageUrl: thumb_url,
        webpageUrl: website_url,
        description: description,
        scene: 0,
      });
    }
  };
  const shareWechatTimeline = () => {
    const {thumb_url, title, description, website_url} = share_content.wechat;
    WeChat.shareWebpage({
      title: title,
      thumbImageUrl: thumb_url,
      webpageUrl: website_url,
      description: description,
      scene: 1,
    });
  };

  const shareQQ = () => {
    const {thumb_url, title, description, website_url} = share_content.qqzone;
    ShareUtil.share(description, thumb_url, website_url, title, 0, (code, message) => {
      console.log('code', code, message);
    });
  };

  const shareQQZone = () => {
    const {thumb_url, title, description, website_url} = share_content.qqzone;
    ShareUtil.share(description, thumb_url, website_url, title, 4, (code, message) => {
      console.log('code', code, message);
      // this.setState({result:message});
    });
  };

  const shareWeibo = () => {
    const {thumb_url, title, description, website_url} = share_content.weibo;
    ShareUtil.share(`${description}`, thumb_url, '', '', 1, (code, message) => {
      console.log('code,', code, message);
      // this.setState({result: message});
    });
  };

  const copyLink = () => {
    const websiteUrl = share_content.gowebsite.website_url;
    Helper.setClipboard(websiteUrl);
  };

  const goWebsite = () => {
    const websiteUrl = share_content.gowebsite.website_url;
    Linking.openURL(websiteUrl);
  };

  const getShare = async () => {
    if (item_type && item_id) {
      const content = await getShareContent({item_type: item_type, item_id: item_id});
      // console.log('share item_type', content, item_type, item_id);

      setShareContent(content);
    }
  };

  const closeModal = () => {
    dispatch(dispatchShareItem({...shareContent, visible: false}));
  };
  // 去生成图片
  const goGenerateImage = () => {
    if (item_type.toLowerCase() === 'topic') {
      RootNavigation.push('SharePage', {item_type: 'Topic', item_id: item_id});
    }

    if (item_type.toLowerCase() === 'article') {
      RootNavigation.push('SharePage', {item_type: 'Article', item_id: item_id});
    }

    if (item_type.toLowerCase() === 'account') {
      RootNavigation.push('SharePage', {item_type: 'Account', item_id: item_id});
    }

    if (item_type.toLowerCase() === 'theory') {
      RootNavigation.push('SharePage', {item_type: 'Theory', item_id: item_id});
    }

    if (item_type.toLowerCase() === 'node') {
      RootNavigation.push('SharePage', {item_type: 'Node', item_id: item_id});
    }

    if (item_type.toLowerCase() === 'space') {
      RootNavigation.push('SharePage', {item_type: 'Space', item_id: item_id});
    }

    closeModal();
  };

  useEffect(() => {
    getShare();
  }, [item_type, item_id]);

  return (
    <BottomModal
      height={IsIos ? 0.37 : 0.45}
      width={1}
      rounded
      useNativeDriver={true}
      containerStyle={{zIndex: 10000, backgroundColor: 'red'}}
      // modalStyle={}
      overlayOpacity={0.3}
      visible={shareContent.visible}
      onTouchOutside={closeModal}
      onSwipeOut={closeModal}
      modalTitle={
        <ModalTitle
          hasTitleBar={false}
          title={ shareContent.title ||  "分享到"}
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
            onPress={closeModal}
          />
        </ModalFooter>
      }>
      <ModalContent style={styles.contentWrap}>
        <View
          style={{
            // justifyContent: 'space-between',
            paddingVertical: 0,
            paddingHorizontal: 0,
            flex: 1,
            flexDirection: 'row',
          }}>
          <Pressable style={styles.shareWrap} onPress={goGenerateImage}>
            <FastImg
              source={require('../assets/shareimages/goimage.png')}
              style={styles.shareImg}
            />
            <Text style={styles.shareText}>生成图片</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareWechatFriend}>
            <FastImg
              source={require('../assets/shareimages/wechat.png')}
              style={{...styles.shareImg, width: 30}}
            />
            <Text style={styles.shareText}>微信</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareWechatTimeline}>
            <FastImg
              source={require('../assets/shareimages/wechattimeline.png')}
              style={styles.shareImg}
            />
            <Text style={styles.shareText}>朋友圈</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareQQ}>
            <FastImg
              source={require('../assets/shareimages/QQ.png')}
              style={{...styles.shareImg, width: 23}}
            />
            <Text style={styles.shareText}>QQ</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareQQZone}>
            <FastImg source={require('../assets/shareimages/QQZone.png')} style={styles.shareImg} />
            <Text style={styles.shareText}>QQ空间</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareWeibo}>
            <FastImg
              source={require('../assets/shareimages/weibo.png')}
              mode={'cover'}
              style={{...styles.shareImg, width: 32}}
            />
            <Text style={styles.shareText}>微博</Text>
          </Pressable>
        </View>

        <View
          style={{
            justifyContent: 'flex-start',
            paddingVertical: 0,
            paddingHorizontal: 0,
            // flex: 1,
            flexDirection: 'row',
          }}>
          <Pressable style={styles.secondShareWrap} onPress={copyLink}>
            <FastImg source={require('../assets/shareimages/copy.png')} style={styles.shareImg} />
            <Text style={styles.shareText}>复制链接</Text>
          </Pressable>
          <Pressable style={styles.secondShareWrap} onPress={goWebsite}>
            <FastImg
              source={require('../assets/shareimages/website.png')}
              style={styles.shareImg}
            />
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
    // padding: 0,
    alignContent: 'center',
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
  },
  secondShareWrap: {
    alignItems: 'center',
    width: SCREEN_WIDTH / 6,
    paddingBottom: 30,
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
