import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';

export const BaseButton = {
  join: styled(Text)`
    width: 108px;
    height: 54px;
    line-height: 54px;
    color: #bdbdbd;
    background: rgba(255, 255, 255, 1);
    font-weight: 600;
    border-radius: 2px;
  `,
  joined: styled(Text)`
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -15px;
    margin-top: -15px;
  `,
  HashtagText: styled(Text)`
    color: #ff8d00;
    margin-right: 3px;
  `,
};

export const BaseSearchText = {
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    marginLeft: 14,
    marginBottom: 6,
  },
  title: {
    height: 40,
    lineHeight: 40,
    paddingLeft: 14,
    color: '#bdbdbd',
    backgroundColor: '#fafafa',
  },
};

// 公用热门styles
export const ProWrapper = {
  proWrapper: {
    height: 40,
    lineHeight: 40,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    alignItems: 'center',
  },
  proTitle: {
    color: '#bdbdbd',
    fontSize: 12,
  },
  proCity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  proAddressIcon: {
    marginRight: 6,
  },
  proCityText: {
    fontSize: 12,
    height: 40,
    lineHeight: 40,
  },
  proDownIcon: {
    marginLeft: 6,
  },
};
