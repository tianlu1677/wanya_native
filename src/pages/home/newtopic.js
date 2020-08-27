import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, NativeModules} from 'react-native';
import ImagePicker from '@/components/ImagePicker';
import {uploadMultiImage} from '@/utils/upload';
import MediasPicker from '@/components/MediasPicker';

const NewTopic = props => {
  const [source, setSource] = useState([]);

  const choose = async () => {
    const res = await props.chooseImage();
    setSource([...source, res]);
    // const res = await uploadMultiImage(img);
  };

  const onImagePicker = () => {
    const res = props.imagePick();
  };

  useEffect(() => {
    console.log(NativeModules);

    return () => {
      // cleanup
    };
  }, []);
  return (
    <View style={styles.wrapper}>
      <View style={styles.mediaCon}>
        <TouchableOpacity onPress={onImagePicker}>
          <Image style={styles.media} source={require('@/assets/images/add-photo.png')} />
        </TouchableOpacity>
        <Image style={styles.media} source={require('@/assets/images/add-video.png')} />
      </View>

      {source.map(v => (
        <Image source={source} style={{width: 200, height: 200, marginRight: 20}} />
      ))}

      <Text onPress={choose}>上传</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
    flex: 1,
  },
  mediaCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  media: {
    width: 71,
    height: 71,
    marginRight: 10,
    marginBottom: 10,
  },
  // uploadImg: {
  //   width: 71,
  //   height: 71,
  // },
});

export default MediasPicker(NewTopic);
