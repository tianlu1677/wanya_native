import React, {useState, useEffect, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import BaseTheory from '@/components/Item/base-theory';
import {Platform, Dimensions, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {getRecommendPosts, getRecommendLatestPosts, getFollowedNodePosts} from '@/api/home_api';
import {SCREEN_WIDTH} from '@/utils/navbar';
import RecycleScrollList from '@/components/RecycScrollList';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

let {width, height} = Dimensions.get('window');

// WrapGridLayoutManager.prototype.getOffsetForIndex = function (index) {
//   if (this._layouts.length > index) {
//     return { x: this._layouts[index].x, y: this._layouts[index].y };
//   }
//   else {
//     return { x: 0, y: 0};
//     // Commented the part that throws exception
//     // throw new CustomError_1.default({
//     //     message: "No layout available for index: " + index,
//     //     type: "LayoutUnavailableException",
//     // });
//   }
// };

const Galley = props => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([{item_type: 'none'}]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const Child = (({item, index}) => {
    switch (item.item_type) {
      case 'Topic':
        return <BaseTopic data={item.item} />;
      case 'Article':
        return <BaseArticle data={item.item} />;
      case 'Theory':
        return <BaseTheory data={item.item} />;
      default:
        return <View><Text color={'red'}>xxx</Text></View>;
    }
  })

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const res = await getRecommendLatestPosts({page: page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
    setHeaders(res.headers);
  };


  const provider = useMemo(() => {
    return new DataProvider(
      (left, right) => {
        return left.id !== right.id;
      },
      index => {
        // TODO: should be fetched from data
        return 'id'+ index;
      }
    );
  }, []);

  const dataProvider = useMemo(() => {
    return provider.cloneWithRows(listData);
  }, [listData, provider]);

  useEffect(() => {
    loadData();
  }, []);

  const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2,
  };

  const layoutProvider = new LayoutProvider(
    index => {
      return 'base_group'
    },
    (type, dim) => {
      console.log('type', type)
      switch (type) {
        case ViewTypes.HALF_LEFT:
          dim.width = width / 3;
          dim.height = 160;
          break;
        case ViewTypes.HALF_RIGHT:
          dim.width = width / 2;
          dim.height = 160;
          break;
        case 'base_group':
          dim.width = width;
          dim.height = 250;
          break;
        default:
          dim.width = width;
          dim.height = 50;
      }
    }
  );

  const rowRenderer = (type, data) => {
    return <Child item={data}/>
  };

  return (
    <View style={{flex: 1}}>
      {
        listData.length <= 1 ? <View /> : <RecycleScrollList
          layoutProvider={layoutProvider}
          loading={loading}
          renderItem={rowRenderer}
          onRefresh={loadData}
          headers={headers}
          data={dataProvider}
          style={{flex: 1}}
        />
      }

      {/*<Text>{listData.length}</Text>*/}
      {/*<Carousel*/}
      {/*  // ref={(c) => { this._carousel = c; }}*/}
      {/*  data={listData}*/}
      {/*  renderItem={renderItemMemo}*/}
      {/*  sliderWidth={SCREEN_WIDTH}*/}
      {/*  itemWidth={SCREEN_WIDTH - 50}*/}
      {/*  sliderHeight={1000}*/}
      {/*  itemHeight={1000}*/}
      {/*  layout={'stack'}*/}
      {/*/>*/}
    </View>
  );
};

// List 属性继承scrollList 默认可下拉加载刷新
Galley.propTypes = {
  request: PropTypes.object.isRequired, //获取数据请求 {api: api, id: 1, params:params}
  dataKey: PropTypes.string, // single-list 默认posts
};

const styles = {
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#00a1f1"
  },
  containerGridLeft: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffbb00"
  },
  containerGridRight: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#7cbb00"
  }
};

export default Galley;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import {SafeAreaView, StyleSheet, ScrollView, Button, View, Text, StatusBar} from 'react-native';
//
// import {Colors} from 'react-native/Libraries/NewAppScreen';
//
// import {XUpdate, InitArgs, UpdateArgs} from 'react-native-xupdate-new';
// // import AppInfo from './update_custom';
//
// const AppInfo = {
//   Code: 0,
//   Msg: '',
//   UpdateStatus: 2,
//   VersionCode: 20,
//   VersionName: '1.0.2',
//   UploadTime: '2021-07-10 17:28:41',
//   ModifyContent:
//     ' 1、优化api接口。 2、添加使用demo演示。 3、新增自定义更新服务API接口。 4、优化更新提示界面。',
//   DownloadUrl: 'https://xuexiangjys.oss-cn-shanghai.aliyuncs.com/apk/xupdate_demo_1.0.2.apk',
//   ApkSize: 2048,
//   ApkMd5: 'E4B79A36EFB9F17DF7E3BB161F9BCFD8',
// };
//
// const _updateUrl = 'http://xinxue.meirixinxue.com/v.json';
//
// const _updateUrl2 = 'http://xinxue.meirixinxue.com/v.json';
//
// const _updateUrl3 = 'http://xinxue.meirixinxue.com/v.json';
//
// export default class App extends Component<{}> {
//   state = {
//     _message: '',
//   };
//
//   //自定义的异常处理
//   errorListener = error => {
//     console.log(error);
//     //下载失败
//     if (error.code === 4000) {
//       XUpdate.showRetryUpdateTip(
//         'Github被墙无法继续下载，是否考虑切换蒲公英下载？',
//         'https://www.pgyer.com/flutter_learn'
//       );
//     }
//     this.setState({
//       _message: '发送异常：' + JSON.stringify(error),
//     });
//   };
//
//   componentDidMount() {
//     this.initXUpdate();
//   }
//
//   initXUpdate() {
//     let args = new InitArgs();
//     args.debug = true;
//     args.isPostJson = false;
//     args.timeout = 25000;
//     args.isWifiOnly = false;
//     args.isAutoMode = false;
//     args.supportSilentInstall = false;
//     args.enableRetry = false;
//     XUpdate.init(args)
//       .then(result => {
//         this.setState({
//           _message: '初始化成功:' + JSON.stringify(result),
//         });
//       })
//       .catch(error => {
//         console.log(error);
//         this.setState({
//           _message: '初始化失败:' + error,
//         });
//       });
//
//     //设置自定义解析
//     XUpdate.setCustomParser({parseJson: this.customParser});
//     //设置错误监听
//     XUpdate.addErrorListener(this.errorListener);
//   }
//
//   componentWillUnmount() {
//     XUpdate.removeErrorListener(this.errorListener);
//   }
//
//   render() {
//     return (
//       <>
//         <StatusBar barStyle="default" />
//         <SafeAreaView>
//           <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
//             <View>
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>XUpdate</Text>
//               </View>
//               <View style={styles.logContainer}>
//                 <Text style={styles.logStyle}>{this.state._message}</Text>
//               </View>
//             </View>
//
//             <View style={styles.buttonContainer}>
//               <Button onPress={this.checkUpdateDefault} title="默认App更新" color="#2196F3" />
//             </View>
//
//             <View style={styles.buttonContainer}>
//               <Button
//                 onPress={this.checkUpdateSupportBackground}
//                 title="默认App更新 + 支持后台更新"
//                 color="#2196F3"
//               />
//             </View>
//
//             <View style={styles.buttonContainer}>
//               <Button onPress={this.checkUpdateRatio} title="调整宽高比" color="#2196F3" />
//             </View>
//
//             <View style={styles.buttonContainer}>
//               <Button onPress={this.checkUpdateForce} title="强制更新" color="#2196F3" />
//             </View>
//
//             <View style={styles.buttonContainer}>
//               <Button onPress={this.checkUpdateAutoMode} title="自动模式" color="#2196F3" />
//             </View>
//
//             <View style={styles.buttonContainer}>
//               <Button
//                 onPress={this.enableChangeDownLoadType}
//                 title="下载时点击取消允许切换下载方式"
//                 color="#2196F3"
//               />
//             </View>
//
//             <View style={styles.buttonContainer}>
//               <Button onPress={this.showRetryDialogTip} title="显示重试提示弹窗" color="#2196F3" />
//             </View>
//
//             <View style={styles.buttonContainer}>
//               <Button onPress={this.customJsonParse} title="使用自定义json解析" color="#2196F3" />
//             </View>
//
//             <View style={styles.buttonContainer}>
//               <Button
//                 onPress={this.checkUpdateByUpdateEntity}
//                 title="直接传入UpdateEntity进行更新"
//                 color="#2196F3"
//               />
//             </View>
//
//             <View style={styles.buttonContainer}>
//               <Button
//                 onPress={this.customPromptDialog}
//                 title="自定义更新弹窗样式"
//                 color="#2196F3"
//               />
//             </View>
//
//             <View style={{height: 20}} />
//           </ScrollView>
//         </SafeAreaView>
//       </>
//     );
//   }
//
//   ///默认App更新
//   checkUpdateDefault() {
//     let args = new UpdateArgs(_updateUrl);
//     XUpdate.update(args);
//   }
//
//   ///默认App更新 + 支持后台更新
//   checkUpdateSupportBackground() {
//     let args = new UpdateArgs(_updateUrl);
//     args.supportBackgroundUpdate = true;
//     XUpdate.update(args);
//   }
//
//   ///调整宽高比
//   checkUpdateRatio() {
//     let args = new UpdateArgs(_updateUrl);
//     args.widthRatio = 2;
//     // args.heightRatio = 1;
//     XUpdate.update(args);
//   }
//
//   ///强制更新
//   checkUpdateForce() {
//     let args = new UpdateArgs(_updateUrl2);
//     XUpdate.update(args);
//   }
//
//   ///自动模式, 如果需要完全无人干预，自动更新，需要root权限【静默安装需要】
//   checkUpdateAutoMode() {
//     let args = new UpdateArgs(_updateUrl);
//     args.isAutoMode = true;
//     XUpdate.update(args);
//   }
//
//   ///下载时点击取消允许切换下载方式
//   enableChangeDownLoadType() {
//     let args = new UpdateArgs(_updateUrl);
//     args.overrideGlobalRetryStrategy = true;
//     args.enableRetry = true;
//     args.retryContent = 'Github下载速度太慢了，是否考虑切换蒲公英下载？';
//     args.retryUrl = 'https://www.pgyer.com/flutter_learn';
//     XUpdate.update(args);
//   }
//
//   ///显示重试提示弹窗
//   showRetryDialogTip() {
//     XUpdate.showRetryUpdateTip(
//       'Github下载速度太慢了，是否考虑切换蒲公英下载？',
//       'https://www.pgyer.com/flutter_learn'
//     );
//   }
//
//   ///使用自定义json解析
//   customJsonParse() {
//     let args = new UpdateArgs(_updateUrl3);
//     args.isCustomParse = true;
//     XUpdate.update(args);
//   }
//
//   ///直接传入UpdateEntity进行更新提示
//   checkUpdateByUpdateEntity() {
//     let args = new UpdateArgs();
//     args.supportBackgroundUpdate = true;
//     XUpdate.updateByInfo(args, {
//       hasUpdate: AppInfo.hasUpdate,
//       versionCode: AppInfo.versionCode,
//       versionName: AppInfo.versionName,
//       updateContent: AppInfo.updateLog,
//       downloadUrl: AppInfo.apkUrl,
//       //选填
//       isIgnorable: AppInfo.isIgnorable,
//       apkSize: AppInfo.apkSize,
//     });
//   }
//
//   ///自定义更新弹窗样式
//   customPromptDialog() {
//     let args = new UpdateArgs(_updateUrl);
//     // args.themeColor = '#ffffff';
//     // args.topImageRes = 'bg_update_top';
//     args.buttonTextColor = '#00000000';
//     XUpdate.update(args);
//   }
//
//   //自定义解析
//   customParser = json => {
//     let appInfo = JSON.parse(json);
//     return {
//       //必填
//       hasUpdate: appInfo.hasUpdate,
//       versionCode: appInfo.versionCode,
//       versionName: appInfo.versionName,
//       updateContent: appInfo.updateLog,
//       downloadUrl: appInfo.apkUrl,
//       //选填
//       isIgnorable: appInfo.isIgnorable,
//       apkSize: appInfo.apkSize,
//     };
//   };
// }
//
// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.white,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   logContainer: {
//     marginTop: 16,
//     paddingHorizontal: 24,
//   },
//   logStyle: {
//     padding: 16,
//     backgroundColor: '#E0E0E0',
//     minHeight: 150,
//   },
//   buttonContainer: {
//     marginTop: 16,
//     paddingHorizontal: 24,
//   },
// });
