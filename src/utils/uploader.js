import Upload from 'react-native-background-upload';
import Helper from './helper';

export default class Uploader {
  static async upload(options = {}) {
    // const token = await Helper.getData('auth_token');
    let defaultOptions = {
      url: 'https://myservice.com/path/to/post',
      path: 'file://path/to/file/on/device',
      method: 'POST',
      type: 'raw',
      maxRetries: 2, // set retry count (Android only). Default 2
      headers: {
        'content-type': 'application/octet-stream', // Customize content-type
      },

      // Below are options only supported on Android
      notification: {
        enabled: true,
      },
      useUtf8Charset: true,
    };
    let uploadOptions = {...defaultOptions, ...options};

    console.log('uploadOptions', uploadOptions);
    Upload.startUpload(uploadOptions)
      .then(uploadId => {
        console.log('Upload started');
        Upload.addListener('progress', uploadId, data => {
          // console.log(`Progress: ${data.progress}%`);
        });
        Upload.addListener('error', uploadId, data => {
          console.log(`Error: ${data.error}%`);
        });
        Upload.addListener('cancelled', uploadId, data => {
          console.log('Cancelled!');
        });
        Upload.addListener('completed', uploadId, data => {
          // data includes responseCode: number and responseBody: Object
          console.log('Completed!');
          console.log(data);
        });
      })
      .catch(err => {
        console.log('Upload error!', err);
      });
  }
}

// https://github.com/Vydia/react-native-background-upload
