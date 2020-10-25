import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Modal, Button, Dimensions, Image, StyleSheet} from 'react-native';
import IconFont from '@/iconfont';
import ViewShot from 'react-native-view-shot';
import {uploadBase64File} from '@/api/asset_api';
import ImgToBase64 from 'react-native-image-base64';
import {Avator} from '@/components/NodeComponents';
import {DefaultLog} from '@/utils/default-image';
import PlayVideoImg from '@/assets/images/play-video.png';
import ShareLogoImg from '@/assets/images/sharelogo.png';
import WanyaShareWordImg from '@/assets/images/wanya_share_word.png';
import Helper from '@/utils/helper';
import {prosettings} from '@/api/settings_api';

// import CameraRoll from "@react-native-community/cameraroll";

const ViewShotPage = props => {
  const {account, node_name, bg_img_url, content, content_style, desc} = props.pageShareContent;
  const [imgWidth, setimgWidth] = useState(300);
  const [imgHeight, setimgHeight] = useState(300);
  const [qrcode_url, setQrcode_url] = useState('');
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const loadCoverStyle = () => {
    if (!bg_img_url) {
      return;
    }
    Image.getSize(bg_img_url, (width, height) => {
      const maxWidth = screenWidth - 20;
      setimgWidth(maxWidth);
      setimgHeight(height * (maxWidth / width));
    });
    prosettings().then(res => {
      setQrcode_url(res.share_page_qrcode_img_url);
    });
  };

  useEffect(() => {
    loadCoverStyle();
    return () => {};
  }, [bg_img_url]);

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <ViewShot ref={props.viewShotRef} options={{format: 'jpg', quality: 0.8}} style={{flex: 1}}>
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
              <View style={styles.nodeWrap}>
                <IconFont name="node-solid" size={16} color="#fff" />
                <Text style={styles.nodeName}>{node_name}</Text>
              </View>
            </View>
            <View>
              {bg_img_url ? (
                <Image
                  style={[styles.cover, {width: imgWidth, height: imgHeight}]}
                  resizeMode={'cover'}
                  source={{uri: bg_img_url}}
                />
              ) : <View />}
              {content_style === 'video' && (
                <Image source={PlayVideoImg} style={styles.playVideo} />
              )}
            </View>
            <Text style={styles.text}>{content}</Text>
            <View style={styles.footer}>
              <Image style={styles.shareLogo} source={require('@/assets/images/share-wanya.png')} />
              {qrcode_url ? (
                <Image style={styles.shareqrImg} source={{uri: qrcode_url}} />
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
    marginBottom: 12,
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
  cover: {
    // minHeight: 300,
    // maxHeight: 260,
    backgroundColor: 'pink',
    // width: '100%',
    // height: '100%',
  },
  playVideo: {
    position: 'absolute',
    width: 18,
    height: 18,
    right: 10,
    top: 10,
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
    height: 300/(790 / 190),
  },
  shareqrImg: {
    height: 95,
    width: 95,
    backgroundColor: 'white',
    borderRadius: 3,
  },
});

export default ViewShotPage;
