import React, {Component, useState, useLayoutEffect, useEffect, useRef} from 'react';
import {
  Modal,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as WeChat from 'react-native-wechat-lib';
import styled from 'styled-components/native';
import {BOTTOM_HEIGHT, SCREEN_WIDTH} from '@/utils/navbar';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';
import ShareFriendImg from '@/assets/images/sharewchatfrient.png';
import ShareTimeImg from '@/assets/images/sharewechattimeline.png';
import {uploadBase64File, getShareUrl} from '@/api/asset_api';
import ImgToBase64 from 'react-native-image-base64';
import Loading from '@/components/Loading';
import ShareTopicContent from '@/components/ShareTopicContent';
import ShareArticleContent from '@/components/ShareArticleContent';
import ShareUtil from '@/utils/umeng_share_util';

const SharePageModal = props => {
  const {item_type, item_id} = props.route.params;
  const [shareUri, setShareUri] = useState('');
  const [loadingView, setLoadingView] = useState(true);
  const topic = useSelector(state => state.topic.topicDetail);
  const article = useSelector(state => state.article.articleDetail);

  // console.log('route.params', route.params)

  const [assetable, setAssetable] = useState({
    assetable_type: item_type,
    assetable_id: item_id,
    assetable_name: 'app_share_image',
  });
  const viewShotRef = useRef(null);

  useEffect(() => {
    loadShareData();
  }, []);

  useEffect(() => {
    loadRemoteShareUrl();
  }, [item_type, item_id]);

  const loadRemoteShareUrl = async () => {
    const shareRes = await getShareUrl({item_id: item_id, item_type: item_type});
    console.log('assetable', assetable);
    if (shareRes.share_url) {
      setShareUri(shareRes.share_url);
    }
  };

  const loadShareData = () => {
    setTimeout(() => {
      setLoadingView(false);
    }, 1000);
  };

  const takeImg = async () => {
    if (shareUri) {
      return;
    }
    Toast.showLoading('正在生成分享图片...', {duration: 9000});
    let asset = {};
    await viewShotRef.current.capture().then(async uri => {
      let localUri = await ImgToBase64.getBase64String(uri);
      const asset_res = await uploadBase64File({
        file: encodeURIComponent(localUri),
        assetable_type: assetable.assetable_type,
        assetable_id: assetable.assetable_id,
        assetable_name: assetable.assetable_name || 'app_share_image',
      });
      asset = asset_res;
    });
    setShareUri(asset.original_url);
    Toast.hide();
  };

  const shareFriend = async () => {
    await takeImg();
    WeChat.shareImage(
      {
        imageUrl: shareUri,
        scene: 0,
      },
      error => {
        Toast.showError('分享失败');
        console.log('err', error);
      }
    );
    Toast.hide();
  };
  const shareTimeline = async () => {
    await takeImg();
    WeChat.shareImage(
      {
        imageUrl: shareUri,
        scene: 1,
      },
      error => {
        Alert.error('error', error);
        console.log('err', error);
      }
    );
    Toast.hide();
  };

  const shareQQ = async () => {
    await takeImg();
    ShareUtil.share('', shareUri, '', '', 0, (code, message) => {
      console.log('code', code, message);
    });
  };

  const shareQQZone = async () => {
    await takeImg();
    ShareUtil.share('', shareUri, '', '', 4, (code, message) => {
      console.log('code', code, message);
      // this.setState({result:message});
    });
  };

  const shareWeibo = async () => {
    await takeImg();
    ShareUtil.share('xxxx', shareUri, '', '', 1, (code, message) => {
      console.log('code,', code, message);
      // this.setState({result: message});
    });
  };

  return (
    <ModelWrap>
      {loadingView ? <Loading /> : <View />}
      <ScrollView
        style={{flex: 1, marginBottom: 90, display: loadingView ? 'none' : 'flex'}}
        showsVerticalScrollIndicator={false}>
        {item_type === 'Topic' && (
          <ShareTopicContent topicDetail={topic} viewShotRef={viewShotRef} />
        )}
        {item_type === 'Article' && (
          <ShareArticleContent articleDetail={article} viewShotRef={viewShotRef} />
        )}
      </ScrollView>

      <View style={styles.shareBottomWrap}>
        <View>
          <Text style={styles.shareTitle}>分享到</Text>
        </View>
        <View style={styles.shareBottom}>
          <Pressable style={styles.shareWrap} onPress={() => {}}>
            <FastImg
              source={require('../../assets/shareimages/goimage.png')}
              style={styles.shareImg}
            />
            <Text style={styles.shareText}>生成图片</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareFriend}>
            <FastImg
              source={require('../../assets/shareimages/wechat.png')}
              style={{...styles.shareImg, width: 30}}
            />
            <Text style={styles.shareText}>微信</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareTimeline}>
            <FastImg
              source={require('../../assets/shareimages/wechattimeline.png')}
              style={styles.shareImg}
            />
            <Text style={styles.shareText}>朋友圈</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareQQ}>
            <FastImg
              source={require('../../assets/shareimages/QQ.png')}
              style={{...styles.shareImg, width: 23}}
            />
            <Text style={styles.shareText}>QQ</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareQQZone}>
            <FastImg
              source={require('../../assets/shareimages/QQZone.png')}
              style={styles.shareImg}
            />
            <Text style={styles.shareText}>QQ空间</Text>
          </Pressable>
          <Pressable style={styles.shareWrap} onPress={shareWeibo}>
            <FastImg
              source={require('../../assets/shareimages/weibo.png')}
              mode={'cover'}
              style={{...styles.shareImg, width: 32}}
            />
            <Text style={styles.shareText}>微博</Text>
          </Pressable>
        </View>
      </View>
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
  shareBottomWrap: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    height: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  shareTitle: {
    color: '#9C9C9C',
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'center',
    paddingTop: 10,
  },
  shareBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: -5,
    paddingHorizontal: 0,
  },

  shareWrap: {
    marginTop: 20,
    alignItems: 'center',
    width: SCREEN_WIDTH / 6,
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
