import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import {connect, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import goPage from '../../utils/page_path';
import {getInsideNotifies} from '@/api/account_api';
import ScrollList from '@/components/ScrollList';
import NotifyContent from './components/notify-content';
import SafeAreaPlus from '../../components/SafeAreaPlus';
import {
  dispatchCurrentAccount,
  dispatchBaseCurrentAccount,
  dispatchEmptyAccountDetail,
} from '@/redux/actions';

@connect(state => state.account, {
  dispatchCurrentAccount,
  dispatchBaseCurrentAccount,
  dispatchEmptyAccountDetail,
})
class PraiseNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      headers: {},
    };
  }

  componentDidMount() {
    this.props.dispatchCurrentAccount();
    this.loadInfo();
  }

  loadInfo = async (page = 1) => {
    let params = {page: page, per_page: 10};
    let data = [];
    let headers = {};
    const res = await getInsideNotifies(params);
    data =
      params.page === 1
        ? res.data.inside_notifies
        : this.state.data.concat(res.data.inside_notifies);
    headers = res.headers;
    this.setState(
      {
        data: data,
        headers: headers,
      },
      () => {
        this.setState({
          loading: false,
        });
      }
    );
  };

  componentDidUpdate() {}

  componentWillUnmount() {}

  componentDidCatch(error, info) {}

  render() {
    const {headers, loading, data} = this.state;
    const renderItem = ({item}) => {
      item = {...item, itemKey: `${item.target_type}_${item.id}`}
      return (
        <NotifyContent account={item.actor} item={item} />
      );
    };

    return (
      <SafeAreaPlus>
        <ScrollList
          onRefresh={this.loadInfo}
          headers={headers}
          data={data}
          loading={loading}
          renderItem={renderItem}
          height={800}
        />
      </SafeAreaPlus>
    );
  }
}

export default PraiseNotify;
