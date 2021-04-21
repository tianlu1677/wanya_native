import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {RFValue} from '@/utils/response-fontsize';

const BaseHashtag = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {savetopic} = useSelector(state => state.home);
  const {type, data} = props;

  const goDetail = () => {
    if (type === 'add-hashtag') {
      const topics = {
        ...savetopic,
        plan_content: savetopic.plan_content
          ? `${savetopic.plan_content} #${data.name} `
          : `#${data.name} `,
      };
      dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
      navigation.goBack();
    }

    if (type === 'list') {
      navigation.push('HashtagDetail', {hashtag: data.name});
    }
  };

  return (
    <Pressable style={styles.hashtagWrap} onPress={goDetail}>
      <Text style={styles.hashtagName}>#{data.name}</Text>
      {type === 'add-hashtag' && data.id === 0 && <Text style={styles.newHashTag}>新话题</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  hashtagWrap: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  hashtagName: {
    height: RFValue(45),
    lineHeight: RFValue(45),
    color: '#FF8D00',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
  },
  newHashTag: {
    marginLeft: 'auto',
    marginRight: 15,
    fontSize: 13,
    color: '#bdbdbd',
  },
});

export default BaseHashtag;
