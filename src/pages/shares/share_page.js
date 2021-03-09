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
import {BOTTOM_HEIGHT, SCREEN_WIDTH, IsIos} from '@/utils/navbar';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';
import {uploadBase64File, getShareUrl, getShareContent} from '@/api/asset_api';
import ImgToBase64 from 'react-native-image-base64';
import Loading from '@/components/Loading';
import ShareTopicContent from '@/pages/shares/components/ShareTopicContent';
import ShareArticleContent from '@/pages/shares/components/ShareArticleContent';
import ShareInviteContent from '@/pages/shares/components/ShareInviteContent';
import ShareUtil from '@/utils/umeng_share_util';
import CameraRoll from '@react-native-community/cameraroll';
import GetStorage from '@/components/GetStorage';
import {getTopic} from '@/api/topic_api';
import {dispatchArticleDetail, dispatchTheoryDetail, dispatchTopicDetail} from '@/redux/actions';
import {getArticle} from '@/api/article_api';
import {getTheoriy} from '@/api/theory_api';
import {useNavigation} from '@react-navigation/native';
import ShareTheoryContent from '@/pages/shares/components/ShareTheoryContent';

const RNFS = require('react-native-fs'); //文件处理

const SharePageModal = props => {
  const dispatch = useDispatch();

  const {item_type, item_id} = props.route.params;
  const [shareUri, setShareUri] = useState('');
  const [share_content, setShareContent] = useState({});
  const [downloadUri, setDownloadUri] = useState('');
  const [loadingView, setLoadingView] = useState(true);

  const viewShotRef = useRef(null);
  const navigation = useNavigation();
  // shareUri = '';

  const topic = useSelector(state => state.topic.topicDetail);
  const article = useSelector(state => state.article.articleDetail);
  const theory = useSelector(state => state.theory.theoryDetail);

  const [assetable, setAssetable] = useState({
    assetable_type: item_type,
    assetable_id: item_id,
    assetable_name: 'app_share_image',
  });

  useEffect(() => {
    loadShareData();
  }, []);

  useEffect(() => {
    initData();
  }, [item_type, item_id]);

  const initData = async () => {
    await loadItemData();
    await loadRemoteShareUrl();
    await getShare();
  };

  // 加载已经生过的图片
  const loadRemoteShareUrl = async () => {
    const shareRes = await getShareUrl({item_id: item_id, item_type: item_type});
    if (shareRes.share_url) {
      console.log('shareResshare_url', shareRes.share_url);
      setShareUri(shareRes.share_url);
    }
  };
  // 加载分享的文章/帖子/
  const loadItemData = async () => {
    if (item_type === 'Topic') {
      const res = await getTopic(item_id);
      if (res.data.status === 404) {
        Toast.show('该帖子已删除');
        navigation.goBack();
      } else {
        dispatch(dispatchTopicDetail(res.data.topic));
      }
    }

    if (item_type === 'Article') {
      const res = await getArticle(item_id);
      if (res.data.status === 404) {
        Toast.show('该帖子已删除');
        navigation.goBack();
      } else {
        dispatch(dispatchArticleDetail(res.data.article));
      }
    }
    if (item_type === 'Theory') {
      const res = await getTheoriy(item_id);
      if (res.data.status === 404) {
        Toast.show('已删除');
        navigation.goBack();
      } else {
        dispatch(dispatchTheoryDetail(res.data.theory));
      }
    }
  };

  // 加载分享的相关设置
  const getShare = async () => {
    if (item_type && item_id) {
      const content = await getShareContent({item_type: item_type, item_id: item_id});
      setShareContent(content);
      if (content.download_img_url) {
        setShareUri(content.download_img_url);
        setDownloadUri(content.download_img_url);
        console.log('xshareUri', shareUri, content);
      }
    }
  };
  const loadShareData = () => {
    setTimeout(() => {
      setLoadingView(false);
    }, 1000);
  };

  const takeImg = async () => {
    // await loadRemoteShareUrl();
    // await getShare();
    // console.log('shareUri', shareUri);
    if (shareUri) {
      return shareUri;
    }
    Toast.showLoading('正在生成分享图片...', {duration: 30000});
    const uri = await viewShotRef.current.capture();
    let localUri = await ImgToBase64.getBase64String(uri);
    const asset_res = await uploadBase64File({
      file: encodeURIComponent(localUri),
      assetable_type: assetable.assetable_type,
      assetable_id: assetable.assetable_id,
      assetable_name: assetable.assetable_name || 'app_share_image',
    });
    setShareUri(asset_res.asset.original_url);
    console.log('asset', asset_res);
    Toast.hide();
    return asset_res.asset.original_url;
  };

  const shareFriend = async () => {
    const thumb_url = await takeImg();
    console.log('thumb_url', thumb_url);
    WeChat.shareImage(
      {
        imageUrl: thumb_url,
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
    const thumb_url = await takeImg();
    WeChat.shareImage(
      {
        imageUrl: thumb_url,
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
    const thumb_url = await takeImg();
    ShareUtil.share('', thumb_url, '', '', 0, (code, message) => {
      console.log('code', code, message);
    });
  };

  const shareQQZone = async () => {
    const thumb_url = await takeImg();
    ShareUtil.share('', thumb_url, '', '', 4, (code, message) => {
      console.log('code', code, message);
      // this.setState({result:message});
    });
  };

  const shareWeibo = async () => {
    const thumb_url = await takeImg();
    ShareUtil.share(
      `${share_content.weibo.website_url}  来源：@顽鸦`,
      thumb_url,
      '',
      '',
      1,
      (code, message) => {
        console.log('code,', code, message);
        // this.setState({result: message});
      }
    );
  };

  const savePhoto = async had_permission => {
    const thumb_url = await takeImg();
    setTimeout(() => {
      if (had_permission) {
        if (!IsIos) {
          const storeLocation = `${RNFS.DocumentDirectoryPath}`;
          let pathName = new Date().getTime() + '顽鸦分享图.png';
          let downloadDest = `${storeLocation}/${pathName}`;
          const ret = RNFS.downloadFile({fromUrl: thumb_url, toFile: downloadDest});
          ret.promise.then(res => {
            if (res && res.statusCode === 200) {
              var promise = CameraRoll.save('file://' + downloadDest);
              Toast.showError('已存储到相册');
              promise
                .then(function (result) {
                  console.log('图片已保存至相册111');
                })
                .catch(function (error) {
                  alert(JSON.stringify(error));
                  Toast.showError(`保存失败`);
                  console.log('保存失败');
                });
            }
          });
        } else {
          console.log('savePhoto shareUri', thumb_url);
          CameraRoll.save(thumb_url, {type: 'photo'}).then(res => {
            console.log('res', res);
            Toast.showError('已存储到相册');
          });
        }
      }
    }, 500);
  };
  console.log('shareUri', shareUri);
  return (
    <ModelWrap>
      {loadingView ? (
        <Loading />
      ) : (
        <ScrollView
          style={{flex: 1, marginBottom: 100, display: loadingView ? 'none' : 'flex'}}
          showsVerticalScrollIndicator={false}>
          {item_type === 'Topic' && (
            <ShareTopicContent topicDetail={topic} viewShotRef={viewShotRef} />
          )}
          {item_type === 'Article' && (
            <ShareArticleContent articleDetail={article} viewShotRef={viewShotRef} />
          )}

          {item_type === 'Theory' && (
            <ShareTheoryContent theoryDetail={theory} viewShotRef={viewShotRef} />
          )}
          {item_type === 'Account' && <ShareInviteContent imgUrl={downloadUri} />}
        </ScrollView>
      )}

      <View style={styles.shareBottomWrap}>
        <View>
          <Text style={styles.shareTitle}>分享到</Text>
        </View>
        <View style={styles.shareBottom}>
          <GetStorage handleClick={savePhoto}>
            <View style={styles.shareWrap}>
              <FastImg
                source={require('../../assets/shareimages/goimage.png')}
                style={styles.shareImg}
              />
              <Text style={styles.shareText}>生成图片</Text>
            </View>
          </GetStorage>
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
              source={require('../../assets/shareimages/weibo-white.png')}
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
    height: 130,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
    paddingTop: 20,
    alignItems: 'center',
    width: (SCREEN_WIDTH - 40) / 6,
    // backgroundColor: 'red',
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
