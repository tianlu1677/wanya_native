import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import 'react-native-gesture-handler';

import Recommend from '../pages/home/Recommend'
import VideoDetail from '../pages/home/VideoDetail'
//
import Mine from '../pages/mine/mine'
import Notify from '../pages/mine/notify'
import NodeDetail from '../pages/nodes/node-detail'
import NodeIndex from '../pages/nodes/node-index'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

function HomeTabList() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recommend" component={Recommend} />
      <Tab.Screen name="Notify" component={Notify} />
      <Tab.Screen name="Mine" component={Mine} />
    </Tab.Navigator>
  )
}

function MainStackList() {
  return (
    <MainStack.Navigator>
      <MainStack.Scrreen name="NodeDetail" component={NodeDetail} />
      <MainStack.Scrreen name="NodeIndex" component={NodeIndex} />
    </MainStack.Navigator>
  )
}


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Recommend">
        <Stack.Screen name="Recommend" component={HomeTabList} />

        <Stack.Screen name="NodeDetail" component={NodeDetail} />
        <Stack.Screen name="NodeIndex" component={NodeIndex} />
        <Stack.Screen name="VideoDetail" component={VideoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// export default Navigation;