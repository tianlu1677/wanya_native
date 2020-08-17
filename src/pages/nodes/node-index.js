import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {getCategoryList} from '@/api/category_api';
import {getNodeIndex} from '@/api/node_api';
import Loading from '@/components/Loading';
import {useSelector, useDispatch} from 'react-redux';

const NodeIndex = () => {
  const [categories, setCategories] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [layoutList, setLayoutList] = useState([]);

  const scrollRef = useRef(null);

  const state = useSelector(state => state);
  console.log(state);

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
    scrollRef.current.scrollTo({y: layoutList[index].y, animated: true});
  };

  useEffect(() => {
    loadData();
  }, []);

  return categories && nodes ? (
    <NodeView>
      <NodeNameView>
        {categories.map((categorie, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(index)}
            style={{padding: 20, backgroundColor: 'green', marginBottom: 10}}>
            <Text>{categorie.name}</Text>
          </TouchableOpacity>
        ))}
      </NodeNameView>
      <ScrollView ref={scrollRef}>
        {categories.map((categorie, index) => (
          <View key={categorie.id} onLayout={e => setLayout(e.nativeEvent.layout, index)}>
            <Text style={{padding: 20, marginBottom: 10}}>标题是：：：：：{categorie.name}</Text>
            <View style={{backgroundColor: 'pink'}}>
              {nodes
                .filter(v => v.category_id === categorie.id)
                .map(node => (
                  <Text key={node.id} style={{backgroundColor: 'pink', padding: 10}}>
                    {node.name}
                  </Text>
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

const NodeView = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const NodeNameView = styled(View)`
  width: 100px;
  background: pink;
`;

const NodeContent = styled(View)`
  width: 100px;
  background: pink;
`;

export default NodeIndex;
