import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components/native';
import {getCategoryList} from '@/api/category_api';
import {getNodeIndex} from '@/api/node_api';
import Loading from '@/components/Loading';
import {useSelector} from 'react-redux';
import {white} from 'ansi-colors';

const defaultCoverUrl =
  'http://file.meirixinxue.com/assets/2020/964cc82f-09d1-4561-b415-8fa58e29c817.png';

const NodeIndex = () => {
  const [categories, setCategories] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [layoutList, setLayoutList] = useState([]);
  const [active, setActive] = useState(0);

  const scrollRef = useRef(null);

  const state = useSelector(state => state);

  const loadData = async () => {
    const category = await getCategoryList();
    const node = await getNodeIndex();
    setCategories(category);
    setNodes(node);
    console.log(node);
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
    <NodeView>
      <View style={styles.cateWrap}>
        {categories.map((categorie, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(index)}
            style={[styles.cateName, active === index && styles.cateNameActive]}>
            <Text>{categorie.name}</Text>
            {active === index && <Text style={styles.active} />}
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView ref={scrollRef}>
        {categories.map((categorie, index) => (
          <View
            style={styles.nodeContent}
            key={categorie.id}
            onLayout={e => setLayout(e.nativeEvent.layout, index)}>
            <Text style={styles.cateTitle}>{categorie.name}</Text>
            <View style={{flex: 1}}>
              {nodes
                .filter(v => v.category_id === categorie.id)
                .map(node => (
                  <View key={node.id} style={styles.nodeItem}>
                    <Image
                      style={styles.nodeImg}
                      source={{uri: node.cover_url}}
                      defaultSource={defaultCoverUrl}
                    />
                    <View style={styles.nodeInfo}>
                      <Text style={styles.nodeName}>{node.name}</Text>
                      <Text style={styles.nodeDesc}>
                        {node.topics_count}篇帖子 · {node.accounts_count}位{node.nickname || '圈友'}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </NodeView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  cateWrap: {},
  cateName: {
    width: 75,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    position: 'relative',
    marginBottom: 10,
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
  nodeContent: {
    paddingLeft: 18,
    backgroundColor: 'white',
  },
  nodeItem: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  nodeImg: {
    width: 49,
    height: 49,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#ffff00',
    marginRight: 10,
  },
  cateTitle: {
    paddingBottom: 13,
    color: '#7f7f81',
  },
  nodeInfo: {
    paddingBottom: 18,
    paddingTop: 5,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flex: 1,
  },
  nodeName: {
    height: 20,
    lineHeight: 20,
    fontSize: 15,
  },
  nodeDesc: {
    height: 20,
    lineHeight: 20,
    fontSize: 11,
    color: '#bdbdbd',
  },
});

const NodeView = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const NodeNameView = styled(View)`
  // width: 100px;
  background: pink;
`;

const NodeContent = styled(View)`
  width: 100px;
  background: pink;
`;

export default NodeIndex;
