import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
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

  useEffect(() => {}, []);
  return (
    <>
      {space && (
        <Pressable
          style={styles.spaceWrapper}
          onPress={goSpaceDetail}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <IconFont name="space-point" size={11} color={'#9C9C9C'} />
          <Text style={styles.spaceText}>{space.name}</Text>
        </Pressable>
      )}
      {location && (
        <Pressable
          style={styles.spaceWrapper}
          onPress={goLocationDetail}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <IconFont name="space-point" size={11} color={'#9C9C9C'} />
          <Text style={styles.spaceText}>{location.name.toString().substr(0, 13)}</Text>
        </Pressable>
      )}
    </>
  );
};

export default LocationBar;

const styles = StyleSheet.create({
  spaceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  spaceText: {
    color: '#9C9C9C',
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '400',
  },
});
