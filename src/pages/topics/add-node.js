import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable} from 'react-native';
import {getCategoryList} from '@/api/category_api';
import {getNodeIndex} from '@/api/node_api';
import Loading from '@/components/Loading';
import NodeItem from '@/components/Item/node-item';

const NodeIndex = () => {
  const [categories, setCategories] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [layoutList, setLayoutList] = useState([]);
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  const loadData = async () => {
    const category = await getCategoryList();
    const node = await getNodeIndex();
    setCategories(category);
    setNodes(node);
  };

  const setLayout = (layout, index) => {
    layoutList[index] = layout;
    const list = JSON.parse(JSON.stringify(layoutList));
    setLayoutList(list);
  };

  const onChange = index => {
    setActive(index);
    scrollRef.current.scrollTo({y: layoutList[index].y, animated: true});
  };

  useEffect(() => {
    loadData();
  }, []);

  return categories && nodes ? (
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
              {nodes
                .filter(v => v.category_id === categorie.id)
                .map(node => (
                  <View key={node.id}>
                    <NodeItem node={node} key={node.id} type="add-node" />
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  cateWrap: {
    backgroundColor: '#fafafa',
  },
  cateNameWrap: {
    width: 75,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cateName: {
    fontSize: 14,
  },
  cateNameActive: {
    backgroundColor: 'white',
  },
  active: {
    width: 4,
    height: 10,
    position: 'absolute',
    left: 0,
    top: '50%',
    marginTop: -5,
    backgroundColor: '#ffff00',
  },
  nodeListWrap: {
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  nodeContent: {
    paddingLeft: 18,
    backgroundColor: 'white',
  },
  cateTitle: {
    color: '#7f7f81',
    lineHeight: 20,
    fontSize: 12,
  },
  typeNodeWrap: {
    flex: 1,
    marginBottom: 15,
  },
  separator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginLeft: 60,
  },
});

export default NodeIndex;
