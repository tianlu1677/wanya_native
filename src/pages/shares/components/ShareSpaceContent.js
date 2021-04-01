import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ViewShot from 'react-native-view-shot';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {Avator} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {prosettings} from '@/api/settings_api';
import ShareLogoImg from '@/assets/images/sharelogo.png';
import ShareWanyaLog from '@/assets/images/sharewanyalog.png';
import {commonStyles} from './common';

const {width: screenWidth} = Dimensions.get('window');

const ShareSpaceContent = props => {
  const {currentAccount} = useSelector(state => state.account);
  const {name, cover_url, address} = props.spaceDetail;
  const [qrcodeUrl, setQrcodeUrl] = useState(null);

  useEffect(() => {
    prosettings().then(res => {
      setQrcodeUrl(res.share_page_qrcode_img_url);
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <ViewShot ref={props.viewShotRef} options={{format: 'jpg', quality: 1}} style={{flex: 1}}>
        <View style={{backgroundColor: 'red'}}>
          <View style={styles.wrapper}>
            <View style={styles.avator}>
              <Avator size={50} account={{...currentAccount, id: null}} />
            </View>
            <FastImg source={ShareLogoImg} style={styles.shareLogoTop} />
            <View style={styles.nodeWrap}>
              <View style={styles.headerInfo}>
                <Text style={styles.username}>{currentAccount.nickname}</Text>
                <Text style={styles.time}>刚刚 分享了一个场地</Text>
              </View>
            </View>
            <View style={styles.imageCover}>
              <FastImg
                source={{uri: cover_url}}
                style={{...styles.nodeImage, width: screenWidth - 20, height: 280}}
                mode="center"
              />
            </View>
            <Text style={styles.nodeName}>{name}</Text>
            <View style={styles.addressWrap}>
              <IconFont name="space-point" size={15} color={'#fff'} />
              <Text style={styles.address}>{address}</Text>
            </View>
            <View style={styles.footer}>
              <FastImg style={styles.shareLogo} source={ShareWanyaLog} />
              {qrcodeUrl ? (
                <FastImg style={styles.shareqrImg} source={{uri: qrcodeUrl}} />
              ) : (
                <View />
              )}
            </View>
            <View />
          </View>
        </View>
      </ViewShot>
    </View>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  wrapper: {
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
  imageCover: {
    height: 280,
    marginTop: 12,
  },
  nodeName: {
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  addressWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 20,
  },
  address: {
    textAlign: 'justify',
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 10,
  },
});

export default ShareSpaceContent;