import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {nodeAction} from '@/redux/actions';
import FastImg from '@/components/FastImg';
import {AllNodeImg} from '@/utils/default-image';

const NodeScrollView = props => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const {homeNodes} = useSelector(state => state.node);

  useFocusEffect(
    useCallback(() => {
      dispatch(nodeAction.dispatchUpdateHomeNodes(currentAccount.id));
    }, [])
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.nodeView}>
      <Pressable style={styles.nodeWrap} onPress={() => props.navigation.push('NodeIndex')}>
        <FastImg style={styles.nodeImg} source={{uri: AllNodeImg}} />
        <Text style={styles.nodeName} minimumFontScale={1} numberOfLines={1}>
          全部圈子
        </Text>
      </Pressable>
      {homeNodes.length > 0 &&
        homeNodes.map(node => {
          return (
            <Pressable
              key={node.id}
              style={styles.nodeWrap}
              onPress={() => props.navigation.push('NodeDetail', {nodeId: node.id})}>
              <View style={{position: 'relative'}}>
                <FastImg style={styles.nodeImg} source={{uri: node.cover_url}} />
                {node.role === 'super_admin' && <Text style={styles.nodeSelf}>圈主</Text>}
              </View>
              <Text
                style={styles.nodeName}
                adjustsFontSizeToFit={false}
                minimumFontScale={1}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {node.name}
              </Text>
            </Pressable>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  nodeView: {
    backgroundColor: '#fff',
    paddingLeft: 14,
    paddingTop: 12,
    paddingBottom: 7,
    marginBottom: 9,
  },
  nodeWrap: {
    width: 56,
    marginRight: 15,
  },
  nodeImg: {
    width: 56,
    height: 56,
  },
  nodeName: {
    fontSize: 11,
    marginTop: 5,
    width: 60,
    maxHeight: 18,
    minHeight: 16,
    height: 18,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '300',
  },
  nodeSelf: {
    width: 34,
    height: 18,
    lineHeight: 18,
    textAlign: 'center',
    borderRadius: 9,
    overflow: 'hidden',
    backgroundColor: '#000',
    opacity: 0.7,
    color: '#FFFF00',
    fontSize: 10,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -17,
  },
});

export default NodeScrollView;
