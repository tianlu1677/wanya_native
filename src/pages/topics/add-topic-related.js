import React from 'react';
import RelatedList from '@/components/List/related-list';

const AddTopicReleated = props => {
  const keys = ['movement', 'shop_store', 'shop_brand', 'product'];

  return <RelatedList keys={keys} {...props} page="topic" />;
};

export default AddTopicReleated;
