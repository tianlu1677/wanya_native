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
