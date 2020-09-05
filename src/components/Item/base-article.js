import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, Bottom} from '@/components/Item/single-list-item';

const BaseTopic = props => {
  const {data} = props;
  const navigation = useNavigation();

  return (
    <View style={styles.postSlide}>
      <Header data={data} type="article" />
      <View style={{marginTop: 13, position: 'relative'}}>
        <Image source={{uri: data.cover_url}} style={{width: '100%', height: 167}} />
        <Text style={styles.titleText}>{data.title}</Text>
      </View>
      <Bottom data={data} type="article" />
    </View>
  );
};

const styles = StyleSheet.create({
  postSlide: {
    padding: 14,
    backgroundColor: 'white',
  },
  titleText: {
    position: 'absolute',
    top: 7,
    left: 11,
    right: 11,
    color: 'white',
    fontSize: 16,
    lineHeight: 25,
  },
});

export default BaseTopic;
