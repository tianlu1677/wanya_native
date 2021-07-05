import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from '@/utils/response-fontsize';
import {getAccountBaseInfo} from '@/api/account_api';

export const PlainContent = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goHashTagDetail = name => {
    navigation.push('HashtagDetail', {hashtag: name.replace('#', '')});
  };

  const goAccountDetail = async nickname => {
    const res = await getAccountBaseInfo({name: nickname.replace('@', '')});
    navigation.push('AccountDetail', {accountId: res.data.account.id});
  };

  return (
    <Text numberOfLines={props.numberOfLines} style={[cstyles.plainWrap, props.style]}>
      {data.hashtag_content_json ? (
        data.hashtag_content_json.map((v, index) => {
          return (
            <Text key={index}>
              {v.is_hashtag && (
                <Text style={cstyles.hashtagText} onPress={() => goHashTagDetail(v.content)}>
                  {v.content}&nbsp;
                </Text>
              )}
              {v.is_mention && (
                <Text style={cstyles.hashtagText} onPress={() => goAccountDetail(v.content)}>
                  {v.content}&nbsp;
                </Text>
              )}
              {!v.is_hashtag && !v.is_mention && <Text space="nbsp">{v.content} </Text>}
            </Text>
          );
        })
      ) : (
        <Text>{data.plain_content}</Text>
      )}
    </Text>
  );
};

const cstyles = StyleSheet.create({
  plainWrap: {
    fontSize: 14,
    lineHeight: RFValue(21),
    color: '#3c3c3c',
    letterSpacing: 0.5,
    textAlign: 'justify',
  },
  hashtagText: {
    color: '#1B5C79',
    marginRight: 3,
  },
});

export default PlainContent;
