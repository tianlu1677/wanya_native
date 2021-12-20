import React from 'react';
import RelatedList from '@/components/List/related-list';

const AddRateReleated = props => {
  const keys = ['space', 'shop_store'];

  return <RelatedList keys={keys} {...props} page="rate" placeholder="搜索场地/顽士多" />;
};

export default AddRateReleated;
