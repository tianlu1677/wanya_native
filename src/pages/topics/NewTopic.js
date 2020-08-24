import React, {Component} from 'react';
import {
  Alert,
  Image,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import Uploader from '../../utils/uploader';
import {createAsset} from '@/api/asset_api';
import Helper from '../../utils/helper';

var ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      images: null,
    };
  }

  pickSingleWithCamera(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then(image => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch(e => alert(e));
  }

  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    })
      .then(image => {
        console.log('received base64 image');
        this.setState({
          image: {
            uri: `data:${image.mime};base64,` + image.data,
            width: image.width,
            height: image.height,
          },
          images: null,
        });
      })
      .catch(e => alert(e));
  }

  cleanupImages() {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  }

  cleanupSingleImage() {
    let image =
      this.state.image ||
      (this.state.images && this.state.images.length ? this.state.images[0] : null);
    console.log('will cleanup image', image);

    ImagePicker.cleanSingle(image ? image.uri : null)
      .then(() => {
        console.log(`removed tmp image ${image.uri} from tmp directory`);
      })
      .catch(e => {
        alert(e);
      });
  }

  cropLast() {
    if (!this.state.image) {
      return Alert.alert('No image', 'Before open cropping only, please select image');
    }

    ImagePicker.openCropper({
      path: this.state.image.uri,
      width: 200,
      height: 200,
    })
      .then(image => {
        console.log('received cropped image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  async pickSingle(cropit, circular = false, mediaType) {
    const token = await Helper.getData('auth_token');
    console.log('auth_token', token)
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then(image => {
        let uploadOptions = {
          url: 'https://xinxue.meirixinxue.com/api/v1/assets',
          path: image.path,
          method: 'POST',
          type: image.mime,
          maxRetries: 1,
          field: 'file',
          type: 'multipart',
          headers: {
            'content-type': 'application/octet-stream', // Customize content-type
            token: token,
          },
        };

        Uploader.upload(uploadOptions);
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then(images => {
        this.setState({
          image: null,
          images: images.map(i => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        });
      })
      .catch(e => alert(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  renderVideo(video) {
    console.log('rendering video');
    return (
      <View style={{height: 300, width: 300}}>
        <Video
          source={{uri: video.uri, type: video.mime}}
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          rate={1}
          paused={false}
          volume={1}
          muted={false}
          resizeMode={'cover'}
          onError={e => console.log(e)}
          onLoad={load => console.log(load)}
          repeat={true}
        />
      </View>
    );
  }

  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />;
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  pickVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      cropping: false,
    }).then(image => {
      console.log(image);
      console.log('received image', image);
      this.setState({
        image: {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        },
        images: null,
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.image ? this.renderAsset(this.state.image) : null}
          {this.state.images
            ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>)
            : null}
        </ScrollView>
        <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
          <Text style={styles.text}>上传单张图片1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
          <Text style={styles.text}>照相机拍照</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.pickSingleWithCamera(false, (mediaType = 'video'))}
          style={styles.button}>
          <Text style={styles.text}>照相机拍视频</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.pickVideo(false, (mediaType = 'video'))}
          style={styles.button}>
          <Text style={styles.text}>上传视频</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
          <Text style={styles.text}>拍完后裁剪</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
          <Text style={styles.text}>裁剪最后一张图片</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.pickSingleBase64(false)} style={styles.button}>
          <Text style={styles.text}>返回64位的图片</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
          <Text style={styles.text}>裁剪单张图片</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.pickSingle(true, true)} style={styles.button}>
          <Text style={styles.text}>圆形裁剪</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
          <Text style={styles.text}>选择多张</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={styles.button}>
          <Text style={styles.text}>清除多张图片</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} style={styles.button}>
          <Text style={styles.text}>清除单张图片</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
