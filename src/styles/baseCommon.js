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
    marginTop: RFValue(110),
  },
  emptyText: {
    lineHeight: 23,
    fontSize: 14,
    textAlign: 'center',
    color: '#BDBDBD',
  },
  moreNode: {
    width: 243,
    height: RFValue(45),
    lineHeight: RFValue(45),
    backgroundColor: '#000',
    // borderRadius: 6,
    overflow: 'hidden',
    marginTop: RFValue(20),
    color: '#fff',
    textAlign: 'center',
    borderRadius: 24,
  },
};

// 首页分享
export const ShareWrapper = {
  followShareWrap: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  followShare: {
    height: RFValue(75),
    backgroundColor: '#F2F3F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 2,
    overflow: 'hidden',
  },
  followShareImage: {
    width: 50,
    height: 47,
    marginRight: 16,
  },
  shareTitle: {
    fontWeight: '300',
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

// common 左图又文案
export const BaseRelatedStyle = {
  relatedWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(10),
    backgroundColor: '#000',
    borderRadius: 9,
  },
  relatedImage: {
    width: RFValue(33),
    height: RFValue(33),
    marginRight: 8,
    borderRadius: 6,
  },
  relatedInfo: {
    flex: 1,
  },
  relatedName: {
    color: '#fff',
    fontWeight: '500',
  },
  relatedText: {
    color: '#bdbdbd',
    fontSize: RFValue(10),
    fontWeight: '300',
    marginTop: 4,
  },
  relatedBtn: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    textAlign: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    color: '#fff',
    fontWeight: '500',
    backgroundColor: '#ff2242',
  },
};
