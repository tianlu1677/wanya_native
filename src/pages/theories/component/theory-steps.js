import React, {useState} from 'react';
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import TheoryMedia from './theory-media.js';
import TheoryMediaSheet, {checkPermission} from './theory-media-sheet';
import {refreshTheoryBody} from '@/api/theory_api';
import * as action from '@/redux/constants';
const defaultProps = {
  autoCorrect: false,
  autoComplete: false,
  caretHidden: false,
  selectionColor: '#ff193a',
  placeholderTextColor: '#9F9F9F',
};

const TheorySteps = props => {
  const dispatch = useDispatch();
  const {theory} = useSelector(state => state.theory);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [step, setStep] = useState(1);

  const onMediaPicker = async id => {
    setStep(id);
    const hasPermission = await checkPermission();
    if (hasPermission) {
      setShowActionSheet(true);
    }
  };

  const updateTheoryText = async id => {
    const current = theory.theory_bodies.find(item => item.id === id);
    const {title, desc} = current;
    const data = {id: theory.id, theory_body_id: id, theory_body: {title, desc}};
    await refreshTheoryBody(theory.id, data);
    props.loadData();
  };

  const updateTheory = async (value, attr, id) => {
    const index = theory.theory_bodies.findIndex(item => item.id === id);
    const current = {...theory.theory_bodies[index], [attr]: value};
    theory.theory_bodies[index] = current;
    dispatch({type: action.UPDATE_THEORY, value: {...theory}});
  };

  return (
    <>
      {(theory.theory_bodies || []).map((item, index) => {
        return (
          <View style={styles.wrapper} key={index}>
            <View style={styles.titleWrap}>
              <Text style={styles.titleText}>第{item.position}步</Text>
              <TextInput
                {...defaultProps}
                maxLength={30}
                style={styles.titleInput}
                value={item.title}
                onBlur={() => updateTheoryText(item.id)}
                onChangeText={value => updateTheory(value, 'title', item.id)}
              />
            </View>

            {item.media ? (
              <View style={{marginTop: RFValue(10)}}>
                <TheoryMedia
                  media={item.media}
                  type="theory_body_media"
                  loadData={props.loadData}
                  showDetele={true}
                />
              </View>
            ) : (
              <Pressable style={styles.mediaWrap} onPress={() => onMediaPicker(item.id)}>
                <IconFont name={'shangchuan'} size={18} color="#9F9F9F" />
                <Text style={styles.mediaText}>上传步骤图/视频/GIF</Text>
              </Pressable>
            )}

            <TextInput
              {...defaultProps}
              multiline
              maxLength={200}
              placeholder="步骤描述越详细越好"
              style={styles.stepIntro}
              value={item.desc}
              onBlur={() => updateTheoryText(item.id)}
              onChangeText={value => updateTheory(value, 'desc', item.id)}
            />
          </View>
        );
      })}

      <TheoryMediaSheet
        {...props}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
        params={{
          assetable_type: 'TheoryBody',
          assetable_id: step,
          assetable_name: 'theory_body_media',
        }}
        loadData={props.loadData}
      />
    </>
  );
};

TheorySteps.propTypes = {
  loadData: PropTypes.func.isRequired, //更新
};

const greyColor = {backgroundColor: '#fafafa'};
const blackText = {fontWeight: '500', fontSize: 16, color: '#000'};
const greyText = {fontWeight: '300', fontSize: 14, color: '#9F9F9F'};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: RFValue(25),
  },
  titleWrap: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 5,
    ...greyColor,
  },
  titleText: {
    height: RFValue(45),
    lineHeight: RFValue(45),
    ...blackText,
    ...greyColor,
  },
  titleInput: {
    flex: 1,
    marginLeft: 10,
    ...blackText,
  },
  mediaWrap: {
    height: RFValue(120),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: RFValue(10),
    ...greyColor,
  },
  mediaText: {
    marginLeft: 5,
    ...greyText,
  },
  stepIntro: {
    minHeight: RFValue(45),
    lineHeight: 20,
    paddingHorizontal: RFValue(15),
    paddingTop: RFValue(5),
    paddingBottom: RFValue(10),
    borderRadius: 5,
    marginTop: RFValue(10),
    ...greyText,
    ...greyColor,
  },
});

export default TheorySteps;
