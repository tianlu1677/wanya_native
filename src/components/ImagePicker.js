import React from 'react';
import ImagePicker from 'react-native-image-picker';

const ImageChoose = WrappedComponent => {
  return props => {
    const options = {
      title: '请选择',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从手机相册选择',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const chooseImage = () => {
      return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = {uri: response.uri};
            resolve(source);
          }
        });
      });
    };
    return <WrappedComponent {...props} chooseImage={chooseImage} />;
  };
};

export default ImageChoose;
