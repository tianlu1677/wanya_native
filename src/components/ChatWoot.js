import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import ChatWootWidget from '@chatwoot/react-native-widget';
import {useDispatch, useSelector} from 'react-redux';

const ChatWoot = props => {
  const currentAccount = useSelector(state => state.account.currentAccount);
  const [showWidget, toggleWidget] = useState(props.showWidget);
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
  const websiteToken = 'EfCciSM313D4K8cYBsTunvzY';
  const baseUrl = 'https://chatwoot.vanyah.cn';
  const locale = 'zh_CN';

  return (
    <ChatWootWidget
      websiteToken={websiteToken}
      locale={locale}
      baseUrl={baseUrl}
      closeModal={() => props.toggleWidget(false)}
      isModalVisible={props.showWidget}
      user={user}
      customAttributes={customAttributes}
    />
  );
};
ChatWoot.defaultProps = {};
export default ChatWoot;
