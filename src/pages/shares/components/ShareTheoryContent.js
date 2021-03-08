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

const ShareTheoryContent = props => {
  const {
    account,
    title
  } = props.theoryDetail;

  const [qrcode_url, setQrcode_url] = useState('');

  useEffect(() => {

  }, []);

  useEffect(() => {
    prosettings().then(res => {
      setQrcode_url(res.share_page_qrcode_img_url);
    });
  }, []);

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
                <Text style={styles.time}>{'xxxxxx'}</Text>
              </View>
            </View>


            <Text style={styles.title}>{title}</Text>


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
    marginTop: 20,
    fontWeight: '500',
    marginLeft: 17,
    marginRight: 17,
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

export default ShareTheoryContent;
