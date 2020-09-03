import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import Helper from '../../utils/helper';
import Geolocation from 'react-native-geolocation-service';
import GetLocation from '@/components/GetLocation';
import {connect} from 'react-redux';
import ViewShot from 'react-native-view-shot';

// import {dispatchSetAuthToken} from '@/redux/actions';
//
// @connect(state => state.login, {
//   dispatchSetAuthToken,
// })
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      coin_data: [],
      loading: false,
      showCap: false,
    };
    this.auth_token = '';
  }

  componentDidMount() {
    this.auth_token = Helper.getData('auth_token');
  }

  componentDidUpdate() {
    this.auth_token = Helper.getData('auth_token');
  }

  clearAllCatch = async () => {
    try {
      Helper.clearAllData();
    } catch (e) {
      console.log('e', e);
    }
    this.props.dispatchSetAuthToken('');
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'AdminPhoneLogin'}],
    });
  };

  makeImage = () => {
    let that = this
    this.setState({showCap: true});

    setTimeout(() => {
      this.refs.viewShot.capture().then(uri => {
        console.log('do something with ', uri);
      });
    }, 300)


  };

  render() {
    return (
      <View style={{paddingTop: 100}}>
        {/*<Text>{this.auth_token}</Text>*/}
        <Text>Mine</Text>
        <Button
          title={'去登录'}
          onPress={() => {
            this.props.navigation.navigate('AdminPhoneLogin');
          }}
        />
        <Button title={'清除所有缓存'} onPress={this.clearAllCatch} />
        <Button
          title={'视频页面'}
          onPress={() => {
            this.props.navigation.navigate('VideoDetail');
          }}
        />
        {/*https://github.com/Agontuk/react-native-geolocation-service*/}
        <Button
          title={'获取当前地理位置'}
          onPress={() => {
            Geolocation.getCurrentPosition(
              position => {
                console.log(position);
              },
              error => {
                // See error code charts below.
                console.log(error.code, error.message);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
            );
            // navigator.geolocation.getCurrentPosition(
            //   position => {
            //     const location = JSON.stringify(position);
            //
            //     this.setState({ location });
            //   },
            //   error => alert(error.message),
            //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            // );
            // this.props.navigation.navigate('HashtagDetail', {hashtag: '滑板'});
          }}
        />

        <Button
          title={'去发布帖子'}
          onPress={() => {
            this.props.navigation.navigate('NewTopic');
          }}
        />

        <Button
          title={'去话题页'}
          onPress={() => {
            this.props.navigation.navigate('HashtagDetail', {hashtag: '滑板'});
          }}
        />
        <Button
          title={'去VideoDetail'}
          onPress={() => {
            this.props.navigation.navigate('VideoDetail', {hashtag: '滑板'});
          }}
        />
        <Button
          title={'去场地详情页'}
          onPress={() => {
            this.props.navigation.navigate('SpaceDetail', {spaceId: 2});
          }}
        />

        <Button
          title={'去实验室页面'}
          onPress={() => {
            this.props.navigation.navigate('LabIndex');
          }}
        />
        <Button
          title={'微信登录'}
          onPress={() => {
            this.props.navigation.navigate('SocialLogin');
          }}
        />
        <Button
          title={'去我的邀请'}
          onPress={() => {
            this.props.navigation.navigate('InviteDetail');
          }}
        />
        <Button
          title={'去我的设置'}
          onPress={() => {
            this.props.navigation.navigate('Settings');
          }}
        />

        <Button title={'去截图'} onPress={this.makeImage} />
        {
          this.state.showCap &&  <ViewShot ref="viewShot" options={{format: 'jpg', quality: 0.9}}>
            <Text>...Something to rasterize...</Text>
          </ViewShot>
        }


        <GetLocation>
          <Text>获取城市信息</Text>
        </GetLocation>
      </View>
    );
  }
}

export default Mine;
