import React, {useLayoutEffect, useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {nodeAction} from '@/redux/actions';
import Loading from '@/components/Loading';
import NodeItem from '@/components/Item/node-item';
import {RFValue} from '@/utils/response-fontsize';
import {styles} from '@/components/NodeIndex';

const NodeIndex = ({navigation}) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const {nodes, followNodes, checkNodes} = useSelector(state => state.node);
  const {categoryList} = useSelector(state => state.home);
  const categories = [{id: 0, name: '我的'}, ...categoryList];
  const [layoutList, setLayoutList] = useState(Array(categoryList.length).fill({y: -1}));
  const [active, setActive] = useState(1);
  const [allNodes, setAllNodes] = useState([]);
  const setLayout = (layout, index) => {
    const list = JSON.parse(JSON.stringify(layoutList));
    list[index] = layout;
    setLayoutList(list);
  };

  const onChange = index => {
    setActive(index);
    scrollRef.current.scrollTo({y: layoutList[index].y, animated: true});
  };

  useEffect(() => {
    dispatch(nodeAction.dispatchUpdateNodes());
    dispatch(nodeAction.dispatchUpdateCheckNodes());
    dispatch(nodeAction.dispatchUpdateFollowNodes(currentAccount.id));
    return () => {
      dispatch(nodeAction.dispatchUpdateHomeNodes(currentAccount.id));
    };
  }, []);

  useEffect(() => {
    if (layoutList.length === categories.length) {
      const allTrue = layoutList.every(item => item.y >= 0);
      if (allTrue) {
        scrollRef.current.scrollTo({y: layoutList[1].y, animated: true});
      }
    }
  }, [layoutList]);

  useEffect(() => {
    const mineNodes = [...checkNodes, ...followNodes];
    const allMineNodes = mineNodes.map(item => {
      return {...item, category_id: 0};
    });
    // setAllNodes([...allMineNodes, ...nodes]);
    setAllNodes(allMineNodes.concat(nodes));
  }, [nodes, followNodes, checkNodes]);

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
        {categories.map((category, index) => (
          <View
            style={styles.nodeContent}
            key={category.id}
            onLayout={e => setLayout(e.nativeEvent.layout, index)}>
            <Text style={styles.cateTitle}>{category.name}</Text>
            <View style={styles.typeNodeWrap}>
              {category.id === 0 &&
                allNodes.filter(v => v.category_id === category.id).length === 0 && (
                  <Text style={nstyles.noNodes}>还没有创建或加入任何圈子哦</Text>
                )}
              {allNodes
                .filter(v => v.category_id === category.id)
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
  noNodes: {
    color: '#bdbdbd',
    fontSize: RFValue(12),
    marginTop: RFValue(25),
    marginBottom: RFValue(25),
    textAlign: 'center',
  },
});

export default NodeIndex;
