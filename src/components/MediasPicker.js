import React from 'react';
import {View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Upload from 'react-native-background-upload';
import Helper from '@/utils/helper';
import SyanImagePicker from 'react-native-syan-image-picker';

const baseUrl =
  process.env.NODE_ENV === 'development' ? 'https://xinxue.meirixinxue.com' : 'https://xinxue.com';

const MediasPicker = WrapperComponent => {
  return props => {
    const upload = async file => {
      const token = await Helper.getData('auth_token');
      const uploadOptions = {
        url: `${baseUrl}/api/v1/assets`,
        method: 'POST',
        maxRetries: 1,
        type: file.uploadType,
        field: 'file',
        headers: {
          'content-type': 'application/octet-stream',
          token: token,
        },
        path: file.uri,
      };
      return new Promise((resolve, reject) => {
        Upload.startUpload(uploadOptions)
          .then(uploadId => {
            Upload.addListener('progress', uploadId, data => {
              // store proress
              console.log(data.progress);
            });
            Upload.addListener('error', uploadId, data => {
              console.log(`Error: ${data.error}%`);
              reject(data.error);
            });
            Upload.addListener('cancelled', uploadId, data => {
              console.log('Cancelled!');
            });
            Upload.addListener('completed', uploadId, data => {
              console.log(data);

              resolve(JSON.parse(data.responseBody));
            });
          })
          .catch(err => {
            console.log('Upload error!', err);
            reject(err);
          });
      });
    };

    const imagePick = (option = {}, callback) => {
      const options = {
        imageCount: 1,
        isCamera: true,
        isRecordSelected: true,
        ...option,
      };
      SyanImagePicker.showImagePicker(options, callback);
    };

    const videoPick = (option = {}, callback) => {
      const options = {...option};
      SyanImagePicker.openVideoPicker(options, callback);
    };

    return (
      <WrapperComponent {...props} imagePick={imagePick} videoPick={videoPick} upload={upload} />
    );
  };
};

export default MediasPicker;
