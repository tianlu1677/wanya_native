import React from 'react';
import ImagePicker from 'react-native-image-picker';
import Upload from 'react-native-background-upload';
import Helper from '@/utils/helper';
import SyanImagePicker from 'react-native-syan-image-picker';

const baseUrl =
  process.env.NODE_ENV === 'development' ? 'https://xinxue.meirixinxue.com' : 'https://xinxue.com';

const MediasPicker = WrapperComponent => {
  return props => {
    // const options = {
    //   title: '请选择',
    //   cancelButtonTitle: '取消',
    //   takePhotoButtonTitle: '拍照',
    //   chooseFromLibraryButtonTitle: '从手机相册选择',
    //   storageOptions: {
    //     skipBackup: false,
    //     path: 'images',
    //   },
    //   quality: 1,
    // };

    const upload = async image => {
      const token = await Helper.getData('auth_token');
      const uploadOptions = {
        url: `${baseUrl}/api/v1/assets`,
        method: 'POST',
        maxRetries: 1,
        type: 'multipart',
        field: 'file',
        headers: {
          'content-type': 'application/octet-stream',
          token: token,
        },
        path: image.uri,
      };
      return new Promise((resolve, reject) => {
        Upload.startUpload(uploadOptions)
          .then(uploadId => {
            Upload.addListener('progress', uploadId, data => {
              // store proress
            });
            Upload.addListener('error', uploadId, data => {
              console.log(`Error: ${data.error}%`);
              reject(data.error);
            });
            Upload.addListener('cancelled', uploadId, data => {
              console.log('Cancelled!');
            });
            Upload.addListener('completed', uploadId, data => {
              resolve(JSON.parse(data.responseBody));
            });
          })
          .catch(err => {
            console.log('Upload error!', err);
            reject(err);
          });
      });
    };

    const imagePick = callback => {
      const options = {
        imageCount: 6,
        isCamera: true,
      };
      SyanImagePicker.showImagePicker(options, callback);
    };

    const videoPick = callback => {
      const options = {};
      SyanImagePicker.openVideoPicker(options, callback);
    };

    return <WrapperComponent {...props} imagePick={imagePick} videoPick={videoPick} />;
  };
};

export default MediasPicker;
