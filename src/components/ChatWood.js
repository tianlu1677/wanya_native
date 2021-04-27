import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import ChatWootWidget from '@chatwoot/react-native-widget';
import {useDispatch, useSelector} from 'react-redux';

const ChatWood = props => {
  const currentAccount = useSelector(state => state.account.currentAccount);
  const [showWidget, toggleWidget] = useState(true);
  const user = {
    identifier: `uid${currentAccount.uid}-uid`,
    name: currentAccount.nickname,
    avatar_url: currentAccount.avatar_url,
    email: currentAccount.phone,
    identifier_hash: '',
  };
  const customAttributes = {
    accountId: currentAccount.uid,
    created_at: currentAccount.created_at,
  };
  const websiteToken = 'hpXWDG6EvLXDjQeEArdcgVVh';
  const baseUrl = 'https://chatwood.vanyah.cn';
  const locale = 'zh_CN';

  return (
    showWidget && (
      <ChatWootWidget
        websiteToken={websiteToken}
        locale={locale}
        baseUrl={baseUrl}
        closeModal={() => toggleWidget(false)}
        isModalVisible={showWidget}
        user={user}
        customAttributes={customAttributes}
      />
    )
  );
};
ChatWood.defaultProps = {

};
export default ChatWood;
