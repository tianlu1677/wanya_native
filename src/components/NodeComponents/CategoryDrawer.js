import React from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import IconFont from '@/iconfont';

const CategoryDrawer = props => {
  const {currentId, onSubmit, onCancel} = props;
  const categories = useSelector(state => state.home.categoryList);

  return (
    <View style={[dstyles.position, dstyles.drawerWrap]}>
      <Pressable style={[dstyles.position, dstyles.drawerOpacity]} onPress={onCancel} />
      <ScrollView style={dstyles.content}>
        {categories.map(item => (
          <Pressable key={item.id} style={dstyles.item} onPress={() => onSubmit(item)}>
            <Text style={dstyles.itemtext}>{item.name}</Text>
            {currentId === item.id && <IconFont name={'yixuan'} size={16} color={'#000'} />}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

CategoryDrawer.propTypes = {
  currentId: PropTypes.string.required || PropTypes.string.number,
  onSubmit: PropTypes.func.required,
  onCancel: PropTypes.func.required,
};

const dstyles = StyleSheet.create({
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

export default CategoryDrawer;
