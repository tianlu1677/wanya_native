import React from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {check, RESULTS, PERMISSIONS} from 'react-native-permissions';
import * as action from '@/redux/constants';
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
  const dispatch = useDispatch();
  const {theory} = useSelector(state => state.theory);
  const {params, showActionSheet, changeModal} = props;

  const {assetable_name, assetable_id} = params;

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
          const file = res[0];
          const result = await props.uploadImage(file, params, ret => {
            if (assetable_name === 'theory_media') {
              const newTheory = {...theory, media: {...file, category: 'image', progress: ret}};
              dispatch({type: action.UPDATE_THEORY, value: newTheory});
            }

            if (assetable_name === 'theory_body_media') {
              // const bodyMedia = {media: {...file, category: 'image', progress: ret}};
              // theory.theory_bodies[assetable_id] = bodyMedia;
              // const newBodies = theory.theory_bodies;
              // dispatch({
              //   type: action.UPDATE_THEORY,
              //   value: {...theory, newBodies},
              // });

              const index = theory.theory_bodies.findIndex(item => item.id === assetable_id);
              const current = {...file, category: 'video', progress: ret};
              theory.theory_bodies[index] = current;
              dispatch({type: action.UPDATE_THEORY, value: {...theory}});
            }
          });
          props.loadData();
          console.log('result', result);
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
          const file = res[0];

          const result = await props.uploadVideo(file, params, ret => {
            if (assetable_name === 'theory_media') {
              const newTheory = {...theory, media: {...file, category: 'video', progress: ret}};
              dispatch({type: action.UPDATE_THEORY, value: newTheory});
            }

            if (assetable_name === 'theory_body_media') {
              const bodyMedia = {media: {...file, category: 'video', progress: ret}};
              theory.theory_bodies[assetable_id] = bodyMedia;
              const newBodies = theory.theory_bodies;
              dispatch({
                type: action.UPDATE_THEORY,
                value: {...theory, newBodies},
              });
            }
          });
          console.log('result', result);
          props.loadData();
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
