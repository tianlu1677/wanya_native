import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconFont from '@/iconfont';

const LocationBar = ({space, location}) => {
  const navigation = useNavigation();

  const goSpaceDetail = () => {
    navigation.push('SpaceDetail', {spaceId: space.id});
  };

  const goLocationDetail = () => {
    navigation.push('LocationDetail', {locationId: location.id});
  };

  const hitSlop = {left: 10, right: 10, top: 10, bottom: 10};
  return (
    <>
      {space && (
        <Pressable style={styles.wrapper} onPress={goSpaceDetail} hitSlop={hitSlop}>
          <IconFont name="space-point" size={11} color={'#1B5C79'} />
          <Text style={styles.text}>{space.name}</Text>
        </Pressable>
      )}
      {location && (
        <Pressable style={styles.wrapper} onPress={goLocationDetail} hitSlop={hitSlop}>
          <IconFont name="space-point" size={11} color={'#1B5C79'} />
          <Text style={styles.text}>{location.name.toString().substr(0, 13)}</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  text: {
    color: '#1B5C79',
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '400',
  },
});

export default LocationBar;
