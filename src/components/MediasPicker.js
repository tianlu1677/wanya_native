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

    const imagePick = (option, callback) => {
      const options = {
        imageCount: 1,
        isCamera: true,
        isRecordSelected: true,
        ...option,
      };
      SyanImagePicker.showImagePicker(options, callback);
    };

    const videoPick = callback => {
      const options = {};
      SyanImagePicker.openVideoPicker(options, callback);
    };

    return (
      <View>
        <WrapperComponent {...props} imagePick={imagePick} videoPick={videoPick} upload={upload} />
      </View>
    );
  };
};

export default MediasPicker;
