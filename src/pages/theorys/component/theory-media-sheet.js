import React, {useState} from 'react';
import {Platform} from 'react-native';
import {check, RESULTS, PERMISSIONS} from 'react-native-permissions';
import ActionSheet from '@/components/ActionSheet';

const imagePermission =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.CAMERA;

export const checkPermission = async props => {
  const status = await check(imagePermission);
  if ([RESULTS.GRANTED, RESULTS.DENIED].includes(status)) {
    return true;
  }

  if (status === RESULTS.BLOCKED) {
    return false;
  }
};

const TheoryMediaSheet = props => {
  const {params, showActionSheet, changeModal} = props;

  const actionItems = [
    {
      id: 1,
      label: '照片',
      onPress: async () => {
        props.removeAllPhoto();
        props.imagePicker(async (err, res) => {
          if (err) {
            return;
          }
          console.log(res);
          const result = await props.uploadImage(res[0], params);
          console.log(result.asset);
          props.loadData();
          // const result = {
          //   assetable_id: 2,
          //   assetable_name: 'theory_media',
          //   assetable_type: 'Theory',
          //   category: 'image',
          //   fname: 'DC94983B-FAA2-4553-AA7F-FE56FD6005D9IMG_7979.jpg',
          //   fsize: 168942,
          //   ftype: 'image/jpeg',
          //   height: 1102,
          //   id: 3713,
          //   m3u8_video_url: '',
          //   original_url:
          //     'http://xinxuefile.meirixinxue.com/assets/2021/9bae3ef5-4e8d-4419-93be-4c4df04c13ec.jpg',
          //   url:
          //     'http://xinxuefile.meirixinxue.com/assets/2021/9bae3ef5-4e8d-4419-93be-4c4df04c13ec.jpg',
          //   video_cover_url: '',
          //   video_url: '',
          //   width: 826,
          // };
        });
      },
    },
    {
      id: 2,
      label: '视频',
      onPress: async () => {
        props.removeAllPhoto();
        props.videoPicker(async (err, res) => {
          if (err) {
            return;
          }
          console.log(JSON.stringify(res));
          console.log('params', params);
          const result = await props.uploadVideo(res[0], params);
          console.log(result);
        });
      },
    },
  ];

  return (
    <ActionSheet
      actionItems={actionItems}
      showActionSheet={showActionSheet}
      changeModal={changeModal}
    />
  );
};

export default TheoryMediaSheet;
