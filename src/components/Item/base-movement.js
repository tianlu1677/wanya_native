import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from '@/components/Toast';
import {RFValue} from '@/utils/response-fontsize';
import {JoinButton} from '@/components/NodeComponents';
import {getMovementJoined, getMovementExit} from '@/api/movement_api';

const BaseMovement = props => {
  const navigation = useNavigation();
  const [joined, setJoined] = useState(props.data.joined);
  const {
    type,
    data: {
      id,
      name,
      nickname,
      category_subset_name,
      publish_lessons_count,
      publish_topics_count,
      join_accounts_count,
    },
  } = props;

  const handleJoin = async () => {
    if (joined) {
      await getMovementExit(id);
      Toast.showError('已取消Get');
    } else {
      await getMovementJoined(id);
      Toast.showError('已Get');
    }
    setJoined(!joined);
  };

  const goDetail = () => {
    if (type === 'list') {
      navigation.push('MovementDetail', {movementId: id});
    }
  };

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      <View style={styles.info}>
        <Text style={styles.name}>{name.trim()}</Text>
        <Text style={styles.intro}>
          {nickname ? nickname.substring(0, 12) : name.substring(0, 12)}{' '}
          {category_subset_name ? `· ${category_subset_name}` : ''}{' '}
          {publish_lessons_count ? `· ${publish_lessons_count}个教程` : ''}{' '}
          {publish_topics_count ? `· ${publish_topics_count}个帖子` : ''}{' '}
          {join_accounts_count ? `${join_accounts_count}个顽友已get` : '还没有顽友get这个招'}
        </Text>
      </View>
      <JoinButton
        join={joined}
        text={joined ? '已Get' : 'Get'}
        onPress={handleJoin}
        joinedStyle={{color: '#BDBDBD', backgroundColor: '#fff'}}
        joineStyle={{color: '#000000', backgroundColor: '#fff'}}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: RFValue(66),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    backgroundColor: '#fff',
  },
  info: {
    marginRight: 'auto',
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
  },
  intro: {
    fontSize: 11,
    color: '#BDBDBD',
    lineHeight: 20,
    marginTop: RFValue(5),
  },
});

export default BaseMovement;
