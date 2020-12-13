import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform, Pressable} from 'react-native';
// import {BlurView, VibrancyView} from '@react-native-community/blur';
import {BlurView, GoBack} from '@/components/NodeComponents';
import TopHeader from '@/components/TopHeader';

const StickTopHeader = props => {
  return (
    <>
      {Platform.OS === 'ios' && (
        <BlurView
          style={{flex: 1}}
          blurType="light"
          blurAmount={40}
        >
          <TopHeader
            statusBar={{barStyle: 'light-content'}}
            LeftButton={props.showLeftButton ? () => <View /> : null}
            Title={() => (
              <Text style={{color: 'white', fontSize: 16, fontWeight: '600', marginTop: 5}}>
                {props.title}
              </Text>
            )}
          />
        </BlurView>
      )}
      {
        Platform.OS !== 'ios' && <TopHeader
          statusBar={{barStyle: 'light-content', translucent: false, backgroundColor: '#000'}}
          headerStyles={{backgroundColor: 'rgba(1,1,1,0.8)'}}
          LeftButton={props.showLeftButton ? () => <View /> : null}
          Title={() => (
            <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
              {props.title}
            </Text>
          )}
        />
      }
    </>
  );
};

export default StickTopHeader;
