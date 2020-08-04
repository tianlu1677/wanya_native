import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Navigation from './src/navigator/index'

import {Image} from 'react-native';
import {Card, ListItem, Icon, Button} from 'react-native-elements';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Navigation />
      </>
    );
  }
}

export default App;
