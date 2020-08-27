import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Upload from 'react-native-background-upload';

const MediasPicker = WrapperComponent => {
  const login = useSelector(state => state.login);

  return props => {
    const imagePick = () => {
      const options = {
        title: '请选择',
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '选择相册',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      // const token = useSelector
      let uploadOptions = {
        url: 'https://xinxue.meirixinxue.com/api/v1/assets',
        path: image.path,
        method: 'POST',
        maxRetries: 1,
        field: 'file',
        type: 'multipart',
        headers: {
          'content-type': 'application/octet-stream', // Customize content-type
          token: login.auth_token,
        },
      };

      ImagePicker.showImagePicker(options, response => {
        console.log(response);

        // return response;
      });
    };

    return <WrapperComponent {...props} imagePick={imagePick} />;
  };
};

export default MediasPicker;
