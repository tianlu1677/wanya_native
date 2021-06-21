import React, {useState} from 'react';
import {StyleSheet, View, Pressable, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {BarHeight, IsIos} from '@/utils/navbar';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import Search from '@/components/NodeComponents/Search';
import {BadgeMessage} from '@/components/NodeComponents';

const RecommendSearch = () => {
  const navigation = useNavigation();
  const [inputRef, setinputRef] = useState(null);
  const {currentAccount, currentBaseInfo} = useSelector(state => state.account);

  const UnreadMessageCount = () => {
    if (!currentBaseInfo || currentBaseInfo.new_message_count === 0) {
      return 0;
    }
    return currentBaseInfo.new_message_count;
  };

  return (
    <>
      <View style={{height: IsIos ? BarHeight : 0, backgroundColor: '#fff'}} />
      <StatusBar barStyle="dark-content" translucent={false} />
      <Search
        getRef={refs => setinputRef(refs)}
        style={{backgroundColor: '#fff', paddingRight: 14, paddingBottom: 0}}
        inputStyle={{borderRadius: RFValue(18), backgroundColor: '#f2f3f5'}}
        height={RFValue(36)}
        placeholderTextColor="#aaa"
        placeholder="搜索顽法、帖子、文章、圈子等内容"
        cancel={false}
        onFocus={() => {
          inputRef.blur();
          navigation.push('SearchIndex');
        }}
        prefix={
          <Pressable onPress={() => navigation.openDrawer()} style={styles.avatorWrap}>
            <BadgeMessage
              size={'middle'}
              value={UnreadMessageCount()}
              containerStyle={[
                styles.badge,
                {
                  right:
                    UnreadMessageCount() >= 1 && UnreadMessageCount() < 10
                      ? -VWValue(-4)
                      : UnreadMessageCount() > 99
                      ? -VWValue(4) * 1.75
                      : -VWValue(1) * 1.45,
                },
              ]}
            />
            <FastImg style={styles.avator} source={{uri: currentAccount.avatar_url}} />
          </Pressable>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  avatorWrap: {
    position: 'relative',
    zIndex: 2,
  },
  avator: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
    marginRight: 14,
  },
  badge: {
    position: 'absolute',
    top: -5,
    zIndex: 1,
  },
});

export default RecommendSearch;
