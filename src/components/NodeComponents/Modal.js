import React from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';

export const Loading = (option = {}) => {
  return (
    <Modal isVisible={true}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
        {option.title && <Text style={{color: '#fff', marginTop: 10}}>{option.title}</Text>}
      </View>
    </Modal>
  );
};
