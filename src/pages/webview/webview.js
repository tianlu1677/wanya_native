import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

// https://github.com/react-native-community/react-native-webview/blob/master/docs/Guide.md

const WebViewPage = ({route, navigation}) => {
  console.log('route', route);
  const {sourceUrl, title} = route.params;
  navigation.setOptions({title: title || '顽鸦'});
  return (
    <WebView
      originWhitelist={['*']}
      source={{uri: sourceUrl}}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator />}
    />
  );
};

export default WebViewPage;
