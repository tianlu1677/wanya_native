import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal
} from 'react-native';

import {Image} from 'react-native';
import {Card, ListItem, Icon, Button} from 'react-native-elements';
import Video from 'react-native-video'
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [{
  // Simplest usage.
  url: 'http://file.meirixinxue.com/assets/2020/15bf8a6a-0429-4122-8107-0d0d3b724d61.jpeg',

  // width: number
  // height: number
  // Optional, if you know the image size, you can set the optimization performance

  // You can pass props to <Image />.
  props: {
    // headers: ...
  }
}, {
  url: 'http://file.meirixinxue.com/assets/2020/852febda-3dcd-46ee-ab8e-a6cc1322b7c5.jpg',
  props: {
    // Or you can set source directory.
    // source: require('../background.png')
  }
}]

class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false
    };
  }

  render() {
    let videoUrl = 'http://file.meirixinxue.com/assets/a3c6644d8280330ca8724aed3832db78.mp4'
    return <View>
      {/*<Text>VideoDetail</Text>*/}
      <Video source={{uri: videoUrl}}
             ref={(ref) => {
               this.player = ref
             }}
             poster={videoUrl + '?vframe/jpg/offset/0'}
             posterResizeMode={'center'}
             onBuffer={this.onBuffer}
             onError={this.videoError}
             style={styles.backgroundVideo}
             controls
             reportBandwidth
      />

      <Modal visible={this.state.showPreview} transparent={true} onRequestClose={() => this.setState({ showPreview: false })}>
        <ImageViewer
          onShowModal={() => {console.log('xxx', 'onShowModal')}}
          imageUrls={images}
          enableSwipeDown
        />
      </Modal>

      <Button title={'预览图片'} onPress={() => {this.setState({showPreview: true})} }/>
    </View>
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 300,
    width: '100%'

  },
});

export default VideoDetail;