import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
// import {BlurView, VibrancyView} from '@react-native-community/blur';
import {BlurView} from '@/components/NodeComponents';
import TopHeader from '@/components/TopHeader';

const StickTopHeader = props => {
  return (
    <BlurView
      style={{flex: 1, zIndex: 100}}
      // blurType="light"
      // blurAmount={40}
    >
      <TopHeader
        headerStyles={{backgroundColor: 'rgba(1,1,1,0.8)'}}
        LeftButton={props.showLeftButton ? () => <View /> : null }
        Title={() => (
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600', marginTop: 5}}>{props.title}</Text>
        )}
      />
    </BlurView>
  );
};

export default StickTopHeader;
