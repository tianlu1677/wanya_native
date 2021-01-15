import {Text} from 'react-native';
import styled from 'styled-components/native';
import {RFValue} from '@/utils/response-fontsize';

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
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    alignItems: 'center',
  },
  proTitle: {
    color: '#bdbdbd',
    fontSize: 12,
    height: 40,
    lineHeight: 40,
  },
};

// list为空
export const ListEmpty = {
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
  },
  emptyTextWrap: {
    flexDirection: 'column',
    marginTop: 110,
  },
  emptyText: {
    lineHeight: 23,
    fontSize: 14,
    textAlign: 'center',
    color: '#BDBDBD',
  },
  moreNode: {
    width: 243,
    height: 45,
    lineHeight: 45,
    backgroundColor: '#000',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
  },
};

// 首页分享
export const ShareWrapper = {
  followShareWrap: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#efefef',
  },
  followShare: {
    height: RFValue(75),
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 2,
  },
  followShareImage: {
    width: RFValue(42),
    height: RFValue(40),
    marginRight: 16,
  },
  shareText: {
    fontSize: 11,
    color: '#BDBDBD',
    marginTop: 7,
  },
  deleteIcon: {
    marginLeft: 'auto',
  },
};
