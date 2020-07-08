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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



export const State = {
  NORMAL: 0,//正常状态
  REFRESHING: 1,//刷新中
  LOADING: 2,//正在加载
  LOAD_END: 3,//上拉加载完成
  ERROR: 4,//上拉加载发生错误
  NO_DATA: 5,//无数据情况
};

import BaseTopic from '../../components/BaseTopic'
import Scroll from '../../components/Scroll'
import { getHotTopics, getRecommendPosts } from '../../api/home_api'
import {pagination} from "../../utils/load_more"

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestState: State.NORMAL,
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
    this.currentPage = isRefresh ? 0 : this.currentPage + 1;
    this.setState({ requestState: isRefresh ? State.REFRESHING : State.LOADING });
    const { recommendPostList, recommendPaginate } = this.state
    // if (!recommendPaginate.hasMore) {
    //   return
    // }
    let params = {page: this.currentPage, per_page: 20}
    let res = await getRecommendPosts(params)
    let itemList = res.data.posts
    let headers = res.headers
    console.log('daaa', res)
    let paginate = pagination(headers);
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
    return <BaseTopic topic={item} post={item}/>
  }

  render() {
    return <View style={{flex: 1, paddingTop: 0}}>

      <Scroll
        onRequest={this._request}
        data={this.state.recommendPostList}
        requestState={this.state.requestState}
        renderItem={this._renderItem}
      >

      </Scroll>
      <Button
        title={"点击122"}
        onPress={this.fetchData}
      >
        ssss
      </Button>
    </View>
  }
}


Recommend.navigationOptions = {
  headerTitle: "Noticias en 111"
};

export default Recommend;