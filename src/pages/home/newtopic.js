import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import ImagePicker from '@/components/ImagePicker';
import {uploadMultiImage} from '@/utils/upload';

const NewTopic = props => {
  const [source, setSource] = useState([]);

  const choose = async () => {
    const res = await props.chooseImage();
    setSource([...source, res]);
    // const res = await uploadMultiImage(img);
  };

  return (
    <View>
      {source.map(v => (
        <Image source={source} style={{width: 200, height: 200, marginRight: 20}} />
      ))}

      <Text onPress={choose}>上传</Text>
    </View>
  );
};

export default ImagePicker(NewTopic);
