import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  FlatList,
  ScorllView
} from 'react-native';

import BaseTopic from '../../components/BaseTopic'
import Scroll, {State, pagination} from '../../components/Scroll'
import { getHotTopics, getRecommendPosts } from '../../api/home_api'

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestState: State.LOADING,
      isLoading: true,
      recommendPostList: [],
      recommendPaginate: {hasMore: true, nextPage: 1},
    };
    this.currentPage = 1;
  }

  async componentDidMount() {
    this._request(true)
  }


  fetchData = async () => {

  }

  componentDidUpdate() {

  }
  _request = async (isRefresh) => {
    this.currentPage = isRefresh ? 1 : this.currentPage + 1;
    this.setState({ requestState: isRefresh ? State.REFRESHING : State.LOADING });
    const { recommendPostList, recommendPaginate } = this.state
    if (!recommendPaginate.hasMore) {
      this.setState({
        requestState: State.LOAD_END,
      })
      return
    }
    let params = {page: this.currentPage, per_page: 20}
    let res = await getRecommendPosts(params)
    let itemList = res.data.posts
    let headers = res.headers
    let paginate = pagination(headers);
    // console.log('xxxx', headers)
    itemList = isRefresh ? itemList : recommendPostList.concat(itemList)

    itemList = itemList.filter((post, post_index) => {
      return itemList.indexOf(post, 0) === post_index
    })
    this.setState({
      recommendPostList: itemList,
      recommendPaginate: paginate,
    }, () => {
      this.setState({
        requestState: State.NORMAL,
      })
    })
  }

  _renderItem = ({item}) => {
    // console.log('xxxx',item)
    return <BaseTopic topic={item}
                      post={item}
                      navigation={this.props.navigation}
    />
  }

  render() {
    return <View style={{flex: 1, paddingTop: 0}}>
      <Scroll
        ref={(flat_list) => {
          this.flat_list = flat_list;
        }}
        onRequest={this._request}
        data={this.state.recommendPostList}
        requestState={this.state.requestState}
        renderItem={this._renderItem}
      >
      </Scroll>
    </View>
  }
}

Recommend.navigationOptions = {
  headerTitle: "Noticias en 111"
};

export default Recommend;