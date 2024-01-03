import React, {useEffect, useState, useRef, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {nodeAction, dispatchFetchCategoryList} from '@/redux/actions';
import Loading from '@/components/Loading';
import BaseNode from '@/components/Item/base-node';
import {RFValue} from '@/utils/response-fontsize';
import {styles} from '@/components/NodeIndex';

const NodeIndex = props => {
  const showAll = props.showAll ? true : false;
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const {nodes, followNodes, checkNodes} = useSelector(state => state.node);
  const {categoryList} = useSelector(state => state.home);
  const categories = props.showAll ? categoryList : [{id: 0, name: '我的'}, ...categoryList];
  const [layoutList, setLayoutList] = useState([]);
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
    if (layoutList.length === 0) {
      setLayoutList(new Array(categories.length).fill({}));
    }
  }, [categories]);

  useEffect(() => {
    if (categories.length !== layoutList.length) {
      return;
    }

    const allRender = layoutList.every(item => item.x >= 0);
    if (allRender && !showAll) {
      scrollRef.current.scrollTo({y: layoutList[1].y, animated: true});
    }
  }, [layoutList]);

  useEffect(() => {
    const mineNodes = [...checkNodes, ...followNodes];
    const allMineNodes = mineNodes.map(item => {
      return {...item, category_id: 0};
    });
    setAllNodes(allMineNodes.concat(nodes));
  }, [nodes, followNodes, checkNodes]);

  return allNodes.length > 0 && categories.length > 0 ? (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
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
                  .map((node, i) => {
                    return (
                      <View key={i}>
                        <BaseNode
                          data={node}
                          type={node.audit_status ? 'mine-node' : 'list'}
                          style={{paddingLeft: 0, paddingRight: 16}}
                        />
                        <Text style={styles.separator} />
                      </View>
                    );
                  })}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
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
    fontSize: 12,
    marginTop: RFValue(25),
    marginBottom: RFValue(25),
    textAlign: 'center',
  },
});

export default NodeIndex;
