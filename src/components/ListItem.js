import React from "react";
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Button, ListItem } from 'react-native-elements'

const ListItemIndex = (props) => {
  return (
    <View style={[styles.wrapper, props.containStyles]}>
      <View>
        <Text>1</Text>
      </View>
      <View>
        <Text>2</Text>
      </View>

      <View>
        <Text>3</Text>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    alignItems: 'center'
  }
});

export default ListItemIndex;