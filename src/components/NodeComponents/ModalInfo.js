import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {RFValue} from '@/utils/response-fontsize';

const ModalInfo = props => {
  const {visible, title = '提示', content = '内容', handleCancel} = props;

  return (
    <Modal
      isVisible={visible}
      transparent={true}
      backdropColor="black"
      backdropOpacity={0.4}
      style={styles.modalView}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.primary} onPress={handleCancel}>
          知道了
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: RFValue(50),
  },
  modalContent: {
    paddingHorizontal: RFValue(40),
    paddingVertical: RFValue(25),
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  content: {
    lineHeight: 20,
    textAlign: 'justify',
    marginVertical: RFValue(20),
  },
  primary: {
    width: '100%',
    lineHeight: 45,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#ff2242',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default ModalInfo;
