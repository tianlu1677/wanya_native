import React from 'react';
import {Text, StyleSheet, StatusBar} from 'react-native';
import AccountsList from '@/components/List/accounts-list';
import {recommendAccounts} from '@/api/mine_api';

const RelatedAccounts = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <AccountsList
        request={{api: recommendAccounts, params: {per_page: 50}}}
        type="related"
        renderMoreAccounts={<Text style={styles.footer}>只显示前50位好友</Text>}
      />
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default RelatedAccounts;
