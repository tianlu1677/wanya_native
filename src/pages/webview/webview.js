import React, {Component, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

// https://github.com/react-native-community/react-native-webview/blob/master/docs/Guide.md

const WebViewPage = ({route, navigation}) => {
  // console.log('route', route);
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
    });
  }, [navigation]);

  return (
    <WebView
      originWhitelist={['*']}
      source={{uri: sourceUrl}}
      startInLoadingState={true}
      // renderLoading={() => <ActivityIndicator />}
    />
  );
};;

export default WebViewPage;
