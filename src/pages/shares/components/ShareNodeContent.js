import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';
import IconFont from '@/iconfont';
import ViewShot from 'react-native-view-shot';
import FastImg from '@/components/FastImg';
import {Avator} from '@/components/NodeComponents';
import ShareLogoImg from '@/assets/images/sharelogo.png';
import {prosettings} from '@/api/settings_api';
import {RFValue} from '@/utils/response-fontsize';
import {commonStyles} from './common';

const {width: screenWidth} = Dimensions.get('window');
import ShareWanyaLog from '@/assets/images/sharewanyalog.png';

const ShareNodeContent = props => {
  const {
    account,
    node,
    wx_share_image_url,
    content_style,
    topic_link,
    plain_content,
    published_at_text,
    title,
    is_long_video,
  } = props.topicDetail;

  const desc = `${published_at_text} 发布了一篇${is_long_video ? '长视频' : '帖子'}`;
  const bg_img_url = wx_share_image_url ? wx_share_image_url.split('?')[0] : '';
  const content = plain_content;
  const node_name = node ? node.name : '';
  const [imgWidth, setimgWidth] = useState(screenWidth - 20);
  const [imgHeight, setimgHeight] = useState(300);
  const [qrcodeUrl, setQrcodeUrl] = useState('');
  // const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const loadCoverStyle = () => {
    if (!bg_img_url) {
      return;
    }
    Image.prefetch(bg_img_url);
    console.log('bg_img_url', bg_img_url);
    Image.getSize(bg_img_url, (width, height) => {
      const maxWidth = screenWidth - 20;
      setimgHeight(height * (maxWidth / width));
    });
  };

  const [qrcode_url, setQrcode_url] = useState('');

  useEffect(() => {
    loadCoverStyle();
  }, [content]);

  useEffect(() => {
    prosettings().then(res => {
      console.log('res', res);
      setQrcodeUrl(res.share_page_qrcode_img_url);
    });
  }, []);

  console.log('props', props.topicDetail);
  return (
    <View style={styles.content}>
      <ViewShot
        ref={props.viewShotRef}
        options={{format: 'jpg', quality: 1}}
        style={styles.wrapper}>
        <View style={styles.avator}>
          <Avator size={50} account={{...account, id: null}} />
        </View>
        <FastImg source={ShareLogoImg} style={styles.shareLogoTop} />
        <View style={styles.nodeWrap}>
          <View style={styles.headerInfo}>
            <Text style={styles.username}>{account && account.nickname}</Text>
            <Text style={styles.time}>{published_at_text} 分享了一个圈子</Text>
          </View>
          <View style={styles.nodeInfo}>
            <IconFont name="node-solid" size={16} color={'#fff'} />
            <Text style={styles.nodeText}>护板大水解</Text>
          </View>
        </View>
        <View style={styles.imageCover}>
          <FastImg
            source={{
              uri:
                'http://xinxuefile.meirixinxue.com/assets/2021/ee674662-f0ea-4720-8b23-3b8f3ce9d56a.jpg',
            }}
            style={{...styles.nodeImage, width: screenWidth - 20, height: 200}}
            mode="center"
          />
        </View>
        <Text style={styles.nodeName}>去阿紫名称</Text>
        <Text style={styles.nodeIntro}>
          去阿紫名称jianjie简介去阿紫名称jianjie简介去阿紫名称jianjie简介去阿紫名称jianjie简介去阿紫名称jianjie简介去阿紫名称jianjie简介去阿紫名称jianjie简介去阿紫名称jianjie简介
        </Text>
        <View style={styles.footer}>
          <FastImg style={styles.shareLogo} source={ShareWanyaLog} />
          {qrcode_url ? <FastImg style={styles.shareqrImg} source={{uri: qrcode_url}} /> : <View />}
        </View>
        <View />
      </ViewShot>
    </View>
  );
};
const styles = StyleSheet.create({
  ...commonStyles,
  content: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: RFValue(40),
    marginBottom: RFValue(35),
    backgroundColor: '#000',
    borderRadius: 25,
    position: 'relative',
  },
  nodeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 30,
  },
  nodeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodeText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  imageCover: {
    height: 200,
    marginTop: 30,
  },
  nodeName: {
    marginTop: 30,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  nodeIntro: {
    textAlign: 'justify',
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 30,
    marginHorizontal: 10,
  },
});

export default ShareNodeContent;
