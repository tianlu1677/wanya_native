import React from 'react';
import Upload from 'react-native-background-upload';
import Helper from '@/utils/helper';
import SyanImagePicker from 'react-native-syan-image-picker';
import {getUploadFileToken, saveToAsset} from '@/api/settings_api';
import {BaseApiUrl} from '@/utils/config';
import {uploadSystemInfo} from '@/api/settings_api';
import DeviceInfo from 'react-native-device-info';
const baseUrl = BaseApiUrl;

const deviceId = DeviceInfo.getSystemVersion();
const systemName = DeviceInfo.getSystemName();

const MediasPicker = WrapperComponent => {
  return props => {
    const imagePick = (option = {}, callback) => {
      const options = {
        imageCount: 1,
        isCamera: true,
        isRecordSelected: true,
        ...option,
      };
      SyanImagePicker.showImagePicker(options, callback);
    };

    const uploadImage = async file => {
      const token = await Helper.getData('auth_token');
      const path = file.uri.replace('file://', '');
      const uploadOptions = {
        url: `${baseUrl}/api/v1/assets`,
        method: 'POST',
        maxRetries: 1,
        type: 'multipart',
        field: 'file',
        parameters: {
          width: file.width.toString(),
          height: file.height.toString(),
          fsize: file.size.toString(),
          category: 'image',
        },
        headers: {
          'content-type': 'application/octet-stream',
          token: token,
        },
        path: path,
      };
      return new Promise((resolve, reject) => {
        Upload.startUpload(uploadOptions)
          .then(uploadId => {
            Upload.addEventListener('error', uploadId, data => {
              reject(data.error);
            });
            Upload.addEventListener('completed', uploadId, data => {
              resolve(JSON.parse(data.responseBody));
            });
          })
          .catch(err => {
            console.log('errr', err);
            reject(err);
          });
      });
    };

    const uploadAvatar = async file => {
      const token = await Helper.getData('auth_token');
      const path = file.uri.replace('file://', '');
      const uploadOptions = {
        url: `${baseUrl}/api/v1/mine/accounts/${file.account_id}`,
        method: 'POST',
        maxRetries: 1,
        type: file.uploadType,
        quality: 100,
        isGif: true, // 头像更换，背景图上传
        minimumCompressSize: 800,
        field: file.keyParams ? file.keyParams : 'account[avatar]',
        headers: {
          'content-type': 'application/octet-stream',
          token: token,
        },
        path: path,
      };
      return new Promise((resolve, reject) => {
        Upload.startUpload(uploadOptions)
          .then(uploadId => {
            Upload.addEventListener('error', uploadId, data => {
              reject(data.error);
            });
            Upload.addEventListener('completed', uploadId, data => {
              resolve(JSON.parse(data.responseBody));
            });
          })
          .catch(err => {
            reject(err);
          });
      });
    };

    const videoPick = (option = {}, callback) => {
      const options = {videoCount: 1, MaxSecond: 300, MinSecond: 1, ...option};
      SyanImagePicker.openVideoPicker(options, callback);
    };

    const uploadVideo = async (file, cb) => {
      const res = await getUploadFileToken({ftype: 'mp4'});
      const path = file.uri.replace('file://', '');
      let uploadOptions = {
        url: res.qiniu_region,
        path: path,
        method: 'POST',
        type: 'multipart',
        field: 'file',
        parameters: {
          token: res.token,
          key: res.file_key,
          name: 'file',
        },
        maxRetries: 2,
        headers: {
          'content-type': 'application/octet-stream',
        },
        notification: {
          enabled: true,
        },
        useUtf8Charset: true,
      };
      uploadSystemInfo(JSON.stringify(uploadOptions));
      uploadSystemInfo(`OS: ${systemName}, systemVersion: ${deviceId} => ${JSON.stringify(file)}`);
      return new Promise((resolve, reject) => {
        Upload.startUpload(uploadOptions)
          .then(uploadId => {
            Upload.addEventListener('progress', uploadId, data => {
              cb(parseInt(data.progress));
            });
            Upload.addListener('error', uploadId, data => {
              reject(data.error);
            });
            Upload.addEventListener('completed', uploadId, data => {
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
        imagePick={imagePick}
        uploadImage={uploadImage}
        videoPick={videoPick}
        uploadVideo={uploadVideo}
        uploadAvatar={uploadAvatar}
        removeImage={removeImage}
        removeAllPhoto={removeAllPhoto}
      />
    );
  };
};

export default MediasPicker;
