import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MovementList from '@/components/List/movement-list';
import {getMovements} from '@/api/movement_api';

const Movement = props => {
  const [request] = useState({api: getMovements});

  return (
    <View>
      <MovementList request={request} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Movement;
