import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Modal, Button, Dimensions, Image, StyleSheet} from 'react-native';
import IconFont from '@/iconfont';
import ViewShot from 'react-native-view-shot';
import FastImg from '@/components/FastImg';
import {Avator} from '@/components/NodeComponents';
import ShareLogoImg from '@/assets/images/sharelogo.png';
import {prosettings} from '@/api/settings_api';
import RichContent from '@/pages/articles/components/RichContent';
import {RFValue} from "@/utils/response-fontsize"

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ShareArticleContent = props => {
  const {
    account,
    node,
    wx_share_image_url,
    published_at_text,
    title,
    content,
  } = props.articleDetail;

  const bg_img_url = wx_share_image_url ? wx_share_image_url.split('?')[0] : '';
  const desc = `${published_at_text} 发布了一篇文章`;
  const node_name = node ? 'goood' : null;
  // account: topic.account,
  //   node_name: topic.node.name,
  //   content: topic.plain_content,
  //   bg_img_url: topic.wx_share_image_url
  //   ? `${topic.wx_share_image_url.split('?')[0]}?imageView2/0/interlace/1/format/jpg`
  //   : '',
  //   desc: `${topic.published_at_text} 发布了一篇帖子`,
  //   content_style: topic.content_style,
  //   topic_link: topic.topic_link,
  //   qrcode_url: topic.qrcode_url,
  //   }

  const [imgWidth, setimgWidth] = useState(screenWidth - 20);
  const [imgHeight, setimgHeight] = useState(300);
  const [qrcode_url, setQrcode_url] = useState('');
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

  useEffect(() => {
    loadCoverStyle();
  }, [content]);

  useEffect(() => {
    prosettings().then(res => {
      setQrcode_url(res.share_page_qrcode_img_url);
    });
  }, []);

  const richHtmlPStyle = {
    p: {
      fontSize: RFValue(15),
      color: 'white',
      letterSpacing: 1,
      lineHeight: 25,
      marginBottom: 10,
      fontWeight: '300',
    },
    figue: {
      marginTop: 10,
    },
    img: {
      width: '88%',
      marginBottom: 10,
      minHeight: 30,
    },
    h4: {
      fontSize: 30,
      color: 'white',
      letterSpacing: 1,
      lineHeight: 25,
      marginBottom: 10,
      fontWeight: '300',
    },
    span: {
      fontSize: 15,
      color: 'white',
      letterSpacing: 1,
      lineHeight: 25,
      marginBottom: 10,
      fontWeight: '300',
    },
  };

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <ViewShot ref={props.viewShotRef} options={{format: 'jpg', quality: 1}} style={{flex: 1}}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <View style={styles.avator}>
              <Avator size={50} account={{...account, id: null}} />
            </View>

            <View
              style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 10, top: -24}}>
              <Image source={ShareLogoImg} style={{height: 20, width: 58}} />
            </View>

            <View style={styles.headerInfo}>
              <View style={styles.info}>
                <Text style={styles.username}>{account && account.nickname}</Text>
                <Text style={styles.time}>{desc}</Text>
              </View>
              {node_name && (
                <View style={styles.nodeWrap}>
                  <IconFont name="node-solid" size={16} color="#fff" />
                  <Text style={styles.nodeName}>{node_name}</Text>
                </View>
              )}
            </View>

            <Text style={styles.title}>{title}</Text>
            <RichContent
              content={content}
              baseColor={'white'}

              settings={{
                containerStyle: {
                  paddingLeft: 14,
                  paddingRight: 14,
                  marginTop: 5,
                  color: 'white',
                  fontSize: 14,
                },
                tagsStyles: richHtmlPStyle,
                baseFontStyle: {color: 'white'},
              }}
            />
            <View style={styles.footer}>
              <FastImg
                style={styles.shareLogo}
                source={require('@/assets/images/sharewanyalog.png')}
              />
              {qrcode_url ? (
                <FastImg style={styles.shareqrImg} source={{uri: qrcode_url}} />
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      </ViewShot>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // height: '100%',
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
    marginBottom: 20,
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
    marginTop: 9,
  },
  time: {
    color: '#BDBDBD',
    fontSize: 10,
    lineHeight: 20,
  },
  nodeWrap: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginTop: 10,
  },
  nodeName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 17,
    marginRight: 17,
    marginBottom: 20,
    lineHeight: 23,
    letterSpacing: 1,
  },
  text: {
    color: '#fff',
    lineHeight: 23,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 17,
    marginRight: 17,
    paddingTop: 15,
    // minHeight: 150,
    letterSpacing: 1,
    textAlign: 'justify',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
    paddingLeft: 17,
    paddingRight: 17,
    marginBottom: 40,
  },
  shareLogo: {
    marginTop: 10,
    width: 190,
    height: 300 / (790 / 190),
  },
  shareqrImg: {
    height: 95,
    width: 95,
    backgroundColor: 'white',
    borderRadius: 3,
  },
});

export default ShareArticleContent;
