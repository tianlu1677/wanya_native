// import React, {Component, useState} from 'react';
// import {View, Text, Button} from 'react-native';
// import Share from 'react-native-share';
// import {WebView} from 'react-native-webview';
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';
// import SyanImagePicker from 'react-native-syan-image-picker';
// import {useDispatch, useSelector} from 'react-redux';
// import {check, request, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
// import ImagePreview from '@/components/ImagePreview';
// import {DefaultLog, EmptyImg, MineSystemNoticeUserImg, MineNodeImg} from '@/utils/default-image';
// import Helper from '@/utils/helper';
// import {dispatchPreviewImage} from '@/redux/actions';
// import SingleList from '@/components/List/single-list';
// import DoubleList from '@/components/List/double-list';
//
// const types = {toast: 'toast', webview: '网页'};
//
// import CollapsibleTab from "@/components/CollapsibleTab"
// import {getFollowedPosts, getRecommendLatestPosts, getRecommendPosts} from "@/api/home_api"
// import TabViewList from "@/components/TabView"
//
// const LabIndex = ({navigation, route}) => {
//   const [currentKey, setCurrentKey] = useState('recommend');
//   // const [isVisible, setIsVisible] = useState(false);
//   // const dispatch = useDispatch();
//   // const imageSource = [DefaultLog];
//   // const renderContent = () => (
//   //   <View
//   //     style={{
//   //       backgroundColor: 'white',
//   //       padding: 16,
//   //       height: 450,
//   //     }}>
//   //     <Text>Swipe down to close</Text>
//   //   </View>
//   // );
//   //
//   // // const choseImage = () => {
//   // //   let options = {
//   // //
//   // //   }
//   // //   SyanImagePicker.showImagePicker(options, (err, selectedPhotos) => {
//   // //     if (err) {
//   // //       // 取消选择
//   // //       return;
//   // //     }
//   // //     // 选择成功，渲染图片
//   // //     // ...
//   // //   })
//   // // }
//   //
//   // //https://github.com/react-native-community/react-native-permissions
//   // const checkPermission = () => {
//   //   check(PERMISSIONS.IOS.CAMERA)
//   //     .then(result => {
//   //       switch (result) {
//   //         case RESULTS.UNAVAILABLE:
//   //           console.log('This feature is not available (on this device / in this context)');
//   //           break;
//   //         case RESULTS.DENIED:
//   //           // 请求过一次就不能再请求了
//   //
//   //           console.log('The permission has not been requested / is denied but requestable');
//   //           request(PERMISSIONS.IOS.MEDIA_LIBRARY).then(result => {
//   //             console.log('result', result);
//   //           });
//   //
//   //           break;
//   //         case RESULTS.GRANTED:
//   //           console.log('The permission is granted');
//   //           break;
//   //         case RESULTS.BLOCKED:
//   //           console.log('The permission is denied and not requestable anymore');
//   //           openSettings().catch(() => console.warn('cannot open settings'));
//   //           break;
//   //       }
//   //     })
//   //     .catch(error => {
//   //       // …
//   //     });
//   // };
//   //
//   // const sheetRef = React.useRef(null);
//   //
//   // const previewImg = () => {
//   //   console.log('previewImg');
//   //
//   //   const images = [
//   //     {
//   //       // Simplest usage.
//   //       url: 'http://file.meirixinxue.com/assets/2020/15bf8a6a-0429-4122-8107-0d0d3b724d61.jpeg',
//   //
//   //       // width: number
//   //       // height: number
//   //       // Optional, if you know the image size, you can set the optimization performance
//   //
//   //       // You can pass props to <Image />.
//   //       props: {
//   //         // headers: ...
//   //       },
//   //     },
//   //     {
//   //       url: 'http://file.meirixinxue.com/assets/2020/852febda-3dcd-46ee-ab8e-a6cc1322b7c5.jpg',
//   //       props: {
//   //         // Or you can set source directory.
//   //         // source: require('../background.png')
//   //       },
//   //     },
//   //   ];
//   //
//   //   const data = {images: images, visible: true, index: 1};
//   //   dispatch(dispatchPreviewImage(data));
//   // };
//
//   const RecommendList = () => {
//     return <DoubleList request={{api: getRecommendPosts}} type="recommend" />;
//   };
//
//   const FollowList = () => {
//     return <SingleList request={{api: getFollowedPosts}} />;
//   };
//
//   const LastedList = () => {
//     return <SingleList request={{api: getRecommendLatestPosts}} />;
//   };
//
//   return (
//     <View style={{flex: 1}}>
//       {/*<CollapsibleTab*/}
//       {/*  size="big"*/}
//       {/*  lazy={true}*/}
//       {/*  currentKey={currentKey}*/}
//       {/*  tabData={[*/}
//       {/*    {*/}
//       {/*      key: 'recommend',*/}
//       {/*      title: '推荐',*/}
//       {/*      component: RecommendList,*/}
//       {/*    },*/}
//       {/*    {*/}
//       {/*      key: 'follow',*/}
//       {/*      title: '关注',*/}
//       {/*      component: FollowList,*/}
//       {/*    },*/}
//       {/*    {*/}
//       {/*      key: 'lasted',*/}
//       {/*      title: '最新',*/}
//       {/*      component: LastedList,*/}
//       {/*    },*/}
//       {/*  ]}*/}
//       {/*  onChange={key => setCurrentKey(key)}*/}
//       {/*/>*/}
//     </View>
//   );
// };
//
// export default LabIndex;
// // const sheetRef = React.useRef(null);
// //
// // class LabIndex extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       isVisible: false,
// //     };
// //   }
// //
// //   showToast = () => {
// //     // https://github.com/magicismight/react-native-root-toast
// //     let toast = Toast.show('This is a message', {
// //       duration: Toast.durations.LONG,
// //       position: Toast.positions.BOTTOM,
// //       shadow: true,
// //       animation: true,
// //       hideOnPress: true,
// //       delay: 0,
// //       onShow: () => {
// //         // calls on toast\`s appear animation start
// //       },
// //       onShown: () => {
// //         // calls on toast\`s appear animation end.
// //       },
// //       onHide: () => {
// //         // calls on toast\`s hide animation start.
// //       },
// //       onHidden: () => {
// //         // calls on toast\`s hide animation end.
// //       },
// //     });
// //   };
// //
// //   showModal = () => {
// //     console.log('xxxx');
// //     this.setState({
// //       isVisible: !this.state.isVisible,
// //     });
// //   };
// //
// //   showShare = () => {
// //     const url = 'https://awesome.contents.com/';
// //     const title = 'Awesome Contents';
// //     const message = 'Please check this out.';
// //     const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
// //     const options = Platform.select({
// //       ios: {
// //         activityItemSources: [
// //           {
// //             // For sharing url with custom title.
// //             placeholderItem: {type: 'url', content: url},
// //             item: {
// //               default: {type: 'url', content: url},
// //             },
// //             subject: {
// //               default: title,
// //             },
// //             linkMetadata: {originalUrl: url, url, title},
// //           },
// //           {
// //             // For sharing text.
// //             placeholderItem: {type: 'text', content: message},
// //             item: {
// //               default: {type: 'text', content: message},
// //               message: null, // Specify no text to share via Messages app.
// //             },
// //             linkMetadata: {
// //               // For showing app icon on share preview.
// //               title: message,
// //             },
// //           },
// //           {
// //             // For using custom icon instead of default text icon at share preview when sharing with message.
// //             placeholderItem: {
// //               type: 'url',
// //               content: icon,
// //             },
// //             item: {
// //               default: {
// //                 type: 'text',
// //                 content: `${message} ${url}`,
// //               },
// //             },
// //             linkMetadata: {
// //               title: message,
// //               icon: icon,
// //             },
// //           },
// //         ],
// //       },
// //       default: {
// //         title,
// //         subject: title,
// //         message: `${message} ${url}`,
// //       },
// //     });
// //
// //     Share.open(options)
// //       .then(res => {
// //         console.log(res);
// //       })
// //       .catch(err => {
// //         err && console.log(err);
// //       });
// //   };
// //
// //   handleClick = type => {
// //     console.log('type', type);
// //     switch (type) {
// //       case 'webview':
// //         this.props.navigation.navigate('WebView', {sourceUrl: 'https://baidu.com', title: '顽鸦1'});
// //         break;
// //       default:
// //     }
// //   };
// //
// //
// //
// //
// //   renderContent = () => (
// //     <View
// //       style={{
// //         backgroundColor: 'white',
// //         padding: 16,
// //         height: 450,
// //       }}>
// //       <Text>Swipe down to close</Text>
// //     </View>
// //   );
// //   render() {
// //
// //
// //     return (
// //       <View>
// //         <Text>实验室主页</Text>
// //
// //         <Button onPress={this.showToast} title="toast"></Button>
// //         <Button onPress={this.showModal} title="show modal"></Button>
// //         <Button onPress={this.showShare} title="分享"></Button>
// //
// //         {Object.keys(types).map(type => {
// //           return (
// //             <Button
// //               title={types[type]}
// //               key={type}
// //               onPress={() => {
// //                 this.handleClick(type);
// //               }}
// //             />
// //           );
// //         })}
// //         <Button
// //           title={'tabindex'}
// //           onPress={() => {
// //             this.props.navigation.navigate('LabTabIndex');
// //           }}
// //         />
// //         <Button
// //           title={'webview'}
// //           onPress={() => {
// //             this.props.navigation.navigate('LabWebview');
// //           }}
// //         />
// //
// //         <View>
// //           <Modal isVisible={this.state.isVisible}>
// //             <View style={{flex: 1, color: 'red'}}>
// //               <Text>I am the modal content!</Text>
// //             </View>
// //             <Button title="Hide modal" onPress={this.showModal} />
// //           </Modal>
// //         </View>
// //         <View
// //           style={{
// //             flex: 1,
// //             backgroundColor: 'papayawhip',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //           }}>
// //           <Button title="Open Bottom Sheet" onPress={() => sheetRef.current.snapTo(0)} />
// //         </View>
// //         <BottomSheet
// //           ref={sheetRef}
// //           snapPoints={[450, 300, 0]}
// //           borderRadius={10}
// //           renderContent={renderContent}
// //         />
// //       </View>
// //     );
// //   }
// // }
// //
// // export default LabIndex;
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  TabBar,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
// import Article from './Shared/Article';
// import Albums from './Shared/Albums';
// import Contacts from './Shared/Contacts';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import {getRecommendPosts, getFollowedPosts, getRecommendLatestPosts} from '@/api/home_api';

import CollapsibleHeader from '@/components/CollapsibleHeader';

type State = NavigationState<{
  key: string;
  title: string;
}>;

// These must be hardcoded to support the various animations needed for the effect
const HEADER_HEIGHT = 144;
const TAB_BAR_HEIGHT = 48;

export default class CollapsibleHeaderExample extends React.Component<
  {},
  State
  > {
  // eslint-disable-next-line react/sort-comp
  static title = 'Collapsible header tab bar';
  static backgroundColor = '#3f51b5';
  static appbarElevation = 0;

  state = {
    index: 1,
    routes: [
      { key: 'article', title: 'Article' },
      { key: 'contacts', title: 'Contacts' },
      { key: 'albums', title: 'Albums' },
    ],
  };

  handleIndexChange = (index: number) =>
    this.setState({
      index,
    });

  renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );

  render() {
    return (
      <CollapsibleHeader
        // This is dummy data, we render the entire content as a single component for both tabs
        // TODO: Create an example which explains why we do it this way, by showing proper use of the underlying FlatList
          tabDataAA={[[{ key: '0' }], [{ key: '1' }], [{ key: '2' }]]}
        tabBarHeight={TAB_BAR_HEIGHT}
        headerHeight={HEADER_HEIGHT}
        renderTabItems={[
          this.renderTabOne,
          this.renderTabTwo,
          this.renderTabThree,
        ]}
        renderHeader={this.renderHeader}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
        navigationState={this.state}
      />
    );
  }

  renderTabOne = () => {
    return <DoubleList request={{api: getRecommendPosts}} type="recommend" />;
  };

  renderTabTwo = () => {
    return <SingleList request={{api: getFollowedPosts}} />;
  };

  renderTabThree = () => {
    return <SingleList request={{api: getRecommendLatestPosts}} />;
  };

  // renderTabOne = () => <View style={{height: 1000, backgroundColor: 'red'}} />;
  //
  // renderTabTwo = () => <View style={{height: 800, backgroundColor: 'blue'}} />;
  //
  // renderTabThree = () => <View style={{height: 600, backgroundColor: 'yellow'}} />;

  renderHeader = () => (
    <View style={styles.headerRow}>
      <View style={styles.headerCol}>
        <Text style={styles.text}>Collapsible Header</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#3f51b5',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    fontWeight: '400',
  },
  headerRow: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    backgroundColor: '#429BB8',
  },
  headerCol: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
  },
});