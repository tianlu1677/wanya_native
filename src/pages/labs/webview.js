import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Platform,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Share from "react-native-share";
import { WebView } from 'react-native-webview';


import Helper from "@/utils/helper";

// https://github.com/react-native-community/react-native-webview/blob/master/docs/Guide.md
class Webview extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return <WebView 
      originWhitelist={['*']}
      source={{ uri: 'https://meirixinxue.com/' }} />;
  }
}

export default Webview;