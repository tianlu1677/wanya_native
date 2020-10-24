import React, {useRef, useState} from 'react';
import {View, Text, Modal, Button, Image, StyleSheet} from 'react-native';
import IconFont from '@/iconfont';
import ViewShot from 'react-native-view-shot';
import {uploadBase64File} from '@/api/asset_api';
import ImgToBase64 from 'react-native-image-base64';
import {Avator} from '@/components/NodeComponents';
import {DefaultLog} from '@/utils/default-image';
// import CameraRoll from "@react-native-community/cameraroll";

const ViewShotPage = props => {
  const {account, node_name, bg_img_url, content} = props.pageShareContent;
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      <ViewShot ref={props.viewShotRef} options={{format: 'jpg', quality: 0.8}} style={{flex: 1}}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <View style={styles.avator}>
              <Avator size={45} account={{...account, id: null}} />
            </View>
            <View style={styles.headerInfo}>
              <View style={styles.info}>
                <Text style={styles.username}>{account && account.nickname}</Text>
                <Text style={styles.time}>刚刚 发布了一篇帖子</Text>
              </View>
              <View style={styles.nodeWrap}>
                <IconFont name="node-solid" size={16} color="#fff" />
                <Text style={styles.nodeName}>{node_name}</Text>
              </View>
            </View>
            <Image style={styles.image} source={{uri: bg_img_url || DefaultLog}} />
            <Text style={styles.text}>{content}</Text>
            <View style={styles.footer}>
              <Image style={styles.shareLogo} source={require('@/assets/images/share-wanya.png')} />
            </View>
          </View>
        </View>
      </ViewShot>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    // marginLeft: 20,
    // marginRight: 20,
    // marginBottom: 60,
    flex: 1,
    height: '30%',
    backgroundColor: '#ff193a',
    paddingLeft: 20,
    paddingRight: 20,
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
    marginBottom: 10,
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
  image: {
    height: 200,
    backgroundColor: 'pink',
    width: '100%',
  },
  text: {
    color: '#fff',
    lineHeight: 23,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 17,
    marginRight: 17,
    paddingTop: 15,
    textAlign: 'justify',
  },
  footer: {
    marginTop: 35,
    paddingLeft: 17,
    paddingRight: 17,
  },
  shareLogo: {
    width: 216,
    height: 82,
  },
});

export default ViewShotPage;
