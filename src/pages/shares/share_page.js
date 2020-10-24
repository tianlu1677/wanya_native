import React, {Component, useState, useLayoutEffect, useEffect, useRef} from 'react';
import {
  Modal,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as WeChat from 'react-native-wechat-lib';
import styled from 'styled-components/native';
import {BOTTOM_HEIGHT} from '@/utils/navbar';
import FastImg from '@/components/FastImg';
import Toast from "@/components/Toast"
import ShareFriendImg from '@/assets/images/sharewchatfrient.png';
import ShareTimeImg from '@/assets/images/sharewechattimeline.png';
import {DefaultLog} from '@/utils/default-image';
import ViewShotPage from '@/components/SharePage';
import {uploadBase64File} from '@/api/asset_api';
import ImgToBase64 from 'react-native-image-base64';

const SharePageModal = props => {
  const defaultShareContent = {
    account: {},
    node_name: '',
    content: '',
    bg_img_url: '',
  };
  const {route} = props;
  const item_type = route.params.item_type;
  const item_id = route.params.item_id;
  const [shareUri, setShareUri] = useState('');
  const [shareContent, setShareContent] = useState({});
  const topic = useSelector(state => state.topic.topicDetail);
  const article = useSelector(state => state.article.articleDetail);

  const [assetable, setAssetable] = useState({
    assetable_type: item_type,
    assetable_id: item_id,
    assetable_name: 'app_share_image',
  });
  const viewShotRef = useRef(null);

  useEffect(() => {
    loadShareData();
  }, []);

  const loadShareData = () => {
    if (item_type === 'Topic') {
      // console.log('topic', topic);
      setShareContent({
        account: topic.account,
        node_name: topic.node.name,
        content: topic.plain_content,
        bg_img_url: topic.wx_share_image_url ? topic.wx_share_image_url.split('?')[0] : '',
        desc: '刚刚 发布了一篇帖子',
        content_style: topic.content_style,
        qrcode_url: topic.qrcode_url
      });
      // console.log('shareContent', shareContent);
    } else if (item_type === 'Article') {
      // console.log('article', article.intro)
      setShareContent({
        account: article.account,
        node_name: article.node.name,
        content: article.intro,
        bg_img_url: article.wx_share_image_url ? article.wx_share_image_url.split('?')[0] : '',
        desc: '刚刚 发布了一篇文章',
        content_style: '',
        qrcode_url: article.qrcode_url
      });
    } else {
      console.log('no support');
    }
  };

  const takeImg = async () => {
    viewShotRef.current.capture().then(async uri => {
      let localUri = await ImgToBase64.getBase64String(uri);
      const asset_res = await uploadBase64File({
        file: encodeURIComponent(localUri),
        assetable_type: assetable.type,
        assetable_id: assetable.id,
        assetable_name: assetable.assetable_name || 'app_share_image',
      });
      console.log('assets', asset_res);
      setShareUri(asset_res.asset.original_url);
    });
  };

  const shareFriend = e => {
    Toast.showLoading('正在分享...')
    console.log('shareUri', shareUri);
    if (!shareUri) {
      takeImg();
    }
    Toast.hide()
    WeChat.shareImage(
      {
        imageUrl: shareUri,
        scene: 0,
      },
      error => {
        console.log('err', error);
      }
    );
  };
  const shareTimeline = () => {
    Toast.showLoading('正在分享...')
    if (!shareUri) {
      takeImg();
    }
    Toast.hide()
    WeChat.shareImage(
      {
        imageUrl: shareUri,
        scene: 1,
      },
      error => {
        console.log('err', error);
      }
    );
  };

  return (
    <ModelWrap>
      <ScrollView style={{flex: 1, marginBottom: 90}} showsVerticalScrollIndicator={false}>
        <ViewShotPage pageShareContent={shareContent} viewShotRef={viewShotRef} />
      </ScrollView>
      <ShareCardView style={{marginBottom: BOTTOM_HEIGHT}}>
        <Pressable
          style={{display: 'flex', alignItems: 'center'}}
          onPress={() => {
            shareFriend();
          }}
          hitSlop={{left: 40, right: 10, top: 20, bottom: 10}}
        >
          <FastImg source={ShareFriendImg} style={{width: 28, height: 22}} resizeMode={'contain'} />
          <ShareText>微信好友</ShareText>
        </Pressable>
        <TouchableOpacity
          style={{display: 'flex', alignItems: 'center'}}
          onPress={() => {
            shareTimeline();
          }}
          hitSlop={{left: 10, right: 50, top: 20, bottom: 10}}
        >
          <FastImg source={ShareTimeImg} style={{width: 20, height: 20}} />
          <ShareText>分享朋友圈</ShareText>
        </TouchableOpacity>
      </ShareCardView>
    </ModelWrap>
  );
};

export default SharePageModal;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 300,
    width: '100%',
  },
});

const ModelWrap = styled(View)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  background-color: #ff193a;
`;

const ShareCardView = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  height: 90px;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 98px;
  padding-right: 88px;
`;

const ShareText = styled(Text)`
  color: #24db5a;
  font-size: 12px;
  margin-top: 10px;
`;

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
