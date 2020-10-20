import React, {useRef, useState} from 'react';
import {View, Text, Modal, Button, Image, StyleSheet} from 'react-native';
import IconFont from '@/iconfont';
import ViewShot from 'react-native-view-shot';
import {uploadBase64File} from '@/api/asset_api';
import ImgToBase64 from 'react-native-image-base64';
import {Avator} from '@/components/NodeComponents';
import {DefaultLog} from '@/utils/default-image';
// import CameraRoll from "@react-native-community/cameraroll";

const ShareContent = props => {
  const {account, node_name, bg_img_url, content} = props.pageShareContent;
  // console.log('account', account);
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View style={styles.avator}>
          <Avator size={45} account={{...account, id: null}} />
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.info}>
            <Text style={styles.username}>{account.nickname}</Text>
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
  );
};

const ViewShotPage = props => {
  const viewShotRef = useRef(null);
  const takeImg = async () => {
    console.log('xxx');
    console.log('viewShotRef', viewShotRef);
    viewShotRef.current.capture().then(async uri => {
      let b = await ImgToBase64.getBase64String(uri);
      // console.log('b', b)
      // const a = "/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAFCgAwAEAAAAAQAAAFAAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAFAAUAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/3QAEAAX/2gAMAwEAAhEDEQA/ANKiiiuMzCiiigAooooAKKKKACiiigD/0NKiiiuMzCiiigAooooAKKKKACiiigD/0dKiiiuMzCiiigAooooAKKKKACiiigD/0tKiiiuMzCiiigApdppUXcaztW1Y2bCGJN0mMnPRaxnOXNyQ3N6dNSV5bGiUIz7U2svS9ZNzOIZ1Csx4IrXkHelGpJT5JrUc6SS5ojKKKK3Oc//T0qKKK4zMKKKKAHxnDVh67ps8lwbiBDIrD5gOorZqTzMggjrXPNTjPngjopTVuWRzukaZcC5WaZDGqc89TXQvjHvSNIVkZcAYBz9aaTmnFVJT55aDqTjy8qCiiitzmP/Z"
      // console.log(encodeURIComponent(a)) // ok
      const asset_res = await uploadBase64File({
        file: encodeURIComponent(b),
        assetable_type: 'Topic',
        assetable_id: '932',
        assetable_name: 'app_share_image',
      });
      console.log('assets', asset_res);
      // WeChat.shareImage({
      //   imageUrl: asset_res.asset.original_url,
      //   scene: 0
      // }, (error)=> {
      //   console.log('err', error)
      // })
      // CameraRoll.saveToCameraRoll(uri, "photo");
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      <ViewShot ref={props.viewShotRef} options={{format: 'jpg', quality: 0.8}} style={{flex: 1}}>
        <ShareContent pageShareContent={props.pageShareContent} />
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
