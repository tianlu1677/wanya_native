import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Text, Button} from 'react-native';
import SafeAreaPlus from '@/components/SafeAreaPlus';

const GoNewTopic = ({navigation, route}) => {

  useLayoutEffect(() => {
    navigation.setOptions({

    });
    // navigation.navigate('NewTopic')
  }, [navigation]);

  return (
    <SafeAreaPlus>

    </SafeAreaPlus>
  );
};

export default GoNewTopic;
