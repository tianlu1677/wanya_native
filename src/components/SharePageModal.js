import React, {Component, useState, useLayoutEffect, useEffect, useRef} from 'react';
import {Modal, StyleSheet, View, TouchableOpacity, Image, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as WeChat from 'react-native-wechat-lib';
import styled from 'styled-components/native';
import {BOTTOM_HEIGHT} from '@/utils/navbar';
import {dispatchShareItem} from '@/redux/actions';
import FastImg from '@/components/FastImg';
import ShareFriendImg from '@/assets/images/sharewchatfrient.png';
import ShareTimeImg from '@/assets/images/sharewechattimeline.png';
import {DefaultLog} from '@/utils/default-image';
import ViewShotPage from '@/components/SharePage';
import {uploadBase64File} from '@/api/asset_api';
import ImgToBase64 from 'react-native-image-base64';

const SharePageModal = props => {
  // console.log('shareModelVisible', props)
  const [shareModelVisible, setShareModelVisible] = useState(props.shareModelVisible);
  const [shareUri, setShareUri] = useState('');
  const dispatch = useDispatch();
  const viewShotRef = useRef(null);

  const {
    assetable,
    pageShareContent
  } = props

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
    console.log('shareUri', shareUri);
    if (!shareUri) {
      takeImg();
    }
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
    if (!shareUri) {
      takeImg();
    }
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
    <Modal
      animationType=""
      transparent={true}
      visible={props.shareModelVisible}
      onRequestClose={() => {
        props.onShowShare(false)
      }}>
      <ModelWrap
        onPress={() => {
          props.onShowShare(false)
        }}>
        <ViewShotPage pageShareContent={pageShareContent} viewShotRef={viewShotRef} />
        <ShareCardView style={{marginBottom: BOTTOM_HEIGHT}}>
          <Pressable
            style={{display: 'flex', alignItems: 'center'}}
            onPress={() => {
              shareFriend();
            }}>
            <FastImg
              source={ShareFriendImg}
              style={{width: 28, height: 22}}
              resizeMode={'contain'}
            />
            <ShareText>微信好友</ShareText>
          </Pressable>
          <TouchableOpacity
            style={{display: 'flex', alignItems: 'center'}}
            onPress={() => {
              shareTimeline();
            }}>
            <FastImg source={ShareTimeImg} style={{width: 20, height: 20}} />
            <ShareText>分享朋友圈</ShareText>
          </TouchableOpacity>
        </ShareCardView>
      </ModelWrap>
    </Modal>
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

const ModelWrap = styled(TouchableOpacity)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
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