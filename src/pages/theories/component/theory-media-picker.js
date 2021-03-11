import React from 'react';
import DeviceInfo from 'react-native-device-info';
import Upload from 'react-native-background-upload';
import SyanImagePicker from 'react-native-syan-image-picker';
import {BaseApiUrl} from '@/utils/config';
import Helper from '@/utils/helper';
import {getUploadFileToken, saveToAsset, uploadSystemInfo} from '@/api/settings_api';

const baseUrl = BaseApiUrl;
const config = {method: 'POST', type: 'multipart', field: 'file'};
const deviceId = DeviceInfo.getSystemVersion();
const systemName = DeviceInfo.getSystemName();

const StepMediaPicker = WrapperComponent => {
  return props => {
    const imagePicker = callback => {
      const options = {imageCount: 1, isCamera: false, isGif: true, isRecordSelected: true};
      SyanImagePicker.showImagePicker(options, callback);
    };

    const uploadImage = async (file, params, cb) => {
      const token = await Helper.getData('auth_token');
      const options = {
        ...config,
        url: `${baseUrl}/api/v1/assets`,
        parameters: {
          width: file.width.toString(),
          height: file.height.toString(),
          fsize: file.size.toString(),
          category: 'image',
          ...params,
        },
        path: file.uri.replace('file://', ''),
        headers: {'content-type': 'application/octet-stream', token: token},
      };

      return new Promise(async (resolve, reject) => {
        Upload.startUpload(options)
          .then(uploadId => {
            Upload.addListener('error', uploadId, data => {
              reject(data.error);
            });
            Upload.addListener('progress', uploadId, data => {
              cb(parseInt(data.progress));
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

    const uploadVideo = async (file, params, cb) => {
      const res = await getUploadFileToken({ftype: 'mp4'});
      let options = {
        ...config,
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
            Upload.addListener('error', uploadId, data => {
              reject(data.error);
            });
            Upload.addListener('progress', uploadId, data => {
              cb(parseInt(data.progress));
            });
            Upload.addListener('completed', uploadId, data => {
              const {key} = JSON.parse(data.responseBody);
              if (key && data.responseCode === 200) {
                const body = {
                  asset: {
                    file_key: key,
                    fname: key,
                    video_m3u8: key.replace('mp4', 'm3u8'),
                    category: 'video',
                    ...params,
                  },
                };
                saveToAsset(body).then(ret => {
                  resolve(ret);
                });
              }
            });
          })
          .catch(err => {
            reject(err);
          });
      });
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
        removeAllPhoto={removeAllPhoto}
      />
    );
  };
};

export default StepMediaPicker;
