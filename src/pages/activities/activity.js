import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActivityList from '@/components/List/activity-list';
import {getActivityList} from '@/api/activity_api';

const Activity = props => {
  const [request] = useState({api: getActivityList});

  return (
    <View>
      <ActivityList request={request} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Activity;
