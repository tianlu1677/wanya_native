import React from 'react';
import RelatedList from '@/components/List/related-list';

const AddTopicReleated = props => {
  const keys = ['movement', 'shop_store', 'shop_brand', 'product'];

  return (
    <RelatedList keys={keys} {...props} page="topic" placeholder="搜索顽招/顽士多/品牌/顽物" />
  );
};

export default AddTopicReleated;
