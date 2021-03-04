import React from 'react';
import DeviceInfo from 'react-native-device-info';
import Upload from 'react-native-background-upload';
import SyanImagePicker from 'react-native-syan-image-picker';
import {BaseApiUrl} from '@/utils/config';
import Helper from '@/utils/helper';
import {uploadSystemInfo} from '@/api/settings_api';
import {getUploadFileToken, saveToAsset} from '@/api/settings_api';

const baseUrl = BaseApiUrl;

const deviceId = DeviceInfo.getSystemVersion();
const systemName = DeviceInfo.getSystemName();

const defaultOptions = {method: 'POST', type: 'multipart', field: 'file'};

const StepMediaPicker = WrapperComponent => {
  return props => {
    const imagePicker = callback => {
      const options = {imageCount: 1, isCamera: false, isRecordSelected: true};
      SyanImagePicker.showImagePicker(options, callback);
    };

    const uploadImage = async file => {
      const token = await Helper.getData('auth_token');
      const options = {
        ...defaultOptions,
        url: `${baseUrl}/api/v1/assets`,
        parameters: {
          width: file.width.toString(),
          height: file.height.toString(),
          fsize: file.size.toString(),
          category: 'image',
        },
        path: file.uri.replace('file://', ''),
        headers: {'content-type': 'application/octet-stream', token: token},
      };

      console.log(options);
      return new Promise(async (resolve, reject) => {
        Upload.startUpload(options)
          .then(uploadId => {
            Upload.addListener('error', uploadId, data => {
              reject(data.error);
            });
            Upload.addListener('completed', uploadId, data => {
              resolve(JSON.parse(data.responseBody));
            });
          })
          .catch(err => {
            reject(err);
          });
      });
    };

    const videoPicker = callback => {
      const options = {MaxSecond: 300, videoCount: 1};
      SyanImagePicker.openVideoPicker(options, callback);
    };

    const uploadVideo = async (file, cb) => {
      const res = await getUploadFileToken({ftype: 'mp4'});
      let options = {
        ...defaultOptions,
        url: res.qiniu_region,
        path: file.uri.replace('file://', ''),
        parameters: {token: res.token, key: res.file_key, name: 'file'},
        notification: {enabled: true},
        useUtf8Charset: true,
      };
      uploadSystemInfo(JSON.stringify(options));
      uploadSystemInfo(`OS: ${systemName}, systemVersion: ${deviceId} => ${JSON.stringify(file)}`);
      return new Promise((resolve, reject) => {
        Upload.startUpload(options)
          .then(uploadId => {
            Upload.addListener('progress', uploadId, data => {
              cb(parseInt(data.progress));
            });
            Upload.addListener('error', uploadId, data => {
              reject(data.error);
            });
            Upload.addListener('completed', uploadId, data => {
              uploadSystemInfo(JSON.stringify(data));
              let upload_res = JSON.parse(data.responseBody);
              if (upload_res.key && data.responseCode === 200) {
                const body = {
                  asset: {
                    file_key: upload_res.key,
                    fname: upload_res.key,
                    category: 'video',
                    video_m3u8: upload_res.key.replace('mp4', 'm3u8'),
                  },
                };
                saveToAsset(body).then(ret => {
                  resolve(ret);
                });
              }
            });
          })
          .catch(err => {
            console.log('error', err);
            reject(err);
          });
      });
    };

    const removeImage = index => {
      SyanImagePicker.removePhotoAtIndex(index);
    };

    const removeAllPhoto = () => {
      SyanImagePicker.removeAllPhoto();
    };

    return (
      <WrapperComponent
        {...props}
        imagePicker={imagePicker}
        uploadImage={uploadImage}
        videoPicker={videoPicker}
        uploadVideo={uploadVideo}
        removeImage={removeImage}
        removeAllPhoto={removeAllPhoto}
      />
    );
  };
};

export default StepMediaPicker;
