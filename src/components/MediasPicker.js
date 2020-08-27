import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Upload from 'react-native-background-upload';
import Helper from '@/utils/helper';

const baseUrl =
  process.env === 'development' ? 'https://xinxue.meirixinxue.com' : 'https://xinxue.com';

const upload = async image => {
  const token = await Helper.getData('auth_token');
  const options = {
    url: `${baseUrl}/api/v1/assets`,
    method: 'POST',
    maxRetries: 1,
    type: 'multipart',
    headers: {
      'content-type': 'application/octet-stream',
      token: token.auth_token,
    },
    path: image.path,
  };
  Upload.startUpload(options)
    .then(uploadId => {
      console.log('Upload started');
      Upload.addListener('progress', uploadId, data => {
        console.log(`Progress: ${data.progress}%`);
      });
      Upload.addListener('error', uploadId, data => {
        console.log(`Error: ${data.error}%`);
      });
      Upload.addListener('cancelled', uploadId, data => {
        console.log('Cancelled!');
      });
      Upload.addListener('completed', uploadId, data => {
        console.log('Completed!');
      });
    })
    .catch(err => {
      console.log('Upload error!', err);
    });
  console.log(token);
};

const MediasPicker = WrapperComponent => {
  return props => {
    const imagePick = () => {
      return new Promise((resolve, reject) => {
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
        ImagePicker.showImagePicker(async (options, response) => {
          let res = await upload(response);
          console.log(res);
          resolve(res);
        });
      });
    };

    return <WrapperComponent {...props} imagePick={imagePick} />;
  };
};

export default MediasPicker;
