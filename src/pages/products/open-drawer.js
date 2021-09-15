import React from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import IconFont from '@/iconfont';

const OpenDrawer = props => {
  const {current, data, onSubmit, onCancel} = props;

  return (
    <View style={[styles.position, styles.drawerWrap]}>
      <Pressable style={[styles.position, styles.drawerOpacity]} onPress={onCancel} />
      <ScrollView style={styles.content}>
        {data.map(item => (
          <Pressable key={item.id} style={styles.item} onPress={() => onSubmit(item)}>
            <Text style={styles.itemtext}>{item.name}</Text>
            {current === item.id && <IconFont name="yixuan" size={16} color="#000" />}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

OpenDrawer.propTypes = {
  current: PropTypes.any,
  data: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  drawerWrap: {
    alignItems: 'flex-end',
  },
  drawerOpacity: {
    backgroundColor: '#000',
    opacity: 0.3,
    elevation: 4,
  },
  content: {
    backgroundColor: '#fff',
    width: '44%',
    zIndex: 1000,
    elevation: 4,
  },
  item: {
    height: 45,
    lineHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 15,
    paddingRight: 10,
  },
  itemtext: {
    fontSize: 14,
  },
});

export default OpenDrawer;
