import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';

export const DoubleSingleStyle = {
  SingleWrap: styled(View)`
    flex: 1;
    margin: 0 5px;
  `,
  VideoPlayImage: styled(Image)`
    width: 16px;
    height: 16px;
    position: absolute;
    right: 8px;
    top: 8px;
  `,
  MultiLineText: styled(Text)`
    font-size: 12px;
    line-height: 17px;
    color: #1f1f1f;
    margin-left: 5px;
    margin-right: 10px;
    margin-top: 7px;
  `,
  SingleBottom: styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    margin-top: 8px;
    padding-left: 5px;
    height: 17px;
  `,
  SingleName: styled(Text)`
    margin-right: auto;
    margin-left: 5px;
    color: #bdbdbd;
  `,
};
