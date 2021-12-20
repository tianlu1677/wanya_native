import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImg from '@/components/FastImg';
import {SCREEN_WIDTH} from '@/utils/navbar';

const SpaceImageInfo = ({navigation, route}) => {
  const {medias} = route.params;

  return (
    <View style={styles.imageInfo}>
      {medias.map((item, index) => (
        <FastImg
          source={{uri: item}}
          style={{...styles.image, marginRight: index % 2 === 0 ? 10 : 0}}
          mode="cover"
        />
      ))}
    </View>
  );
};

const width = (SCREEN_WIDTH - 28 - 10) / 2;
const styles = StyleSheet.create({
  imageInfo: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: width,
    height: width,
    backgroundColor: 'pink',
    marginBottom: 10,
  },
});

export default SpaceImageInfo;
