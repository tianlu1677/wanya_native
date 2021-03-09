import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import ViewShot from 'react-native-view-shot';
import FastImg from '@/components/FastImg';
import {Avator} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {scaleSize} from '@/utils/scale';
import {prosettings} from '@/api/settings_api';

import PlayVideoImg from '@/assets/images/play-video.png';
import ShareLogoImg from '@/assets/images/sharelogo.png';
import ShareWanyaLog from '@/assets/images/sharewanyalog.png';
const {width: screenWidth} = Dimensions.get('window');

const ShareTheoryMedia = props => {
  const {media, type} = props;
  const innerWidth = type === 'theory_media' ? screenWidth - 20 : screenWidth - 50;
  const {width, height} = scaleSize(media, innerWidth);
  const style = {width, height};

  return (
    <View style={mstyles.mediaWrapper}>
      {media.category === 'image' ? (
        <FastImg resizeMode={'cover'} source={{uri: media.original_url}} style={style} />
      ) : media.category === 'video' ? (
        <FastImg
          resizeMode={'cover'}
          source={{uri: `${media.url}?vframe/jpg/offset/0/rotate/auto`}}
          style={style}
        />
      ) : null}
      <FastImg source={PlayVideoImg} style={mstyles.playVideo} />
    </View>
  );
};

const ShareTheoryContent = props => {
  const {
    account,
    title,
    published_at_text,
    media,
    plain_content,
    theory_bodies,
    tip,
  } = props.theoryDetail;

  const [qrcode_url, setQrcode_url] = useState('');

  useEffect(() => {
    prosettings().then(res => {
      setQrcode_url(res.share_page_qrcode_img_url);
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <ViewShot ref={props.viewShotRef} options={{format: 'jpg', quality: 1}} style={{flex: 1}}>
        <View style={styles.content}>
          <View style={styles.avator}>
            <Avator size={50} account={{...account, id: null}} />
          </View>
          <FastImg source={ShareLogoImg} style={styles.shareLogoTop} />
          <View style={styles.headerInfo}>
            <Text style={styles.username}>{account && account.nickname}</Text>
            <Text style={styles.time}>{published_at_text} 发布了一篇顽法</Text>
          </View>
          {media && (
            <View style={{marginTop: 20}}>
              <ShareTheoryMedia media={media} type="theory_media" />
            </View>
          )}
          <View style={styles.mainContent}>
            {title && <Text style={styles.theoryTitle}>{title}</Text>}
            {plain_content && <Text style={styles.planContent}>{plain_content}</Text>}
            <Text style={styles.introTitle}>顽法步骤</Text>
            {(theory_bodies || []).map((item, index) =>
              item.title && item.media && item.desc ? (
                <View key={index}>
                  {item.title && (
                    <Text style={styles.stepTitle}>
                      步骤{item.position}/{theory_bodies.length} {item.title}
                    </Text>
                  )}
                  {item.media && (
                    <View style={styles.stepMedia}>
                      <ShareTheoryMedia media={item.media} type="theory_body_media" />
                    </View>
                  )}
                  {item.desc && <Text style={styles.stepIntro}>{item.desc}</Text>}
                </View>
              ) : null
            )}
            {tip && (
              <>
                <Text style={styles.introTitle}>小贴士</Text>
                <Text style={styles.tips}>{tip}</Text>
              </>
            )}
          </View>

          <View style={styles.footer}>
            <FastImg style={styles.shareLogo} source={ShareWanyaLog} />
            {qrcode_url ? (
              <FastImg style={styles.shareqrImg} source={{uri: qrcode_url}} />
            ) : (
              <View />
            )}
          </View>
        </View>
      </ViewShot>
    </View>
  );
};

const mstyles = StyleSheet.create({
  mediaWrapper: {
    position: 'relative',
    backgroundColor: 'pink',
  },
  playVideo: {
    width: RFValue(40),
    height: RFValue(40),
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -RFValue(20),
    marginTop: -RFValue(20),
  },
});

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
    marginTop: RFValue(40),
    marginBottom: RFValue(35),
    backgroundColor: '#000',
    borderRadius: 25,
    position: 'relative',
  },
  avator: {
    position: 'absolute',
    top: -22,
    left: 18,
  },
  shareLogoTop: {
    width: 58,
    height: 20,
    position: 'absolute',
    right: 10,
    top: -24,
  },
  headerInfo: {
    marginHorizontal: 18,
    marginTop: 30,
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
  mainContent: {
    paddingHorizontal: 15,
  },
  theoryTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: RFValue(25),
    marginTop: RFValue(10),
  },
  planContent: {
    color: '#fff',
    marginTop: RFValue(16),
  },
  introTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    marginTop: RFValue(20),
  },
  stepTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: RFValue(20),
    marginTop: RFValue(15),
  },
  stepMedia: {
    marginTop: RFValue(15),
  },
  stepIntro: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
    lineHeight: RFValue(20),
    marginTop: RFValue(12),
  },
  tips: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
    lineHeight: RFValue(20),
    marginTop: RFValue(20),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 35,
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
