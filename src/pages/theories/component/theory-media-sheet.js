import React from 'react';
import {Platform} from 'react-native';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {check, RESULTS, PERMISSIONS} from 'react-native-permissions';
import * as action from '@/redux/constants';
import ActionSheet from '@/components/ActionSheet';
import {refreshTheory, refreshTheoryBody} from '@/api/theory_api';

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

  const refreshBody = async () => {
    theory.theory_bodies.map(async body => {
      const data = {
        id: theory.id,
        theory_body_id: body.id,
        theory_body: {title: body.title, desc: body.desc},
      };
      await refreshTheoryBody(theory.id, data);
    });
  };

  const refreshContent = async () => {
    const data = {
      theory: {title: theory.title, plain_content: theory.plain_content, tip: theory.title},
    };
    await refreshTheory(theory.id, data);
  };

  const dispatchTheory = (file, ret, type) => {
    const index = theory.theory_bodies.findIndex(item => item.id.toString() === assetable_id);
    const current = {
      ...theory.theory_bodies[index],
      media: {
        ...file,
        category: type,
        progress: ret,
      },
    };
    theory.theory_bodies[index] = current;
    dispatch({type: action.UPDATE_THEORY, value: {...theory}});
  };

  const actionItems = [
    {
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
              refreshBody();

              const newTheory = {...theory, media: {...file, category: 'image', progress: ret}};
              dispatch({type: action.UPDATE_THEORY, value: newTheory});
            }

            if (assetable_name === 'theory_body_media') {
              refreshContent();

              dispatchTheory(file, ret, 'image');
            }
          });
          props.loadData();
          console.log('upload image result', result);
        });
      },
    },
    {
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
              refreshBody();

              const newTheory = {...theory, media: {...file, category: 'video', progress: ret}};
              dispatch({type: action.UPDATE_THEORY, value: newTheory});
            }

            if (assetable_name === 'theory_body_media') {
              refreshContent();

              dispatchTheory(file, ret, 'video');
            }
          });
          props.loadData();
          console.log('upload video result', result);
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

TheoryMediaSheet.propTypes = {
  showActionSheet: PropTypes.bool.isRequired,
  changeModal: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default TheoryMediaSheet;
