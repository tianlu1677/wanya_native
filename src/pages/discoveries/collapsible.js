import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TabView} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import TabList from '@/components/TabList';
import {SCREEN_WIDTH} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import ProductList from '@/components/List/product-list';
import Category from './category';
import {getProducts} from '@/api/product_api';

const options = {align: 'left', bottomLine: true, separator: false};

export const RenderCaCategory = props => {
  const {route} = props;
  const {discoveryData} = useSelector(state => state.home);
  const current = discoveryData.find(item => String(item.category_id) === route.key);
  const routes = current.category_brand_type_list.map(item => {
    return {
      key: item,
      title: item,
    };
  });

  const [currentKey, setCurrentKey] = useState(routes[0].key);
  const isChild = routes.map(item => item.title).includes(currentKey);

  const request = {
    api: getProducts,
    params: {},
    apiPath: `q[category_id_eq]=${route.key}&q[category_brand_type_cont]=${currentKey}`,
  };

  const tabChange = item => {
    setCurrentKey(item.key);
  };

  return (
    <ProductList
      request={request}
      ListHeaderComponent={
        <View style={{backgroundColor: 'pink'}}>
          <Category />
          {isChild ? (
            <TabList
              separator={false}
              bottomLine={false}
              showTabLineActive={false}
              current={currentKey}
              tabChange={tabChange}
              data={routes.map(item => {
                return {
                  key: item.key,
                  title: (
                    <Text
                      style={[
                        styles.tabItemText,
                        currentKey === item.key && styles.tabItemTextActive,
                      ]}>
                      {item.title}
                    </Text>
                  ),
                };
              })}
              tabStyle={{
                borderTopColor: '#EBEBEB',
                borderTopWidth: StyleSheet.hairlineWidth,
                height: RFValue(35),
              }}
            />
          ) : null}
        </View>
      }
    />
  );
};

const Collapsible = props => {
  const {tabData, currentKey, onKeyChange} = props;
  const index = tabData.findIndex(v => v.key === currentKey);

  const routes = tabData.map(v => {
    return {key: v.key, title: v.title};
  });

  const onIndexChange = i => {
    onKeyChange(tabData[i].key);
  };

  const tabChange = item => {
    onKeyChange(item.key, item.title);
  };

  const RenderTabBar = () => (
    <TabList {...options} current={currentKey} tabChange={tabChange} data={routes} tabStyle={{}} />
  );

  const RenderScene = () => (
    <RenderCaCategory route={{key: currentKey, index}} ListHeaderComponent={RenderTabBar} />
  );

  return (
    <TabView
      lazy={true}
      renderScene={RenderScene}
      renderTabBar={RenderTabBar}
      onIndexChange={onIndexChange}
      swipeEnabled={true}
      navigationState={{index: index, routes}}
      initialLayout={{height: 0, width: SCREEN_WIDTH}}
    />
  );
};

const styles = StyleSheet.create({
  tabItemText: {
    fontSize: 13,
    color: '#aaaaaa',
    // backgroundColor: 'pink',
    marginHorizontal: 4,
  },
  tabItemTextActive: {
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
  },
});

export default Collapsible;
