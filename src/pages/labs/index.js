import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Pressable, Button, FlatList, ScrollView, View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import GetLocation from '@/components/GetLocation';
import ShareUtil from '@/utils/umeng_share_util';
import AnalyticsUtil from '@/utils/umeng_analytics_util';
// import PushNotification from 'react-native-push-notification';
import Helper from '@/utils/helper';
import {
  check,
  request,
  addLocationListener,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import ChatWootWidget from '@chatwoot/react-native-widget';


const LabIndex = props => {
  const navigation = props.navigation;
  const [deviceToken, setDeviceToken] = useState('');
  const [notifyPermission, setNotifyPermission] = useState({});
  const [position, setPosition] = useState({});
  const getDeviceToken = async () => {
    const device_token = await Helper.getData('device_token');
    setDeviceToken(device_token);
  };


  const [showWidget, toggleWidget] = useState(false);
  const user = {
    identifier: 'john@gmail.com',
    name: 'John Samuel',
    avatar_url: '',
    email: 'john@gmail.com',
    identifier_hash: '',
  };
  const customAttributes = { accountId: 1, pricingPlan: 'paid', status: 'active' };
  const websiteToken = 'zQHVf7Tri5YCiooBRyTEfE6z';
  const baseUrl = 'https://staging.chatwoot.com';
  const locale = 'zh_CN';

  const getLocation = data => {
    console.log('data', data);
    // if(data.position && data.position.coords)
    setPosition(data);
  };

  const checkPermission = () => {
    // PushNotification.checkPermissions(res => {
    //   setNotifyPermission(res);
    // });
  };

  const shareQQ = () => {
    console.log('shareQQ,');
    try{
      ShareUtil.share(
        'sssss',
        'http://dev.umeng.com/images/tab2_1.png',
        'http://www.umeng.com/',
        'title',
        0,
        (code, message) => {
          console.log('code', code, message);
          // this.setState({result:message});
        }
      );
    } catch (e){
      console.log('qq', e)
    }

  };

  const shareQQZone = () => {
    console.log('shareQQZone,');
    try{
      ShareUtil.share(
        'sssss',
        'http://dev.umeng.com/images/tab2_1.png',
        'http://www.umeng.com/',
        'title',
        4,
        (code, message) => {
          console.log('code', code, message);
          // this.setState({result:message});
        }
      );
    } catch (e) {
      console.log('eerr', e)
    }


  };

  const shareWeibo = () => {
    console.log('shareWeibo');
    try{
    ShareUtil.share(
      'sssss',
      'http://xinxuefile.meirixinxue.com/assets/2021/b94d2a89-54c5-47a7-8cfe-b70850ab538c.jpg',
      'http://www.umeng.com/',
      'title',
      1,
      (code, message) => {
        console.log('code,', code, message);
        // this.setState({result: message});
      }
    );
    }catch (e) {
      console.log('error shareWeibo', e)
    }

  };

  const loginQQ = () => {
    console.log('shareWeibo');
    ShareUtil.auth(0, res => {
      console.log('res', res)
    });
  };

  const clickAna = () => {
    console.log('clickAna')
    AnalyticsUtil.onEvent('test');
    // AnalyticsUtil.onEventObject('test', {a: 1});
  }


  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        <View>
          <Pressable onPress={getDeviceToken}>
            <Text style={styles.text}>查看当前的device_token</Text>
            <Text style={styles.smallText}>{deviceToken}</Text>
          </Pressable>
          <View>
            <GetLocation handleClick={getLocation}>
              <Text style={styles.text}>获取当前位置</Text>
              <Text style={styles.smallText}>{JSON.stringify(position)}</Text>
            </GetLocation>
          </View>

          <Pressable onPress={checkPermission}>
            <Text style={styles.text}>通知权限</Text>
            <Text style={styles.smallText}>{JSON.stringify(notifyPermission)}</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate('LabNewest');
            }}>
            <Text style={styles.text}>最新帖子排序</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('LabGalley');
            }}>
            <Text style={styles.text}>最新帖子画廊</Text>
          </Pressable>
          <Pressable onPress={openSettings}>
            <Text style={styles.text}>去设置权限页面</Text>
          </Pressable>

          <Pressable onPress={() => shareQQ()}>
            <Text style={styles.text}>分享QQ</Text>
          </Pressable>
          <Pressable onPress={() => shareWeibo()}>
            <Text style={styles.text}>分享微博</Text>
          </Pressable>

          <Pressable onPress={() => shareQQZone()}>
            <Text style={styles.text}>分享QQ空间</Text>
          </Pressable>

          <Pressable onPress={() => loginQQ()}>
            <Text style={styles.text}>QQ登录</Text>
          </Pressable>

          <Pressable onPress={() => clickAna()}>
            <Text style={styles.text}>点击统计</Text>
          </Pressable>

          <View>
            <Pressable style={styles.button} onPress={() => toggleWidget(true)}>
              <Text style={styles.buttonText}>Open widget</Text>
            </Pressable>
          </View>
          {
            showWidget&&
            <ChatWootWidget
              websiteToken={websiteToken}
              locale={locale}
              baseUrl={baseUrl}
              closeModal={() => toggleWidget(false)}
              isModalVisible={showWidget}
              user={user}
              customAttributes={customAttributes}
            />
          }
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 2,
    marginBottom: 2,
    color: 'white',
    backgroundColor: 'orange',
  },
  smallText: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
    backgroundColor: 'yellow',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    height: 48,
    marginTop: 32,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#1F93FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    fontWeight: '600',
    fontSize: 16,
    paddingRight: 10,
  },
});

export default LabIndex;
