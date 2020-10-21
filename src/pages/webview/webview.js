import React, {Component, useEffect} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import BackImg from '@/assets/images/back.png'
import BackWhiteImg from '@/assets/images/back-white.png'
// https://github.com/react-native-community/react-native-webview/blob/master/docs/Guide.md

const WebViewPage = ({route, navigation}) => {
  console.log('route', route);
  const {sourceUrl, title, bgColor} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: title || '顽鸦',
      headerTintColor: (bgColor === 'black' ? 'white' : 'black'),
      headerStyle: {
        backgroundColor: (bgColor === 'black' ? 'black' : 'white'),
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },

      headerBackImage: () => (<Image source={bgColor === 'black' ? BackWhiteImg : BackImg} style={{width: 9, height: 15}} />)
    });
  }, [navigation, route]);

  return (
    <WebView
      originWhitelist={['*']}
      source={{uri: sourceUrl}}
      startInLoadingState={false}
      // renderLoading={() => <ActivityIndicator />}
    />
  );
};;

export default WebViewPage;
