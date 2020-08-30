import React, {Component, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button, Platform} from 'react-native';
import Toast from 'react-native-root-toast';
import Share from 'react-native-share';
import {WebView} from 'react-native-webview';
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import Helper from '@/utils/helper';

const types = {toast: 'toast', webview: '网页'};

const LabIndex = ({navigation, route}) => {
  const [isVisible, setIsVisible] = useState(false);
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}>
      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <View style={{flex: 1}}>
      <Text>实验室主页</Text>

      <View>
        <Button title={"退出登录"}>

        </Button>

        <Button title={"显示所有本地缓存"} onPress={() => {navigation.navigate('LabStorageIndex')}}>

        </Button>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'papayawhip',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button title="Open Bottom Sheet" onPress={() => sheetRef.current.snapTo(0)} />
      </View>
      <BottomSheet
        renderHeader={() => (<Text>ssss</Text>)}
        ref={sheetRef}
        snapPoints={[450, 100, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </View>
  );
};

export default LabIndex;
// const sheetRef = React.useRef(null);
//
// class LabIndex extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isVisible: false,
//     };
//   }
//
//   showToast = () => {
//     // https://github.com/magicismight/react-native-root-toast
//     let toast = Toast.show('This is a message', {
//       duration: Toast.durations.LONG,
//       position: Toast.positions.BOTTOM,
//       shadow: true,
//       animation: true,
//       hideOnPress: true,
//       delay: 0,
//       onShow: () => {
//         // calls on toast\`s appear animation start
//       },
//       onShown: () => {
//         // calls on toast\`s appear animation end.
//       },
//       onHide: () => {
//         // calls on toast\`s hide animation start.
//       },
//       onHidden: () => {
//         // calls on toast\`s hide animation end.
//       },
//     });
//   };
//
//   showModal = () => {
//     console.log('xxxx');
//     this.setState({
//       isVisible: !this.state.isVisible,
//     });
//   };
//
//   showShare = () => {
//     const url = 'https://awesome.contents.com/';
//     const title = 'Awesome Contents';
//     const message = 'Please check this out.';
//     const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
//     const options = Platform.select({
//       ios: {
//         activityItemSources: [
//           {
//             // For sharing url with custom title.
//             placeholderItem: {type: 'url', content: url},
//             item: {
//               default: {type: 'url', content: url},
//             },
//             subject: {
//               default: title,
//             },
//             linkMetadata: {originalUrl: url, url, title},
//           },
//           {
//             // For sharing text.
//             placeholderItem: {type: 'text', content: message},
//             item: {
//               default: {type: 'text', content: message},
//               message: null, // Specify no text to share via Messages app.
//             },
//             linkMetadata: {
//               // For showing app icon on share preview.
//               title: message,
//             },
//           },
//           {
//             // For using custom icon instead of default text icon at share preview when sharing with message.
//             placeholderItem: {
//               type: 'url',
//               content: icon,
//             },
//             item: {
//               default: {
//                 type: 'text',
//                 content: `${message} ${url}`,
//               },
//             },
//             linkMetadata: {
//               title: message,
//               icon: icon,
//             },
//           },
//         ],
//       },
//       default: {
//         title,
//         subject: title,
//         message: `${message} ${url}`,
//       },
//     });
//
//     Share.open(options)
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => {
//         err && console.log(err);
//       });
//   };
//
//   handleClick = type => {
//     console.log('type', type);
//     switch (type) {
//       case 'webview':
//         this.props.navigation.navigate('WebView', {sourceUrl: 'https://baidu.com', title: '顽鸦1'});
//         break;
//       default:
//     }
//   };
//
//
//
//
//   renderContent = () => (
//     <View
//       style={{
//         backgroundColor: 'white',
//         padding: 16,
//         height: 450,
//       }}>
//       <Text>Swipe down to close</Text>
//     </View>
//   );
//   render() {
//
//
//     return (
//       <View>
//         <Text>实验室主页</Text>
//
//         <Button onPress={this.showToast} title="toast"></Button>
//         <Button onPress={this.showModal} title="show modal"></Button>
//         <Button onPress={this.showShare} title="分享"></Button>
//
//         {Object.keys(types).map(type => {
//           return (
//             <Button
//               title={types[type]}
//               key={type}
//               onPress={() => {
//                 this.handleClick(type);
//               }}
//             />
//           );
//         })}
//         <Button
//           title={'tabindex'}
//           onPress={() => {
//             this.props.navigation.navigate('LabTabIndex');
//           }}
//         />
//         <Button
//           title={'webview'}
//           onPress={() => {
//             this.props.navigation.navigate('LabWebview');
//           }}
//         />
//
//         <View>
//           <Modal isVisible={this.state.isVisible}>
//             <View style={{flex: 1, color: 'red'}}>
//               <Text>I am the modal content!</Text>
//             </View>
//             <Button title="Hide modal" onPress={this.showModal} />
//           </Modal>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: 'papayawhip',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Button title="Open Bottom Sheet" onPress={() => sheetRef.current.snapTo(0)} />
//         </View>
//         <BottomSheet
//           ref={sheetRef}
//           snapPoints={[450, 300, 0]}
//           borderRadius={10}
//           renderContent={renderContent}
//         />
//       </View>
//     );
//   }
// }
//
// export default LabIndex;
