import React, {useLayoutEffect, useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {nodeAction} from '@/redux/actions';
import Loading from '@/components/Loading';
import NodeItem from '@/components/Item/node-item';
import {styles} from '@/components/NodeIndex';

const NodeIndex = ({navigation}) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const {nodes, followNodes, checkNodes} = useSelector(state => state.node);
  const {categoryList} = useSelector(state => state.home);
  const categories = [{id: 0, name: '我的'}, ...categoryList];
  const [layoutList, setLayoutList] = useState([]);
  const [active, setActive] = useState(0);
  const [allNodes, setAllNodes] = useState([]);

  const setLayout = (layout, index) => {
    layoutList[index] = layout;
    const list = JSON.parse(JSON.stringify(layoutList));
    setLayoutList(list);
  };

  const onChange = index => {
    setActive(index);
    scrollRef.current.scrollTo({y: layoutList[index].y, animated: true});
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.push('CreateNodeIntro');
          }}>
          <Text style={nstyles.cancel}>创建圈子</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(nodeAction.dispatchUpdateNodes());
    dispatch(nodeAction.dispatchUpdateCheckNodes());
    dispatch(nodeAction.dispatchUpdateFollowNodes(currentAccount.id));
    return () => {
      dispatch(nodeAction.dispatchUpdateHomeNodes(currentAccount.id));
    };
  }, []);

  useEffect(() => {
    const mineNodes = [...checkNodes, ...followNodes];
    const allMineNodes = mineNodes.map(item => {
      const node = {...item, category_id: 0};
      return node;
    });
    setAllNodes([...allMineNodes, ...nodes]);
  }, [nodes, followNodes, checkNodes]);

  // console.log(allNodes);
  return allNodes.length > 0 ? (
    <View style={styles.wrapper}>
      <View style={styles.cateWrap}>
        {categories.map((categorie, index) => (
          <Pressable
            key={index}
            onPress={() => onChange(index)}
            style={[styles.cateNameWrap, active === index && styles.cateNameActive]}>
            <Text style={styles.cateName}>{categorie.name}</Text>
            {active === index && <Text style={styles.active} />}
          </Pressable>
        ))}
      </View>
      <ScrollView ref={scrollRef} style={styles.nodeListWrap}>
        {categories.map((categorie, index) => (
          <View
            style={styles.nodeContent}
            key={categorie.id}
            onLayout={e => setLayout(e.nativeEvent.layout, index)}>
            <Text style={styles.cateTitle}>{categorie.name}</Text>
            <View style={styles.typeNodeWrap}>
              {allNodes
                .filter(v => v.category_id === categorie.id)
                .map((node, i) => (
                  <View key={i}>
                    <NodeItem
                      node={{...node}}
                      key={node.id}
                      type={node.audit_status ? 'node-index-mine' : 'node-index'}
                    />
                    <Text style={styles.separator} />
                  </View>
                ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  ) : (
    <Loading />
  );
};

const nstyles = StyleSheet.create({
  cancel: {
    textAlign: 'center',
    fontSize: 15,
    color: '#bdbdbd',
  },
});

export default NodeIndex;
